

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Platform,
  LogBox,
  TextInput,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import Header from "../HeaderIconsWithTitle/HeadericonsWithTitle";
import styles, { modalStyles } from "./style";
import Theme from "@/theme";
import { createTransaction } from "@/redux/slices/categoryTransactions";
import { fetchUserCategories, addNewCategory } from "@/redux/slices/categoriesSlice";
import { Category } from "@/types/category";
import { RootState } from "@/redux/store";
import { getCurrentUserId } from "@/utils/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { apiBase } from "@/utils/axiosInstance";

LogBox.ignoreLogs(["Possible Unhandled Promise Rejection"]);

interface InvoiceResult {
  supplier_name: string;
  total_amount: string;
  invoice_date: string;
  category: string;
}
type cameraScreenNavigationProp = NativeStackNavigationProp<{
  CategoryDetail: { categoryName: string; categoryId: number; UserId: string; Icon: string };
  AddExpensesScreen: undefined;
}>;
export default function CameraScreen() {
  const dispatch = useDispatch();
  const cameraRef = useRef<CameraView>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [result, setResult] = useState<InvoiceResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false);
  const [facing, setFacing] = useState<"front" | "back">("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [apiEndpoint] = useState(`${apiBase}/ocr/process-receipt`);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [newCategoryModalVisible, setNewCategoryModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("basket-outline");
  const [userId, setUserId] = useState<string | null>(null);
  const navigation = useNavigation<cameraScreenNavigationProp>();
  
  const { items: categories, loading: categoriesLoading } = useSelector(
    (state: RootState) => state.categories
  );

  // Available icons for new categories
  const availableIcons = [
    "basket-outline", "restaurant-outline", "flash-outline", "car-outline", 
    "cart-outline", "medical-outline", "film-outline", "ellipsis-horizontal-outline",
    "home-outline", "gift-outline", "pricetag-outline", "briefcase-outline"
  ];

  useEffect(() => {
    (async () => {
      if (!permission?.granted) {
        await requestPermission();
      }
    })();
  }, [permission]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const currentUserId = await getCurrentUserId();
        if (currentUserId) {
          setUserId(currentUserId);
          const resultAction = await dispatch(fetchUserCategories(currentUserId) as any);
          if (fetchUserCategories.rejected.match(resultAction)) {
            console.error("Fetch error:", resultAction.payload || resultAction.error);
          }
        }
      } catch (err) {
        console.error("Uncaught error:", err);
      }
    };

    loadData();
  }, [dispatch]);

  useEffect(() => {
    if (result && categories.length > 0) {
      // Set default category based on result if possible
      const suggestedCategory = findCategoryByName(result.category);
      setSelectedCategory(suggestedCategory || categories[0]);
      setModalVisible(true);
    }
  }, [result, categories]);

  const findCategoryByName = (name?: string): Category | null => {
    if (!name || categories.length === 0) return null;
    
    const normalizedName = name.toLowerCase().trim();
    return categories.find(cat => 
      cat.name.toLowerCase().includes(normalizedName) || 
      normalizedName.includes(cat.name.toLowerCase())
    ) || null;
  };

  const takePhoto = async () => {
    if (!cameraRef.current) {
      Alert.alert("Error", "Camera not ready");
      return;
    }

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: Platform.OS !== "web",
        skipProcessing: true,
        exif: false,
      });

      if (!photo) throw new Error("No photo captured");
      console.log("Photo taken, URI:", photo.uri);
      setPhotoUri(photo.uri);
    } catch (error: any) {
      console.error("Camera Error:", error);
      Alert.alert("Camera Error", error.message || "Failed to take photo");
    }
  };

  
  const sendToBackend = async () => {
    if (!photoUri) {
      Alert.alert("Error", "No photo to send");
      return;
    }

    setIsProcessing(true);
    console.log("Starting image processing...");

    try {
      let base64: string;

      if (Platform.OS === "web") {
        const response = await fetch(photoUri);
        const blob = await response.blob();
        base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () =>
            resolve((reader.result as string).split(",")[1]);
          reader.onerror = () => reject(new Error("Failed to read image"));
          reader.readAsDataURL(blob);
        });
      } else {
        base64 = await FileSystem.readAsStringAsync(photoUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
      }

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          imageBase64: base64,
          fileName: "receipt.jpg",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const responseData: InvoiceResult = await response.json();
      setResult(responseData);
    
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to process receipt");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetCamera = () => {
    setPhotoUri(null);
    setResult(null);
    setModalVisible(false);
    setSelectedCategory(null);
  };


  const handleAddTransaction = async () => {
    if (!result || !selectedCategory || !userId) {
      Alert.alert("Error", "Missing required information to create transaction");
      return;
    }
    
    // Parse the amount string to remove currency symbols and convert to number
    const amountString = result.total_amount.replace(/[^0-9.-]+/g, "");
    const amount = parseFloat(amountString);
    
    if (isNaN(amount)) {
      Alert.alert("Error", "Invalid amount");
      return;
    }
  
    setIsCreatingTransaction(true);
  
    try {
      const transaction = {
        category_id: selectedCategory.id as number,
        amount: amount,
        type: "expence" as "expence" | "income", // Match the type in your slice
        title: `deposit of ${selectedCategory.name}`,
        user_id: userId,
        
      };
  
      console.log("Creating transaction:", transaction);
      
      const resultAction = await dispatch(createTransaction(transaction) as any);
      
      if (createTransaction.fulfilled.match(resultAction)) {
        console.log("Transaction created successfully:", resultAction.payload);
        Alert.alert(
          "Success", 
          `Transaction added to ${selectedCategory.name} category!`,
          [{ text: "OK", onPress: () => {
            setModalVisible(false);
            resetCamera();
            
          }}]
        );
      } else if (createTransaction.rejected.match(resultAction)) {
        throw new Error(resultAction.payload as string || "Failed to create transaction");
      }
    } catch (error: any) {
      console.error("Transaction creation error:", error);
      Alert.alert("Error", error.message || "Failed to add transaction");
    } finally {
      setIsCreatingTransaction(false);
    }
  };
  const handleCreateCategory = async () => {
    if (!newCategoryName.trim() || !userId) {
      Alert.alert("Error", userId ? "Category name cannot be empty" : "User ID not available");
      return;
    }

    const categoryData = {
      name: newCategoryName.trim(),
      icon: newCategoryIcon,
      user_id: userId,
    };

    try {
      const resultAction = await dispatch(addNewCategory(categoryData) as any);
      if (addNewCategory.fulfilled.match(resultAction)) {
        setNewCategoryModalVisible(false);
        setNewCategoryName("");
        
        // Select the newly created category
        setSelectedCategory(resultAction.payload);
        Alert.alert("Success", "Category created successfully!");
      } else if (addNewCategory.rejected.match(resultAction)) {
        throw new Error(resultAction.payload as string || "Failed to create category");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to create category");
    }
  };

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.flex}>
      <ScrollView
        contentContainerStyle={styles.flexGrow}
        keyboardShouldPersistTaps="handled"
      >
        <Header title="Camera" />
        {!photoUri ? (
          <View style={styles.cameraContainer}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing={facing}
              enableTorch={false}
            />
            <View style={styles.buttonRow}>
              {/* <TouchableOpacity style={styles.iconButton} onPress={flipCamera}>
                <Ionicons
                  name="camera-reverse-outline"
                  size={30}
                  color="#fff"
                />
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePhoto}
              >
                <View style={modalStyles.captureInner} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.previewContainer}>
            <Image
              source={{ uri: photoUri }}
              style={styles.preview}
              resizeMode="contain"
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, isProcessing && styles.disabledButton]}
                onPress={sendToBackend}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Ionicons
                    name="cloud-upload-outline"
                    size={24}
                    color="#fff"
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={resetCamera}>
                <Ionicons name="refresh-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Result Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <View style={modalStyles.modalHeader}>
              <Text style={modalStyles.modalTitle}>Receipt Details</Text>
              <TouchableOpacity 
                style={modalStyles.closeIcon} 
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            {result && (
              <>
                <View style={modalStyles.receiptCard}>
                  <View style={modalStyles.receiptHeader}>
                    <Text style={modalStyles.receiptVendor}>{result.supplier_name}</Text>
                    <Text style={modalStyles.receiptDate}>{result.invoice_date}</Text>
                  </View>
                  
                  <View style={modalStyles.amountContainer}>
                    <Text style={modalStyles.amountLabel}>Total Amount:</Text>
                    <Text style={modalStyles.amountValue}>{result.total_amount}</Text>
                  </View>
                </View>

                <View style={modalStyles.sectionTitleRow}>
                  <View style={modalStyles.sectionTitle}>
                    <Ionicons name="list-outline" size={20} color="#555" />
                    <Text style={modalStyles.sectionTitleText}>Choose Category</Text>
                  </View>
                  <TouchableOpacity 
                    style={modalStyles.addCategoryButton}
                    onPress={() => setNewCategoryModalVisible(true)}
                  >
                    <Ionicons name="add-circle-outline" size={20} color={Theme.colors?.primary || "#4CAF50"} />
                    <Text style={modalStyles.addCategoryText}>New</Text>
                  </TouchableOpacity>
                </View>

                {categoriesLoading ? (
                  <View style={modalStyles.loadingContainer}>
                    <ActivityIndicator size="small" color={Theme.colors?.primary || "#4CAF50"} />
                    <Text style={modalStyles.loadingText}>Loading categories...</Text>
                  </View>
                ) : categories.length === 0 ? (
                  <View style={modalStyles.emptyContainer}>
                    <Text style={modalStyles.emptyText}>No categories found</Text>
                    <TouchableOpacity 
                      style={modalStyles.createFirstCategoryButton}
                      onPress={() => setNewCategoryModalVisible(true)}
                    >
                      <Text style={modalStyles.createFirstCategoryText}>Create your first category</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    style={modalStyles.categoriesContainer}
                    contentContainerStyle={modalStyles.categoriesContent}
                  >
                    {categories.map((category) => (
                      <TouchableOpacity
                        key={category.id}
                        style={[
                          modalStyles.categoryItem,
                          selectedCategory?.id === category.id && modalStyles.selectedCategory
                        ]}
                        onPress={() => setSelectedCategory(category)}
                      >
                        <Ionicons 
                          name={category.icon as any} 
                          size={24} 
                          color={selectedCategory?.id === category.id ? "#fff" : "#666"} 
                        />
                        <Text 
                          style={[
                            modalStyles.categoryText,
                            selectedCategory?.id === category.id && modalStyles.selectedCategoryText
                          ]}
                          numberOfLines={2}
                          ellipsizeMode="tail"
                        >
                          {category.name}
                        </Text>
                        {selectedCategory?.id === category.id && (
                          <View style={modalStyles.checkmarkIcon}>
                            <Ionicons name="checkmark-circle" size={16} color="#fff" />
                          </View>
                        )}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}

                <View style={modalStyles.buttonContainer}>
                  <TouchableOpacity 
                    style={[
                      modalStyles.addButton,
                      (!selectedCategory || categories.length === 0 || isCreatingTransaction) && modalStyles.disabledButton
                    ]}
                    onPress={handleAddTransaction}
                    disabled={isCreatingTransaction || !selectedCategory || categories.length === 0}
                  >
                    {isCreatingTransaction ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <>
                        <Ionicons name="add-circle-outline" size={20} color="#fff" style={modalStyles.buttonIcon} />
                        <Text style={modalStyles.buttonText}>Add Transaction</Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* New Category Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={newCategoryModalVisible}
        onRequestClose={() => setNewCategoryModalVisible(false)}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <View style={modalStyles.modalHeader}>
              <Text style={modalStyles.modalTitle}>Create New Category</Text>
              <TouchableOpacity 
                style={modalStyles.closeIcon} 
                onPress={() => setNewCategoryModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={modalStyles.formContainer}>
              <Text style={modalStyles.formLabel}>Category Name</Text>
              <TextInput
                style={modalStyles.textInput}
                placeholder="Enter category name"
                value={newCategoryName}
                onChangeText={setNewCategoryName}
              />
              
              <Text style={[modalStyles.formLabel, modalStyles.iconSectionLabel]}>Choose Icon</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                style={modalStyles.iconsContainer}
                contentContainerStyle={modalStyles.iconsContent}
              >
                {availableIcons.map((icon) => (
                  <TouchableOpacity
                    key={icon}
                    style={[
                      modalStyles.iconItem,
                      newCategoryIcon === icon && modalStyles.selectedIconItem
                    ]}
                    onPress={() => setNewCategoryIcon(icon)}
                  >
                    <Ionicons 
                      name={icon as any} 
                      size={28} 
                      color={newCategoryIcon === icon ? "#fff" : "#555"} 
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
              <View style={modalStyles.formButtonContainer}>
                <TouchableOpacity 
                  style={modalStyles.cancelButton}
                  onPress={() => setNewCategoryModalVisible(false)}
                >
                  <Text style={modalStyles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    modalStyles.createButton,
                    (!newCategoryName.trim() || !userId) && modalStyles.disabledButton
                  ]}
                  onPress={handleCreateCategory}
                  disabled={!newCategoryName.trim() || !userId}
                >
                  <Text style={modalStyles.createButtonText}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
}

