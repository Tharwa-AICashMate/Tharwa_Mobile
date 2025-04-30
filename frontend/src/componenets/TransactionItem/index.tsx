import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Theme from "@/theme";
import styles from "./style";
import { formatCurrency, formatDate } from "@/utils/helpers";
import { Transaction } from "@/types/transactionTypes";

interface TransactionItemProps {
  transaction:Transaction
  iconBgColor?: string;
  showCategory:boolean,
  icon?:string
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  iconBgColor = Theme.colors.accentLight,
  showCategory = true,
  icon
}) => {
  return (
    <View style={styles.transactionItem}>
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        <Ionicons name={transaction.icon  || icon  as any} size={20} color="white" />
      </View>

      <View style={styles.transactionDetails}>
        <Text style={styles.transactionTitle} ellipsizeMode="tail" numberOfLines={1}>{transaction.title || transaction.category_name}</Text>
        <Text style={styles.transactionSubtitle}>{formatDate(transaction.created_at)}</Text>
      </View>
      
      {showCategory && (
        <View style={styles.seperator}>
          <Text style={styles.category} ellipsizeMode="tail" numberOfLines={1}>{transaction.category_name}</Text>
        </View>
      )}

      <Text
        style={[
          styles.transactionAmount,
          transaction.type === "expense" && styles.depositAmount,
        ]}
      >
        {transaction.type === "expense" ? "-" : "+"}
        {formatCurrency(transaction.amount)}
      </Text>
    </View>
  );
};

export default TransactionItem;