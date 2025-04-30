import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import {  useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { RootStackParamList } from "App";
import styles from "./style";
import Theme from "@/theme";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import {
  addNewCategory,
  fetchUserCategories,
  removeCategory,
  editCategory,
} from "@/redux/slices/categoriesSlice";
import AddCategoryModal from "@/componenets/AddCategoryModal";
import { getCurrentUserId } from "@/utils/auth";
import ExpenseBrief from "@/componenets/expenceBrief";

type CategoriesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Categories"
>;

const CategoriesScreen = () => {
  const navigation = useNavigation<CategoriesScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { items: categories, loading } = useAppSelector(
    (state) => state.categories
  );

  const [userId, setUserId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("wallet-outline");
  const [totalBalance, setTotalBalance] = useState(0);
  const [nameError, setNameError] = useState("");
  const [iconError, setIconError] = useState("");
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Filter out the income category
  const filteredCategories = categories.filter(
    (category) => category.name.toLowerCase() !== "income"
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const currentUserId = await getCurrentUserId();
        if (currentUserId) {
          setUserId(currentUserId);
          const resultAction = await dispatch(fetchUserCategories(currentUserId));
          if (fetchUserCategories.fulfilled.match(resultAction)) {
            setCategoriesLoaded(true);
          }
        }
      } catch (err) {
        console.error("Uncaught error:", err);
      }
    };

    loadData();
  }, [dispatch]);



  const handleCategoryPress = (item: any) => {
    if (!userId) return;

    if (item.name.toLowerCase() === "more") {
      openAddModal();
    } else {
      navigation.navigate("CategoryDetail", {
        categoryName: item.name,
        categoryId: item.id,
        UserId: userId,
        Icon: item.icon,
      });
    }
  };

  const handleCategoryLongPress = (item: any) => {
    if (item.name.toLowerCase() === "more") return;
    
    setSelectedCategory(item);
    setActionModalVisible(true);
  };

  const openAddModal = () => {
    setEditMode(false);
    setNewCategoryName("");
    setSelectedIcon("wallet-outline");
    setNameError("");
    setIconError("");
    setModalVisible(true);
  };

  const openEditModal = () => {
    if (!selectedCategory) return;
    
    setEditMode(true);
    setNewCategoryName(selectedCategory.name);
    setSelectedIcon(selectedCategory.icon || "wallet-outline");
    setNameError("");
    setIconError("");
    setModalVisible(true);
    setActionModalVisible(false);
  };

  const handleAddCategory = () => {
    if (!userId) {
      setNameError("User not authenticated");
      return;
    }

    const trimmedName = newCategoryName.trim();
    setNameError("");
    setIconError("");

    if (!trimmedName) {
      setNameError("Category name cannot be empty");
      return;
    }
    
    if (trimmedName.length > 20) {
      setNameError("Category name cannot exceed 20 characters");
      return;
    }
    
    const nameExists = filteredCategories.some(cat => 
      cat.name.toLowerCase() === trimmedName.toLowerCase() && 
      (!editMode || (editMode && cat.id !== selectedCategory.id))
    );
    
    if (nameExists) {
      setNameError("A category with this name already exists");
      return;
    }
    
    if (!selectedIcon) {
      setIconError("Please select an icon for the category");
      return;
    }

    if (editMode && selectedCategory) {
      dispatch(
        editCategory({
          id: selectedCategory.id,
          updates: {
            name: trimmedName,
            icon: selectedIcon,
          },
        })
      );
    } else {
      dispatch(
        addNewCategory({
          name: trimmedName,
          icon: selectedIcon,
          user_id: userId,
        })
      );
    }
    resetModalState();
  };

  const resetModalState = () => {
    setNewCategoryName("");
    setSelectedIcon("wallet-outline");
    setModalVisible(false);
    setNameError("");
    setIconError("");
    setEditMode(false);
  };

  const handleCancel = () => {
    resetModalState();
  };

  const handleRemoveCategory = () => {
    if (!selectedCategory) return;
    
    setActionModalVisible(false);
    
    Alert.alert(
      "Delete Category",
      `Are you sure you want to delete the category "${selectedCategory.name}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            dispatch(removeCategory(selectedCategory.id));
            setSelectedCategory(null);
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => handleCategoryPress(item)}
      onLongPress={() => handleCategoryLongPress(item)}
      delayLongPress={300}
    >
      <View style={styles.categoryIconContainer}>
        <Ionicons
          name={
            item.name.toLowerCase() === "more"
              ? "add"
              : item.icon || "wallet-outline"
          }
          size={45}
          color="white"
        />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
      {item.name.toLowerCase() !== "more" && (
        <TouchableOpacity
          style={styles.optionsButton}
          onPress={() => handleCategoryLongPress(item)}
        >
          <Ionicons name="ellipsis-vertical" size={18} color="white" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Categories" />

     <ExpenseBrief/>

      <View style={styles.categoriesContainer}>
        {loading || !categoriesLoaded ? (
          <View style={styles.sectionLoadingContainer}>
            <ActivityIndicator
              size="large"
              color={Theme.colors.primary}
            />
          </View>
        ) : (
          <FlatList
            data={[...filteredCategories, { name: "More" }]}
            numColumns={3}
            keyExtractor={(item, index) => `item-${index}`}
            renderItem={renderItem}
            contentContainerStyle={styles.categoriesGrid}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No categories found</Text>
              </View>
            }
          />
        )}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={actionModalVisible}
        onRequestClose={() => setActionModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.actionModalOverlay}
          activeOpacity={1}
          onPress={() => setActionModalVisible(false)}
        >
          <View style={styles.actionModalContainer}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={openEditModal}
            >
              <Ionicons name="pencil" size={24} color={Theme.colors.primary} />
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
            
            <View style={styles.actionDivider} />
            
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleRemoveCategory}
            >
              <Ionicons name="trash" size={24} color={Theme.colors.primary} />
              <Text style={[styles.actionButtonText, { color: Theme.colors.text}]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <AddCategoryModal
        visible={modalVisible}
        categoryName={newCategoryName}
        onChangeName={setNewCategoryName}
        selectedIcon={selectedIcon}
        onSelectIcon={setSelectedIcon}
        onSave={handleAddCategory}
        onCancel={handleCancel}
        nameError={nameError}
        iconError={iconError}
        targetAmount={""}
        isEditing={editMode}
      />
    </SafeAreaView>
  );
};

export default CategoriesScreen;