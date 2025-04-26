
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { RootStackParamList } from "App";
import BalanceDisplay from "@/componenets/BalanceDisplay";
import ProgressBar from "@/componenets/ProgressBar";
import styles from "./style";
import Theme from "@/theme";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import {
  addNewCategory,
  fetchUserCategories,
  removeCategory,
} from "@/redux/slices/categoriesSlice";
import AddCategoryModal from "@/componenets/AddCategoryModal";
import { getCurrentUserId } from "@/utils/auth";

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
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("wallet-outline");
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const currentUserId = await getCurrentUserId();
        if (currentUserId) {
          setUserId(currentUserId);
          const resultAction = await dispatch(fetchUserCategories(currentUserId));
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

  const fetchBalance = async () => {
    try {
      const currentUserId = await getCurrentUserId();
      if (!currentUserId) return;

      const response = await fetch(`http://192.168.1.5:3000/api/balances/user/${currentUserId}`);
      if (!response.ok) throw new Error('Failed to fetch balance');

      const data = await response.json();
      setTotalBalance(data.balance_limit || 0);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBalance();
    }, [])
  );

  const handleCategoryPress = (item: any) => {
    if (!userId) return;

    if (item.name.toLowerCase() === "more") {
      setModalVisible(true);
    } else if (item.name.toLowerCase() === "savings") {
      navigation.navigate("Savings", { categoryName: item.name });
    } else {
      navigation.navigate("CategoryDetail", {
        categoryName: item.name,
        categoryId: item.id,
        UserId: userId,
        Icon: item.icon,
      });
    }
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim() && userId) {
      dispatch(
        addNewCategory({
          name: newCategoryName.trim(),
          icon: selectedIcon,
          user_id: userId,
        })
      );
      resetModalState();
    }
  };

  const resetModalState = () => {
    setNewCategoryName("");
    setSelectedIcon("wallet-outline");
    setModalVisible(false);
  };

  const handleCancel = () => {
    resetModalState();
  };

  const handleRemoveCategory = (categoryId: number, categoryName: string) => {
    Alert.alert(
      "Delete Category",
      `Are you sure you want to delete the category "${categoryName}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => dispatch(removeCategory(categoryId)),
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => handleCategoryPress(item)}
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
          style={styles.removeCategoryButton}
          onPress={() => handleRemoveCategory(item.id, item.name)}
        >
          <Ionicons name="close" size={15} color={"white"} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Categories" />

      <View style={styles.balanceContainer}>
        <BalanceDisplay balance={totalBalance} expense={400000} />
      </View>

      <View style={styles.budgetContainer}>
        <View style={styles.progressContainer}>
          <ProgressBar percentage={30} amount={40} />
        </View>

        <View style={styles.budgetStatus}>
          <Ionicons name="checkbox-outline" size={16} color={Theme.colors.text} />
          <Text style={styles.budgetStatusText}>
            {30}% Of Your Expenses, Looks Good.
          </Text>
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={Theme.colors.primary}
            style={styles.loadingSpinner}
          />
        ) : (
          <FlatList
            data={[...categories, { name: "More" }]}
            numColumns={3}
            keyExtractor={(item, index) => `item-${index}`}
            renderItem={renderItem}
            contentContainerStyle={styles.categoriesGrid}
          />
        )}
      </View>

      <AddCategoryModal
        visible={modalVisible}
        categoryName={newCategoryName}
        onChangeName={setNewCategoryName}
        selectedIcon={selectedIcon}
        onSelectIcon={setSelectedIcon}
        onSave={handleAddCategory}
        onCancel={handleCancel}
      />
    </SafeAreaView>
  );
};

export default CategoriesScreen;