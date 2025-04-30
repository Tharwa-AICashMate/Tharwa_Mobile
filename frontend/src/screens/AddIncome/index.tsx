import React, { useCallback, useState } from "react";
import { View, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import TransactionForm from "@/componenets/TransactionForm";
import Theme from "@/theme";
import { createTransaction } from "@/redux/slices/categoryTransactions";
import { fetchUserCategories } from "@/redux/slices/categoriesSlice";
import { getCurrentUserId } from "@/utils/auth";

const AddIncomeScreen = () => {
  const dispatch = useAppDispatch();
  const { items: categories, loading } = useAppSelector((state) => state.categories);
  const [userId, setUserId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigation = useNavigation();


  useFocusEffect(
    useCallback(() => {
      const fetchUserId = async () => {
        try {
          const id = await getCurrentUserId();
          setUserId(id);
        } catch (error) {
          console.error("Failed to get user ID:", error);
        }
      };
      fetchUserId();
    }, [])
  );

  const handleSubmit = (data: {
    category: string;
    amount: string;
    title: string;
    type: "expense" | "income" | "savings";
    message: string;
    created_at: Date;
    descriptionItems?: any[];
  }) => {
    const selectedCategory = categories.find((cat) => cat.name === "income");
    if (!selectedCategory || !userId) {
      console.error("Category or user not found");
      return;
    }
  
  
const newTransaction = {
      user_id: userId,
      category_id: Number(selectedCategory.id),
      amount: parseFloat(data.amount),
      type: "income" as "income"|"expense",
      title: data.title || data.category,
      created_at: data.created_at,
    
    };
  
    dispatch(createTransaction(newTransaction)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        Alert.alert(
          "Success", 
          "Income recorded successfully",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.background }}>
      <Header title="Add Income" />
      <TransactionForm
        title="Income"
        buttonText={isProcessing ? "Processing..." : "Save Income"}
        onSubmit={handleSubmit}
        isIncome={true}
        resetAfterSubmit={true}
      />
    </SafeAreaView>
  );
};

export default AddIncomeScreen;