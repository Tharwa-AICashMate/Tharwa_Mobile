


import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Pressable,
  StatusBar,
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
import AddCategoryModal from "@/componenets/AddCategoryModal";
import CategorySection from "@/componenets/CategorySection";
import { addCategory } from "@/redux/slices/expenseSlice";

type CategoriesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Categories"
>;

const CategoriesScreen = () => {
  const navigation = useNavigation<CategoriesScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const expenses = useAppSelector((state) => state.expenses);

  if (!expenses) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const { budget, categories } = expenses;

  const navigateToCategory = (categoryName: string) => {
    if (categoryName === "Savings") {
      navigation.navigate("Savings");
    } else {
      navigation.navigate("CategoryDetail", { categoryName });
    }
  };

  const openAddCategoryModal = () => {
    setModalVisible(true);
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      dispatch(
        addCategory({
          name: newCategoryName,
          icon: "wallet-outline",
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={Theme.colors.highlight} translucent={false} />
      
      {/* Header */}
      <Header title="Categories"  />

      {/* Budget Summary */}
      <View style={styles.balanceContainer}>
        <BalanceDisplay balance={budget.totalExpenses} expense={budget.totalIncome} />
      </View>

      <View style={styles.budgetContainer}>
        <View style={styles.progressContainer}>
          <ProgressBar percentage={budget.percentageUsed} amount={budget.budgetLimit} />
        </View>

        {/* Budget Status */}
        <View style={styles.budgetStatus}>
          <Ionicons name="checkbox-outline" size={16} color={Theme.colors.text} />
          <Text style={styles.budgetStatusText}>
            {budget.percentageUsed}% Of Your Expenses, Looks Good.
          </Text>
        </View>
      </View>

      {/* Categories Grid */}
      <View style={styles.categoriesContainer}>
        <ScrollView contentContainerStyle={styles.categoriesGrid}>
          <CategorySection data={categories} onpress={navigateToCategory} />

          {/* More Category Card */}
          <TouchableOpacity style={styles.categoryCard}>
            <Pressable
              onPress={openAddCategoryModal}
              style={({ pressed }) => [
                styles.categoryIconContainer,
                {
                  backgroundColor: pressed
                    ? Theme.colors.accentDark
                    : Theme.colors.accentLight,
                },
              ]}
            >
              <Ionicons name="add" size={40} color="white" />
            </Pressable>
            <Text style={styles.categoryName}>More</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* New Category Modal */}
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
