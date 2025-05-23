import React, { useEffect, useRef, useState } from "react";
import {
  View,
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
  KeyboardAvoidingView,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Header from "../HeaderIconsWithTitle/HeadericonsWithTitle";
import styles, { modalStyles } from "./style";
import Theme from "@/theme";
import { createTransaction } from "@/redux/slices/categoryTransactions";
import { fetchUserCategories, addNewCategory } from "@/redux/slices/categoriesSlice";
import { Category } from "@/types/category";
import { RootState } from "@/redux/store";
import { getCurrentUserId } from "@/utils/auth";
import { apiBase } from "@/utils/axiosInstance";
import LineItemsEditor from "./LineItems";
import CategorySelector from "./CategorySelector";
import { setUserStores } from "@/redux/slices/storeSlice";
import axiosInstance from "@/config/axios";
import { useTranslation } from "react-i18next";
import { isValidDateValue } from "@/utils/validators";
import { useAppSelector } from "@/redux/hook";
import { fetchBalance } from "@/redux/slices/financeSlice";

LogBox.ignoreLogs(["Possible Unhandled Promise Rejection"]);

interface LineItem {
  name: string;
  unitPrice: number;
  quantity?: number;
}

interface InvoiceResult {
  supplier_name: string;
  total_amount: string;
  invoice_date: string;
  category: string;
  description?: string;
  line_items?: LineItem[];
  transaction_hash?: string;
}

interface Store {
  id: string;
  name: string;
}

export default function CameraScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cameraRef = useRef<CameraView>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [result, setResult] = useState<InvoiceResult | null>(null);
  const [editableResult, setEditableResult] = useState<InvoiceResult | null>(null);
  const [description, setDescription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false);
  const [facing, setFacing] = useState<"front" | "back">("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [apiEndpoint] = useState(`${apiBase}/ocr/process-receipt`);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [newCategoryModalVisible, setNewCategoryModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("basket-outline");
  const [userId, setUserId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [storesLoading, setStoresLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";


  const { items: categories, loading: categoriesLoading } = useSelector(
    (state: RootState) => state.categories
  );
  const { userStores, loading } = useSelector(
    (state: RootState) => state.store
  );

  const [processedTransactions, setProcessedTransactions] = useState<Set<string>>(new Set());

  const availableIcons = [
    "basket-outline", "restaurant-outline", "flash-outline", "car-outline", 
    "cart-outline", "medical-outline", "film-outline", "ellipsis-horizontal-outline",
    "home-outline", "gift-outline", "pricetag-outline", "briefcase-outline"
  ];
  const { balance, expenses, income, savings } = useAppSelector(
    (state) => state.finance
  );

  

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
            console.log("Fetch error:", resultAction.payload || resultAction.error);
          }
        }
      } catch (err) {
        console.log("Uncaught error:", err);
      }
    };

    loadData();
  }, [dispatch]);

  // Fetch user stores when userId changes
  useEffect(() => {
    const loadUserStores = async () => {
      try {
        if (userId) {
          setStoresLoading(true);
          const response = await axiosInstance.get(`/user/stores/${userId}`);
          dispatch(setUserStores(response.data));
        }
      } catch (error) {
        console.log("Error loading stores:", error);
      } finally {
        setStoresLoading(false);
      }
    };

    loadUserStores();
  }, [dispatch, userId]);

  useEffect(() => {
    if (result && categories.length > 0) {
      const suggestedCategory = findCategoryByName(result.category);
      setSelectedCategory(suggestedCategory || categories[0]);
      setEditableResult({...result});
      // const generatedDescription = generateDescriptionFromLineItems(result);
      // setDescription(generatedDescription);
      setModalVisible(true);
    }
  }, [result, categories]);



  useEffect(() => {
    async function fetchAll() {
      const userId = await getCurrentUserId();

      dispatch(fetchBalance(userId));
      
    }

    fetchAll();
  }, [dispatch]);

  const checkForDuplicateCategory = (name: string): boolean => {
    return categories.some(
      cat => cat.name.toLowerCase() === name.toLowerCase().trim()
    );
  };

  const convertOCRLineItems = (items: any[]): LineItem[] => {
    return items.map(item => ({
      name: item.description || '',
      unitPrice: item.unit_price || 0,
      quantity: item.quantity || 1
    }));
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };


  const findCategoryByName = (name?: string): Category | null => {
    if (!name || categories.length === 0) return null;
    
    const normalizedName = name.toLowerCase().trim();
    return categories.find(cat => 
      cat.name.toLowerCase().includes(normalizedName) || 
      normalizedName.includes(cat.name.toLowerCase())
    ) || null;
  };

  const generateTransactionHash = (transaction: any): string => {
    const hashInputs = [
      transaction.category_id,
      transaction.amount.toFixed(2),
      transaction.title,
      transaction.user_id,
      transaction.created_at.toISOString().split('camera.T')[0]
    ].join('|');
    
    let hash = 0;
    for (let i = 0; i < hashInputs.length; i++) {
      const char = hashInputs.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString();
  };

  const takePhoto = async () => {
    if (!cameraRef.current) {
      Alert.alert("Error", t('camera.camera.errors.cameraNotReady'));
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
      setPhotoUri(photo.uri);
    } catch (error: any) {
      console.log("Camera Error:", error);
      Alert.alert("Camera Error", error.message || t('camera.camera.errors.cameraNotReady'));
    }
  };

  const sendToBackend = async () => {
    if (!photoUri) {
      Alert.alert("Error", t('camera.camera.errors.noPhoto'));
      return;
    }

    setIsProcessing(true);

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
      const convertedLineItems = responseData.line_items ? convertOCRLineItems(responseData.line_items) : [];
      setResult({
        ...responseData,
        line_items: convertedLineItems
      });
      setEditableResult({
        ...responseData,
        line_items: convertedLineItems
      });
    
    } catch (error: any) {
      Alert.alert("Error", error.message || t('camera.camera.errors.processingFailed'));
    } finally {
      setIsProcessing(false);
    }
  };

  const resetCamera = () => {
    setPhotoUri(null);
    setResult(null);
    setEditableResult(null);
    setDescription("");
    setModalVisible(false);
    setSelectedCategory(null);
    setSelectedStore(null);
    setEditMode(false);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleStoreSelection = (storeId: string) => {
    if (storeId === "add_new_store") {
      setModalVisible(false);
      navigation.navigate('AddStore');
    } else {
      setSelectedStore(storeId);
    }
  };
  
  const handleAddTransaction = async () => {
    console.log("Add Transaction clicked", { 
      hasEditableResult: !!editableResult, 
      hasSelectedCategory: !!selectedCategory, 
      userId: userId 
    });
    
    if (!editableResult || !selectedCategory || !userId) {
      Alert.alert("Error", t('camera.camera.errors.missingInfo'));
      return;
    }

    try {
      console.log("Creating transaction with data:", {
        category: selectedCategory.name,
        amount: parseFloat(editableResult.total_amount.replace(/[^0-9.-]+/g, "")),
        title: editableResult.supplier_name,
        store_id: selectedStore,
        created_at: editableResult.invoice_date
      });
          const transactionAmount =  parseFloat(editableResult.total_amount.replace(/[^0-9.-]+/g, ""));
    const currentBalance = balance - expenses - savings + income || 0;
        if ( transactionAmount >= currentBalance) {
            Alert.alert(
              t("transactionForm.balanceError.title"),
              t("transactionForm.balanceError.message"),
              [{ text: t("common.ok") }]
            );
            return;
          }
      const transaction = {
        category_id: selectedCategory.id as number,
        amount: parseFloat(editableResult.total_amount.replace(/[^0-9.-]+/g, "")),
        type: "expense" as "expense" | "income",
        title: editableResult.supplier_name,
        description: description || `Receipt from ${editableResult.supplier_name}`,
        user_id: userId,
        storeId: selectedStore,
        created_at: isValidDateValue(editableResult.invoice_date)? new Date(editableResult.invoice_date) :new Date(),
        details: editableResult.line_items?.map(item => ({
          name: item.name,
          unitPrice: item.unitPrice,
          quantity: item.quantity || 1
        })) || []
      };
      
      const transactionHash = generateTransactionHash(transaction);
      console.log("Transaction hash generated:", transactionHash);
      
      if (processedTransactions.has(transactionHash)) {
        Alert.alert(
          "Duplicate Transaction", 
          t('camera.receipt.messages.duplicate'),
          [
            { text: t('camera.receipt.messages.cancel'), style: "cancel" },
            { 
              text: t('camera.receipt.messages.addAnyway'), 
              style: "destructive",
              onPress: () => createTransactionRecord(transaction, transactionHash)
            }
          ]
        );
        return;
      }
      
      await createTransactionRecord(transaction, transactionHash);
    } catch (error) {
      console.log("Error in handleAddTransaction:", error);
      Alert.alert("Error", t('camera.camera.errors.transactionFailed'));
    }
  };
  
  const createTransactionRecord = async (transaction: any, hash: string) => {
    console.log("Starting transaction creation...");
    setIsCreatingTransaction(true);
    
    try {
      console.log("Dispatching createTransaction with:", transaction);
      const resultAction = await dispatch(createTransaction(transaction) as any);
      console.log("Dispatch result:", resultAction);
      
      if (createTransaction.fulfilled.match(resultAction)) {
        console.log("Transaction created successfully");
        setProcessedTransactions(prev => new Set([...prev, hash]));
        
        Alert.alert(
          "Success", 
          t('camera.receipt.messages.success', { category: selectedCategory?.name }),
          [{ text: "OK", onPress: () => {
            setModalVisible(false);
            resetCamera();
          }}]
        );
      } else if (createTransaction.rejected.match(resultAction)) {
        throw new Error(resultAction.payload as string || t('camera.camera.errors.transactionFailed'));
      }
    } catch (error: any) {
      console.log("Transaction creation error:", error);
      Alert.alert("Error", error.message || t('camera.camera.errors.transactionFailed'));
    } finally {
      setIsCreatingTransaction(false);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim() || !userId) {
      Alert.alert("Error", userId ? t('camera.category.create.errors.emptyName') : "User ID not available");
      return;
    }

    if (checkForDuplicateCategory(newCategoryName)) {
      Alert.alert("Error", t('camera.category.create.errors.duplicate'));
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
        setSelectedCategory(resultAction.payload);
        Alert.alert("Success", t('camera.category.create.success'));
      } else if (addNewCategory.rejected.match(resultAction)) {
        throw new Error(resultAction.payload as string || t('camera.category.create.errors.failed'));
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || t('camera.category.create.errors.failed'));
    }
  };

  const renderEditableField = (field: keyof InvoiceResult, label: string, icon: string) => {
    if (!editableResult) return null;
    
    return (
      <View style={modalStyles.fieldContainer}>
        <View style={modalStyles.fieldLabelContainer}>
          <Ionicons name={icon as any} size={18} color="#666" style={modalStyles.fieldIcon} />
          <Text style={modalStyles.fieldLabel}>{label}</Text>
        </View>
        {editMode ? (
          <TextInput
            style={modalStyles.fieldInput}
            value={editableResult[field] as string}
            onChangeText={(text) => setEditableResult({...editableResult, [field]: text})}
          />
        ) : (
          <Text style={modalStyles.fieldValue}>{editableResult[field] as string}</Text>
        )}
      </View>
    );
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
        <Header title={t('camera.header.camera')} />
        {!photoUri ? (
          <View style={[styles.cameraContainer, isRTL && { direction: 'rtl' }]}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing={facing}
              enableTorch={false}
            />
            <View style={styles.buttonRow}>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView 
          style={[modalStyles.centeredView,isRTL && { direction: 'rtl' }]}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
           <View style={modalStyles.modalContent}>
            <View style={modalStyles.modalHeader}>
              <Text style={modalStyles.modalTitle}>{t('camera.receipt.title')}</Text>
              <View style={modalStyles.headerButtons}>
                <TouchableOpacity 
                  style={modalStyles.editButton} 
                  onPress={toggleEditMode}
                >
                  <Ionicons name={editMode ? "save-outline" : "pencil-outline"} size={22} color={Theme.colors.primary}  />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={modalStyles.closeIcon} 
                  onPress={() => setModalVisible(false)}
                >
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
            
            <ScrollView style={modalStyles.modalScrollView} contentContainerStyle={modalStyles.modalScrollContent}>
              {editableResult && (
                <>
                  <View style={modalStyles.receiptCard}>
                    {renderEditableField("supplier_name", t('camera.receipt.fields.vendor'), "business-outline")}
                    {renderEditableField("invoice_date", t('camera.receipt.fields.date'), "calendar-outline")}
                    {renderEditableField("total_amount", t('camera.receipt.fields.amount'), "cash-outline")}
                    
                    {/* Store Selector */}
                    {storesLoading ? (
                      <View style={modalStyles.loadingContainer}>
                        <ActivityIndicator size="small" color={Theme.colors.primary} />
                        <Text style={modalStyles.loadingText}>{t('camera.receipt.messages.loadingStores')}</Text>
                      </View>
                    ) : userStores.length > 0 ? (
                      <View style={modalStyles.fieldContainer}>
                        <View style={modalStyles.fieldLabelContainer}>
                          <Ionicons name="storefront-outline" size={18} color="#666" style={modalStyles.fieldIcon} />
                          <Text style={modalStyles.fieldLabel}>{t('camera.receipt.fields.store')}</Text>
                        </View>
                        <View style={modalStyles.storeSelectorContainer}>
                          <Picker
                            selectedValue={selectedStore || ''}
                            style={modalStyles.storePicker}
                            onValueChange={handleStoreSelection}
                            dropdownIconColor={Theme.colors.primary}
                          >
                            <Picker.Item label={t('camera.receipt.placeholders.selectStore')} value={null} />
                            {userStores.map((store) => (
                              <Picker.Item 
                                key={store.id} 
                                label={store.name} 
                                value={store.id} 
                              />
                            ))}
                            <Picker.Item 
                              label={t('camera.receipt.buttons.addNewStore')} 
                              value="add_new_store"
                              color={Theme.colors.primary}
                            />
                          </Picker>
                        </View>
                      </View>
                    ) : (
                      <TouchableOpacity 
                        style={modalStyles.addStoreButton}
                        onPress={() => {
                          setModalVisible(false);
                          navigation.navigate('AddStore');
                        }}
                      >
                        <Text style={modalStyles.addStoreButtonText}>
                          <Ionicons name="add-circle-outline" size={16} /> {t('camera.receipt.buttons.addFirstStore')}
                        </Text>
                      </TouchableOpacity>
                    )}
                    
                    <LineItemsEditor
                      lineItems={editableResult.line_items || []}
                      onLineItemsChange={(items) => 
                        setEditableResult({...editableResult, line_items: items})
                      }
                      editMode={editMode}
                    />
                    
                    <View style={modalStyles.descriptionContainer}>
                      <Text style={modalStyles.descriptionLabel}>{t('camera.receipt.fields.description')}</Text>
                      <TextInput
                        style={modalStyles.descriptionInput}
                        multiline
                        value={description}
                        onChangeText={setDescription}
                        placeholder={t('camera.receipt.placeholders.addDescription')}
                      />
                    </View>
                  </View>

                  <CategorySelector
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                    onAddNewCategory={() => setNewCategoryModalVisible(true)}
                    loading={categoriesLoading}
                  />
                </>
              )}
            </ScrollView>
            
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
                    <Text style={modalStyles.buttonText}>{t('camera.receipt.buttons.addTransaction')}</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={newCategoryModalVisible}
        onRequestClose={() => setNewCategoryModalVisible(false)}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <View style={modalStyles.modalHeader}>
              <Text style={modalStyles.modalTitle}>{t('camera.category.create.title')}</Text>
              <TouchableOpacity 
                style={modalStyles.closeIcon} 
                onPress={() => setNewCategoryModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={modalStyles.formContainer}>
              <Text style={modalStyles.formLabel}>{t('camera.category.create.name')}</Text>
              <TextInput
                style={modalStyles.textInput}
                placeholder={t('camera.category.create.placeholders.name')}
                value={newCategoryName}
                onChangeText={setNewCategoryName}
              />
              
              <Text style={[modalStyles.formLabel, modalStyles.iconSectionLabel]}>{t('camera.category.create.icon')}</Text>
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
                  <Text style={modalStyles.cancelButtonText}>{t('camera.category.create.buttons.cancel')}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[
                    modalStyles.createButton,
                    (!newCategoryName.trim() || !userId) && modalStyles.disabledButton
                  ]}
                  onPress={handleCreateCategory}
                  disabled={!newCategoryName.trim() || !userId}
                >
                  <Text style={modalStyles.createButtonText}>{t('camera.category.create.buttons.create')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
}