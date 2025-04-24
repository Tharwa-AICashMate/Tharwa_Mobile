import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchTransactionsAsync } from "@/redux/slices/transactionSlice";
import MonthSection from "@/componenets/MonthSection";
import { Transaction } from "@/types/transactionTypes";

type FilterType = "all" | "income" | "expense";

const TransactionList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FilterType>("all");
  const dispatch = useDispatch<AppDispatch>();
  const { transactionsByMonth, loading, error } = useSelector(
    (state: RootState) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactionsAsync());
  }, [dispatch]);

  const filterTransactions = (transactions: Transaction[]): Transaction[] => {
    if (activeTab === "all") return transactions;
    return transactions.filter((transaction) => transaction.type === activeTab);
  };

  const renderMonthSection = ({ item }: { item: [string, Transaction[]] }) => {
    const [month, transactions] = item;
    const filteredTransactions = filterTransactions(transactions);

    if (filteredTransactions.length === 0) return null;

    return <MonthSection month={month} transactions={filteredTransactions} />;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFC107" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={Object.entries(transactionsByMonth)}
      keyExtractor={(item) => item[0]}
      renderItem={renderMonthSection}
      showsVerticalScrollIndicator={false}
      initialNumToRender={3}
      windowSize={5}
      removeClippedSubviews={true}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
});

export default TransactionList;
