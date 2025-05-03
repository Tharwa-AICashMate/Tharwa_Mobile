import React from "react";
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
import {
  formatArabicDate,
  formatArabicNumber,
  formatCurrency,
  formatDate,
} from "@/utils/helpers";
import { Transaction } from "@/types/transactionTypes";
import { deleteTransactionsAsync } from "@/redux/slices/transactionSlice";
import { useAppDispatch } from "@/redux/hook";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { deleteDeposit } from "@/redux/slices/depositSlice";
import { useTranslation } from "react-i18next";

interface TransactionItemProps {
  transaction: Transaction;
  iconBgColor?: string;
  showCategory: boolean;
  isMenuVisible: boolean;
  onToggleMenu: (id: string | null) => void;
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
  const dispatch = useAppDispatch();
  const navigation = useNavigation<navProps>();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const handleEdit = () => {
    onToggleMenu(null);
    if (transaction.type === "income") {
      navigation.navigate("AddIncome", { transaction });
    } else {
      navigation.navigate("AddExpensesScreen", { transaction });
    }
  };

  const handleDelete = () => {
    onToggleMenu(null);
    if (transaction.type) {
      dispatch(deleteTransactionsAsync(transaction.transaction_id));
    } else {
      dispatch(deleteDeposit(transaction.id));
    }
  };

  const handlePress = () => {
    if (!transaction.type) {
      Alert.alert(transaction.message || "No details added");
    }
  };

  const renderAmount = () => {
    if (isRTL) {
      return `${formatArabicNumber(transaction.amount)}${
        transaction.type === "expense" ? "−" : "+"
      }`;
    } else {
      return `${transaction.type === "expense" ? "-" : "+"}${formatCurrency(
        transaction.amount
      )}`;
    }
  };

  return (
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
          {isRTL
            ? formatArabicDate(transaction.created_at)
            : formatDate(transaction.created_at)}
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
          isRTL && styles.rtlAmount,
        ]}
      >
        {renderAmount()}
      </Text>

      <TouchableOpacity
        onPress={() =>
          isMenuVisible
            ? onToggleMenu(null)
            : onToggleMenu(transaction.transaction_id)
        }
        style={styles.menuIcon}
      >
        <Ionicons name="ellipsis-vertical" size={20} color={Theme.colors.text} />
      </TouchableOpacity>

      {isMenuVisible && (
        <>
          <TouchableWithoutFeedback onPress={() => onToggleMenu(null)}>
            <View style={StyleSheet.absoluteFillObject} />
          </TouchableWithoutFeedback>

          <View style={[styles.dropdownMenu, isRTL && styles.rtlDropdownMenu]}>
            {transaction.details?.length > 0 && (
              <Pressable
                onPress={() =>
                  navigation.navigate("transDetails", {
                    transaction: transaction.details,
                  })
                }
                style={styles.menuItem}
              >
                <Text>{t("transactionItem.viewDetails")}</Text>
              </Pressable>
            )}
            {transaction.type && (
              <Pressable onPress={handleEdit} style={styles.menuItem}>
                <Text>{t("transactionItem.edit")}</Text>
              </Pressable>
            )}
            <Pressable onPress={handleDelete} style={styles.menuItem}>
              <Text style={{ color: "red" }}>{t("transactionItem.delete")}</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
};

export default TransactionItem;
