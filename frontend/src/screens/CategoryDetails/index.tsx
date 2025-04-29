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
import { clearTransactions, fetchTransactionsByCategory } from "@/redux/slices/categoryTransactions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getCurrentUserId } from "@/utils/auth";
import { apiBase } from "@/utils/axiosInstance";
import MonthSection from "@/componenets/MonthSection";
import { groupTransactionsByMonth } from "@/utils/helpers";
import ExpenseBrief from "@/componenets/expenceBrief";

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

  const groupedTransactions = groupTransactionsByMonth(TransactionsOfCategory);
  const addExpense = () => {
    navigation.replace("AddExpensesScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={categoryName} />

     <ExpenseBrief/>

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
            <MonthSection key={month} month={month} transactions={groupedTransactions[month]} showCategory={false}/>
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
