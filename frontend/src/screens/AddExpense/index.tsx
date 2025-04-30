import React, { useCallback, useState } from "react";
import { View, SafeAreaView } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import TransactionForm from "@/componenets/TransactionForm";
import Theme from "@/theme";
import { createTransaction } from "@/redux/slices/categoryTransactions";
import { getCurrentUserId } from "@/utils/auth";

type AddExpensesScreenNavigationProp = NativeStackNavigationProp<{
  CategoryDetail: { categoryName: string; categoryId: number; UserId: string; Icon: string };
  AddExpensesScreen: undefined;
}>;

const AddExpensesScreen = () => {
  const navigation = useNavigation<AddExpensesScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { items: categories } = useAppSelector((state) => state.categories);

  const [userId, setUserId] = useState<string | null>(null);

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
    descriptionItems?: Array<{
      name: string;
      unitPrice: string;
      quantity?: string;
    }>;
  }) => {
    const selectedCategory = categories.find((cat) => cat.name === data.category);
    if (!selectedCategory || !userId) {
      console.error("Category or user not found");
      return;
    }
  
    // Format description items for database
    const details = data.descriptionItems?.map(item => ({
      name: item.name,
      unitPrice: parseFloat(item.unitPrice),
      quantity: item.quantity ? parseInt(item.quantity) : undefined
    }));
  
    const newTransaction = {
      user_id: userId,
      category_id: Number(selectedCategory.id),
      amount: parseFloat(data.amount),
      type: data.type as "expense" | "income",
      title: data.title || data.category,
      created_at: data.created_at,
      details: details
    };
  
    dispatch(createTransaction(newTransaction)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigation.navigate("CategoryDetail", {
          categoryName: selectedCategory.name,
          categoryId: selectedCategory.id as number,
          UserId: userId,
          Icon: selectedCategory.icon,
        });
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.primary }}>
      <Header title="Add Expenses" />
      <View style={{ flex: 1, backgroundColor: Theme.colors.background }}>
        <TransactionForm
          title="Expense"
          buttonText="Save"
          onSubmit={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddExpensesScreen;