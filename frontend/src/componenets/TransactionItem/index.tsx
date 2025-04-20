import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Theme from "@/theme";
import styles from "./style";

interface TransactionItemProps {
  id?: string;
  title: string;
  subtitle: string;
  amount: number;
  icon: string;
  iconBgColor?: string;
  isDeposit?: boolean;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  title,
  subtitle,
  amount,
  icon,
  iconBgColor = Theme.colors.accentLight,
  isDeposit = false,
}) => {
  // Format currency
  const formatCurrency = (amount: number): string => {
    return amount
      .toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(/\.00$/, "");
  };

  return (
    <View style={styles.transactionItem}>
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        <Ionicons name={icon as any} size={20} color="white" />
      </View>

      <View style={styles.transactionDetails}>
        <Text style={styles.transactionTitle}>{title}</Text>
        <Text style={styles.transactionSubtitle}>{subtitle}</Text>
      </View>

      <Text
        style={[
          styles.transactionAmount,
          isDeposit && styles.depositAmount,
        ]}
      >
        {isDeposit ? "+" : "-"}
        {formatCurrency(amount)}
      </Text>
    </View>
  );
};



export default TransactionItem;