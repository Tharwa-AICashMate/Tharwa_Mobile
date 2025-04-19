import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { RootStackParamList } from "App";
import BalanceDisplay from "@/componenets/BalanceDisplay";
import ProgressBar from "@/componenets/ProgressBar";
import styles from "./style";
import Theme from "@/theme";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import { addNewCategory, fetchUserCategories } from "@/redux/slices/categoriesSlice";
import AddCategoryModal from "@/componenets/AddCategoryModal";

type CategoriesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Categories"
>;

const CategoriesScreen = () => {
  const navigation = useNavigation<CategoriesScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const userId = "99a72ab5-85b7-484d-8102-adbcf68f6cde";
  const { items: categories } = useAppSelector((state) => state.categories);

  const [modalVisible, setModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        if (userId) {
          const resultAction = await dispatch(fetchUserCategories(userId));
          if (fetchUserCategories.rejected.match(resultAction)) {
            console.error("Fetch error:", resultAction.payload || resultAction.error);
          }
        }
      } catch (err) {
        console.error("Uncaught error:", err);
      }
    };

    loadData();
  }, [dispatch, userId]);

  const handleCategoryPress = (item: any) => {
    if (item.name.toLowerCase() === "more") {
      setModalVisible(true);
    } 
    else if(item.name.toLowerCase() === "savings"){
      navigation.navigate("Savings", { categoryName: item.name });
    }
    else {
      navigation.navigate("CategoryDetail", { categoryName: item.name });
    }
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      dispatch(
        addNewCategory({
          name: newCategoryName.trim(),
          icon: "wallet-outline", 
          user_id: userId,
        })
      );
      setNewCategoryName("");
      setModalVisible(false);
    }
  };

  const handleCancel = () => {
    setNewCategoryName("");
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.categoryCard} onPress={() => handleCategoryPress(item)}>
      <View style={styles.categoryIconContainer}>
        <Ionicons
          name={item.name.toLowerCase() === "more" ? "add" : item.icon || "wallet-outline"}
          size={45}
          color="white"
        />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Categories" />

      <View style={styles.balanceContainer}>
        <BalanceDisplay balance={20000} expense={400000} />
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
        <FlatList
          data={[...categories, { name: "More" }]} 
          numColumns={3}
          keyExtractor={(item, index) => `item-${index}`}
          renderItem={renderItem}
          contentContainerStyle={styles.categoriesGrid}
        />
      </View>

      {/* Modal for Adding Category */}
      <AddCategoryModal
        visible={modalVisible}
        categoryName={newCategoryName}
        onChangeName={setNewCategoryName}
        onSave={handleAddCategory}
        onCancel={handleCancel}
      />
    </SafeAreaView>
  );
};

export default CategoriesScreen;


