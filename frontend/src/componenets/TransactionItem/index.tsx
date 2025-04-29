import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Theme from "@/theme";
import styles from "./style";
import { formatCurrency, formatDate } from "@/utils/helpers";
import { Transaction } from "@/types/transactionTypes";
import { deleteTransactionsAsync } from "@/redux/slices/transactionSlice";
import { useAppDispatch } from "@/redux/hook";

interface TransactionItemProps {
  transaction: Transaction;
  iconBgColor?: string;
  showCategory: boolean;
  isMenuVisible: boolean;
  onToggleMenu: (id: string) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  iconBgColor = Theme.colors.accentLight,
  showCategory = true,
  isMenuVisible,
  onToggleMenu
}) => {
  const menuVisible = isMenuVisible;
  const dispatch = useAppDispatch()

  const handleEdit = () => {
    onToggleMenu(null);
   // onEdit?.(transaction);
  };

  const handleDelete = () => {
    onToggleMenu(null);
    dispatch(deleteTransactionsAsync(transaction.transaction_id))
   // onDelete?.(transaction);
  };

  return (
    <>
      <View style={styles.transactionItem}>
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          <Ionicons name={transaction.icon} size={20} color="white" />
        </View>

        <View style={styles.transactionDetails}>
          <Text style={styles.transactionTitle} numberOfLines={1} ellipsizeMode="tail">
            {transaction.title || transaction.category_name}
          </Text>
          <Text style={styles.transactionSubtitle}>
            {formatDate(transaction.created_at)}
          </Text>
        </View>

        {showCategory && (
          <View style={styles.seperator}>
            <Text style={styles.category} numberOfLines={1} ellipsizeMode="tail">
              {transaction.category_name}
            </Text>
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

        <TouchableOpacity onPress={() => onToggleMenu(transaction.transaction_id)} style={styles.menuIcon}>
          <Ionicons name="ellipsis-vertical" size={20} color={Theme.colors.text} />
        </TouchableOpacity>
      {menuVisible && (
        <>
          <TouchableWithoutFeedback onPress={() => onToggleMenu(null)}>
            <View style={StyleSheet.absoluteFillObject} />
          </TouchableWithoutFeedback>

          <View style={styles.dropdownMenu}>
            <Pressable onPress={handleEdit} style={styles.menuItem}>
              <Text>Edit</Text>
            </Pressable>
            <Pressable onPress={handleDelete} style={styles.menuItem}>
              <Text style={{ color: "red" }}>Delete</Text>
            </Pressable>
          </View>
        </>
      )}
      </View>

      {menuVisible && (
        
          <TouchableWithoutFeedback onPress={() => onToggleMenu(null)}>
            <View style={StyleSheet.absoluteFillObject} />
          </TouchableWithoutFeedback>
          )}
    </>
  );
};


export default TransactionItem;
