import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CategoryType, Transaction } from "@/types/transactionTypes";
import CategoryTransaction from "../CategoryTransaction";
import { formatCurrency, formatDate } from "@/utils/helpers";
import Theme from "@/theme";
import styles from "./styles";

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const {
    amount = 0,
    type = "expense",
    category = "fv",
    date = new Date().toISOString(),
    title = "No description",
  } = transaction;

  return (
    <View style={styles.container}>
      <CategoryTransaction category={transaction.category as CategoryType} />
      <View style={styles.details}>
        <Text style={styles.description}>{title}</Text>
        <Text style={styles.date}>{formatDate(date)}</Text>
      </View>
      
      <View style={styles.seperator}>
        <Text style={styles.category}>{category}</Text>
      </View>
   

      <View style={styles.amountContainer}>
        <Text
          style={[
            styles.amount,
            type === "expense" ? styles.expenseAmount : styles.incomeAmount,
          ]}
        >
          {type === "expense" ? "-" : "+"}
          {formatCurrency(amount)}
        </Text>
      </View>
    </View>
  );
};

export default TransactionItem;
