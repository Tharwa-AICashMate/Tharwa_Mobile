import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootStackParamList } from "App";
import BalanceDisplay from "@/componenets/BalanceDisplay";
import ProgressBar from "@/componenets/ProgressBar";
import Theme from "@/theme";
import styles from "./style";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import TransactionItem from "@/componenets/TransactionItem";
import { clearTransactions, fetchTransactionsByCategory } from "@/redux/slices/categoryTransactions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getCurrentUserId } from "@/utils/auth";

dayjs.extend(utc);

type CategoryDetailProps = NativeStackScreenProps<
  RootStackParamList,
  "CategoryDetail"
>;
type CategoryDetailRouteProp = CategoryDetailProps["route"];
type CategoryDetailNavigationProp = CategoryDetailProps["navigation"];

const CategoryDetailScreen = () => {
  const route = useRoute<CategoryDetailRouteProp>();
  const navigation = useNavigation<CategoryDetailNavigationProp>();
  const dispatch = useAppDispatch();

  const { categoryName, categoryId, UserId, Icon } = route.params;
  const userId = UserId;
  const [totalBalance, setTotalBalance] = useState(0);

  const fetchBalance = async () => {
    try {
      const user_id = await getCurrentUserId();
      console.log("user_id", user_id);
      // const response = await fetch(`http://192.168.1.105:3000/api/balances/user/${user_id}`);
      const response = await fetch(`http://192.168.1.4:3000/api/balances/user/${user_id}`);

      if (!response.ok) {
        throw new Error('Failed to fetch balance');
      }

      const data = await response.json();
      setTotalBalance(data.balance_limit || 0);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBalance(); 
    }, [])
  );
  const {
    loading: isLoading,
    data: TransactionsOfCategory,
  } = useAppSelector((state) => state.transactionsByCategory);

  useFocusEffect(
    useCallback(() => {
      if (categoryId && userId) {
        dispatch(clearTransactions());
        dispatch(fetchTransactionsByCategory({ userId, categoryId }));
      }
    }, [categoryId, userId, dispatch])
  );

  const groupedTransactions = TransactionsOfCategory.reduce(
    (groups: { [key: string]: typeof TransactionsOfCategory }, transaction) => {
      const date = dayjs.utc(transaction.created_at);
      const monthName = date.format("MMMM YYYY");

      if (!groups[monthName]) {
        groups[monthName] = [];
      }

      groups[monthName].push(transaction);
      return groups;
    },
    {}
  );

  const addExpense = () => {
    navigation.navigate("AddExpensesScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={categoryName} />

      <View style={styles.balanceContainer}>
        <BalanceDisplay balance={totalBalance} expense={2000} />
      </View>

      <View style={styles.budgetContainer}>
        <View style={styles.progressContainer}>
          <ProgressBar percentage={20} amount={10} />
        </View>

        <View style={styles.budgetStatus}>
          <Ionicons
            name="checkbox-outline"
            size={16}
            color={Theme.colors.text}
          />
          <Text style={styles.budgetStatusText}>
            {30}% Of Your Budget Used
          </Text>
        </View>
      </View>

      <ScrollView style={styles.transactionList}>
        {isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              minHeight: 200,
              
            }}
          >
            <ActivityIndicator size="large" color={Theme.colors.primary} />
          </View>
        ) : (
          Object.keys(groupedTransactions).map((month) => (
            <View key={month} style={styles.monthSection}>
              <Text style={styles.monthTitle}>{month}</Text>

              {groupedTransactions[month].map((transaction) => {
                const dateFormatted = dayjs
                  .utc(transaction.created_at)
                  .local()
                  .format("D MMM YYYY, h:mm A");

                return (
                  <TransactionItem
                    key={transaction.transaction_id as any}
                    id={transaction.transaction_id as any}
                    title={transaction.title || categoryName}
                    subtitle={dateFormatted}
                    amount={transaction.amount}
                    isDeposit={transaction.type === "income"}
                    icon={Icon}
                    iconBgColor={Theme.colors.accentLight}
                  />
                );
              })}
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.addExpenseContainer}>
        <TouchableOpacity style={styles.addButton} onPress={addExpense}>
          <Text style={styles.addButtonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CategoryDetailScreen;
