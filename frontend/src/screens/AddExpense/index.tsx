
import React from "react";
import { View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addTransaction } from "@/redux/slices/expenseSlice";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import TransactionForm from "@/componenets/TransactionForm";
import Theme from "@/theme";

type AddExpensesScreenNavigationProp = NativeStackNavigationProp<{
  CategoryDetail: { categoryName: string };
  AddExpenses: undefined;
}>;

const AddExpensesScreen = () => {
  const navigation = useNavigation<AddExpensesScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.expenses.categories);

  const handleSubmit = (data: {
    date: Date;
    category: string;
    amount: string;
    title: string;
    message: string;
  }) => {
    const selectedCategory = categories.find((cat) => cat.name === data.category);
    
    if (!selectedCategory) {
      console.error("Category not found:", data.category);
      return;
    }

    const newTransaction = {
      category: data.category,
      amount: parseFloat(data.amount),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: data.date,
      icon: selectedCategory?.icon || "cash",
      iconBgColor: "#007AFF",
      title: data.title || data.category,
      message: data.message || "",
    };

    dispatch(addTransaction(newTransaction));
    navigation.navigate("CategoryDetail", {
      categoryName: selectedCategory.name,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.primary }}>
      <Header title="Add Expenses"  />
      <View style={{ flex: 1, backgroundColor: Theme.colors.background }}>
        <TransactionForm
          title="Expense"
          buttonText="Save"
          categories={categories}
          onSubmit={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddExpensesScreen;