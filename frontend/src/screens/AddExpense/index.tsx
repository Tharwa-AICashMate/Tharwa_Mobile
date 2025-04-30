import React, { useCallback, useEffect, useState } from "react";
import { View, SafeAreaView } from "react-native";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import {
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import TransactionForm from "@/componenets/TransactionForm";
import Theme from "@/theme";
import { createTransaction } from "@/redux/slices/categoryTransactions";
import { getCurrentUserId } from "@/utils/auth";
import { RootStackParamList } from "App";
import { editTransactionsAsync } from "@/redux/slices/transactionSlice";
import { fetchUserCategories } from "@/redux/slices/categoriesSlice";


type AddExpensesScreenNavigationProp = NativeStackNavigationProp<{
  CategoryDetail: {
    categoryName: string;
    categoryId: number;
    UserId: string;
    Icon: string;
  };
  AddExpensesScreen: undefined;
}>;
type editRouteProp = RouteProp<RootStackParamList, "AddExpensesScreen">;

const AddExpensesScreen = () => {
  const navigation = useNavigation<AddExpensesScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { items: categories } = useAppSelector((state) => state.categories);
  const route = useRoute<editRouteProp>();

  const [userId, setUserId] = useState<string | null>(null);
  const data = route.params;
  const transaction = data?.transaction;
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

  useEffect(() => {
    if (!categories.length && userId) dispatch(fetchUserCategories(userId));
  }, [userId]);

  const handleSubmit = (data: {
    category: string;
    amount: string;
  
    type: "expense" | "income" | "savings";
    message: string;
    store?:string
    created_at: Date;
    descriptionItems?: Array<{
      name: string;
      unitPrice: string;
      quantity?: string;

    }>;
  }) => {
    const selectedCategory = categories.find(
      (cat) => cat.name === data.category
    );

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
      details: details,
      storeId:data.store
    };
    if (transaction?.transaction_id) {
      dispatch(
        editTransactionsAsync({
          ...newTransaction,
          id: transaction.transaction_id,
        })
      ).then((res) => {
        
          navigation.goBack();
        
      });
    } else
      dispatch(createTransaction(newTransaction)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigation.goBack();
        }
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.primary }}>
      <Header title="Add Expenses" />
      <View style={{ flex: 1, backgroundColor: Theme.colors.background }}>
        {transaction ? (
          <TransactionForm
            title="Expense"
            buttonText="Save"
            // categories={categories}
            onSubmit={handleSubmit}
            initialCategory={transaction?.category_name}
            initialAmount={transaction?.amount.toString()}
            initialTitle={transaction?.title}
            initialMessage={transaction?.description}
            initialDate={new Date(transaction?.created_at)}
          />
        ) : (
          <TransactionForm
            title="Expense"
            buttonText="Save"
              onSubmit={handleSubmit}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddExpensesScreen;