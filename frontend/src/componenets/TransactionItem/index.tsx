import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Theme from "@/theme";
import styles from "./style";
import { formatCurrency, formatDate } from "@/utils/helpers";
import { Transaction } from "@/types/transactionTypes";
import { deleteTransactionsAsync } from "@/redux/slices/transactionSlice";
import { useAppDispatch } from "@/redux/hook";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { deleteDeposit } from "@/redux/slices/depositSlice";

interface TransactionItemProps {
  transaction: Transaction;
  iconBgColor?: string;
  showCategory: boolean;
  isMenuVisible: boolean;
  onToggleMenu: (id: string) => void;
  icon?: string;
}

type navProps = NativeStackScreenProps<RootStackParamList, "CategoryDetail">;
const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  iconBgColor = Theme.colors.accentLight,
  showCategory = true,
  icon,
  isMenuVisible,
  onToggleMenu,
}) => {
  const menuVisible = isMenuVisible;
  const dispatch = useAppDispatch();
  const navigation = useNavigation<navProps>();

  const handleEdit = () => {
    onToggleMenu(null);
    if (transaction.type == "income")
      navigation.navigate("AddIncome", { transaction });
    else navigation.navigate("AddExpensesScreen", { transaction });
  };

  const handleDelete = () => {
    onToggleMenu(null);
    dispatch(deleteTransactionsAsync(transaction.transaction_id));
  };

  const handlePress = () => {
    if (!transaction.type)
      Alert.alert(transaction.message || "No details added");
  };
  console.log(transaction);
  return (
    <>
      <View style={styles.transactionItem}>
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          <Ionicons
            name={transaction.icon || (icon as any)}
            size={20}
            color="white"
          />
        </View>

        <View style={styles.transactionDetails}>
          <Text
            style={styles.transactionTitle}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {transaction.title || transaction.category_name}
          </Text>
          <Text style={styles.transactionSubtitle}>
            {formatDate(transaction.created_at)}
          </Text>
        </View>

        {showCategory && (
          <View style={styles.seperator}>
            <Text
              style={styles.category}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
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

        {transaction.type ? (
          <TouchableOpacity
            onPress={() => onToggleMenu(transaction.transaction_id)}
            style={styles.menuIcon}
          >
            <Ionicons
              name="ellipsis-vertical"
              size={20}
              color={Theme.colors.text}
            />
          </TouchableOpacity>
        ) : (
          <>
          <TouchableOpacity onPress={()=>dispatch(deleteDeposit(transaction.id))} style={{zIndex:100}}>
          <Ionicons
              name="trash"
              size={15}
              color="#F55"
              />
            
          </TouchableOpacity>
            <TouchableOpacity onPress={handlePress} style={{position:'absolute',top:0,left:0,height:"100%",width:"100%"}}>
        
          </TouchableOpacity>
          </>
        )}
        {menuVisible && (
          <>
            <TouchableWithoutFeedback onPress={() => onToggleMenu(null)}>
              <View style={StyleSheet.absoluteFillObject} />
            </TouchableWithoutFeedback>

            <View style={styles.dropdownMenu}>
              {transaction.details?.length && (
                <Pressable
                  onPress={() =>
                    navigation.navigate("transDetails", {
                      transaction: transaction,
                    })
                  }
                  style={styles.menuItem}
                >
                  <Text>View Details</Text>
                </Pressable>
              )}
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
