import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
   SafeAreaView,
  ActivityIndicator,
} from "react-native";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootStackParamList } from "App";

import Theme from "@/theme";
import styles from "./style";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import {
  clearTransactions,
  fetchTransactionsByCategory,
} from "@/redux/slices/categoryTransactions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import MonthSection from "@/componenets/MonthSection";
import { groupTransactionsByMonth } from "@/utils/helpers";
import ExpenseBrief from "@/componenets/expenceBrief";
import { FlatList } from "react-native-gesture-handler";

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

  const { loading: isLoading, data: TransactionsOfCategory } = useAppSelector(
    (state) => state.transactionsByCategory
  );

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadCategoryTransactions = async (reset = false) => {
    try {
      const currentPage = reset ? 1 : page;
      console.log(`Loading category transactions for page ${currentPage}`);
      const result = await dispatch(
        fetchTransactionsByCategory({ userId, categoryId, page: currentPage })
      );
      if (fetchTransactionsByCategory.fulfilled.match(result)) {
        const payload = result.payload.transactions;

        if (reset) {
          setPage(2);
        } else {
          setPage((prevPage) => prevPage + 1);
        }

        if (!payload || payload.length < 20) {
          console.log("No more category transactions available");
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } else {
        console.error("Failed to load category transactions:", result.payload);
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error loading category transactions:", err);
      setHasMore(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (categoryId && userId) {
        dispatch(clearTransactions());
        loadCategoryTransactions(true);
      }
    }, [categoryId, userId, dispatch])
  );

  const groupedTransactions = TransactionsOfCategory.reduce(
    (groups: { [key: string]: typeof TransactionsOfCategory }, transaction) => {
      const date = dayjs.utc(new Date(transaction.created_at));
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
  const renderFooter = () => {
    if (isLoading && page > 1) {
      return (
        <View
          style={{
            padding: 16,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <ActivityIndicator size="small" color={Theme.colors.primary} />
          <Text style={{ marginLeft: 10, fontSize: 14, color: "#666" }}>
            Loading more...
          </Text>
        </View>
      );
    }
    return null;
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title={categoryName} />

      <ExpenseBrief />
      <View style={styles.transactionList}>
        {isLoading && TransactionsOfCategory.length == 0? (
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
          <FlatList
            data={Object.entries(
              groupTransactionsByMonth(TransactionsOfCategory)
            )}
            keyExtractor={(item) => item[0]}
            renderItem={({ item }) => (
              <MonthSection
                month={item[0]}
                transactions={item[1]}
                showCategory={false}
              />
            )}
            ListFooterComponent={renderFooter}
            onEndReached={() => {
              if (hasMore && !isLoading) {
                console.log("End reached, loading more transactions...");
                loadCategoryTransactions(false);
              }
            }}
            onEndReachedThreshold={0.8}
          />
        )}
      </View>

      <View style={styles.addExpenseContainer}>
        <TouchableOpacity style={styles.addButton} onPress={addExpense}>
          <Text style={styles.addButtonText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CategoryDetailScreen;
