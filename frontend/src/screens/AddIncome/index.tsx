import React, { useCallback, useState } from "react";
import { View, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import TransactionForm from "@/componenets/TransactionForm";
import Theme from "@/theme";
import { createTransaction } from "@/redux/slices/categoryTransactions";
import { fetchUserCategories } from "@/redux/slices/categoriesSlice";
import { getCurrentUserId } from "@/utils/auth";
import { editTransactionsAsync } from "@/redux/slices/transactionSlice";
import { updateWeeklyHighs } from "@/redux/slices/financeSlice";
import { useTranslation } from "react-i18next";


const AddIncomeScreen = () => {
  const dispatch = useAppDispatch();
  const { items: categories, loading } = useAppSelector(
    (state) => state.categories
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const data = route.params;
  const { t } = useTranslation();
  const transaction = data?.transaction;

  useFocusEffect(
    useCallback(() => {
      const fetchUserId = async () => {
        try {
          const id = await getCurrentUserId();
          setUserId(id);
        } catch (error) {
          console.log("Failed to get user ID:", error);
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
    if (!userId) {
      console.log("user not found");
      return;
    }

    const newTransaction = {
      user_id: userId,
      amount: parseFloat(data.amount),
      type: "income" as "income" | "expense",
      title: data.title || data.category,
      created_at: data.created_at,
    };
    if (transaction?.transaction_id) {
      // console.log("----------------------test ", {
      //   ...newTransaction,
      //   id: transaction.transaction_id,
      // });
      dispatch(
        editTransactionsAsync({
          ...newTransaction,
          id: transaction.transaction_id,
        })
      ).then((res) => {
        navigation.goBack();
        dispatch(
          updateWeeklyHighs({
            ...newTransaction,
            created_at: newTransaction.created_at.toString(),
          })
        );
      });
    } else
      dispatch(createTransaction(newTransaction)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          Alert.alert("Success", "Income recorded successfully", [
            { text: "OK", onPress: () => navigation.goBack() },
          ]);
        }
        dispatch(
          updateWeeklyHighs({
            ...newTransaction,
            created_at: newTransaction.created_at.toString(),
          })
        );
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.background }}>
      <Header title="Add Income" />
      {transaction ? (
        <TransactionForm
          title={t("addIncome")}
          buttonText={isProcessing ? "Processing..." : "Save Income"}
          onSubmit={handleSubmit}
          isIncome={true}
          resetAfterSubmit={true}
          initialAmount={transaction?.amount.toString()}
          initialTitle={transaction?.title}
          initialMessage={transaction?.description}
          initialDate={new Date(transaction?.created_at)}
        />
      ) : (
        <TransactionForm
          title="Income"
          buttonText={isProcessing ? "Processing..." : "Save Income"}
          onSubmit={handleSubmit}
          isIncome={true}
          resetAfterSubmit={true}
        />
      )}
    </SafeAreaView>
  );
};

export default AddIncomeScreen;
