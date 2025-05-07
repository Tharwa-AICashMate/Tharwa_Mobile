import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  I18nManager,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchTransactionsAsync } from "@/redux/slices/transactionSlice";
import MonthSection from "@/componenets/MonthSection";
import { Transaction } from "@/types/transactionTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFocusEffect,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import TransactionSummary from "@/componenets/TransactionSummary";
import Theme from "@/theme";

// ✅ updated helper import
import { groupTransactionsByMonth } from "@/utils/helpers";

import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./styles.";

type FilterType = "all" | "income" | "expense";
type RootStackParamList = {
  AddExpensesScreen: undefined; 
  AddIncome: undefined; 
};
const TransactionScreen: React.FC = () => {
  //const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, summary, loading, error } = useSelector(
    (state: RootState) => state.transactions
  );
  const [activeTab, setActiveTab] = useState<FilterType>("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    I18nManager.forceRTL(isRTL);
  }, [isRTL]);

  const loadTransactions = async (reset = false) => {
    try {
      const newPage = reset ? 1 : page + 1;
      const result = await dispatch(fetchTransactionsAsync({ page: newPage }));
      const payload = result.payload.transactions;

      if (reset) {
        setPage(1);
      } else {
        setPage(newPage);
      }

      if (!payload || payload.length < 20) {
        setHasMore(false);
      }
    } catch (err) {
      console.log("Error loading transactions:", err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTransactions(true);
    }, [dispatch])
  );

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadTransactions(false);
    }
  };

  const filterTransactions = (transactions: Transaction[]): Transaction[] => {
    if (activeTab === "all") return transactions;
    return transactions.filter((transaction) => transaction.type === activeTab);
  };

  const renderMonthSection = ({ item }: { item: [string, Transaction[]] }) => {
    const [month, transactions] = item;
    const filteredTransactions = filterTransactions(transactions);

    if (filteredTransactions.length === 0) return null;

    return (
      <MonthSection
        key={month}
        month={month}
        transactions={filteredTransactions}
        showCategory={true}
      />
    );
  };

  const renderFooter = () => {
    if (loading && page > 1) {
      return (
        <View style={[styles.footerLoadingContainer]}>
          <ActivityIndicator size="large" color="#FFC107" />
          <Text style={styles.loadingText}>
            {t("transactionScreen.transactions.loadingMore")}
          </Text>
        </View>
      );
    }
    return null;
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {t("transactionScreen.transactions.error", { error })}
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => dispatch(fetchTransactionsAsync())}
        >
          <Text style={styles.retryButtonText}>
            {t("transactionScreen.common.retry")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderContent = () => {
    if (loading && transactions.length === 0) {
      // Case 1: No transactions at all (loading state)
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFC107" />
          <Text style={styles.loadingText}>
            {t("transactionScreen.common.loading")}
          </Text>
        </View>
      );
    }

    if (transactions.length === 0) {
      // Case 1: No transactions at all
      return (
        <View style={styles.emptyStateContainer}>
          <TouchableOpacity
            style={styles.emptyStateAddButton}
            onPress={() => {
              navigation.navigate("AddExpensesScreen");
            }}
          >
            <Ionicons
              name="add-circle"
              size={80}
              color={Theme.colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.emptyStateTitle}>
            {t("emptyState.noTransactions.title")}
          </Text>
          <Text style={styles.emptyStateText}>
            {t("emptyState.noTransactions.message")}
          </Text>
        </View>
      );
    }

    if (
      activeTab === "income" &&
      filterTransactions(transactions).length === 0
    ) {
      // Case 2: Active filter is "income" but empty
      return (
        <View style={styles.emptyStateContainer}>
          <TouchableOpacity
            style={styles.emptyStateAddButton}
            onPress={() => {
              navigation.navigate("AddIncome");
            }}
          >
            <Ionicons
              name="add-circle"
              size={80}
              color={Theme.colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.emptyStateTitle}>
            {t("emptyState.noIncome.title")}
          </Text>
          <Text style={styles.emptyStateText}>
            {t("emptyState.noIncome.message")}
          </Text>
        </View>
      );
    }

    if (
      activeTab === "expense" &&
      filterTransactions(transactions).length === 0
    ) {
      // Case 3: Active filter is "expenses" but empty
      return (
        <View style={styles.emptyStateContainer}>
          <TouchableOpacity
            style={styles.emptyStateAddButton}
            onPress={() => {
              navigation.navigate("AddExpensesScreen");
            }}
          >
            <Ionicons
              name="add-circle"
              size={80}
              color={Theme.colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.emptyStateTitle}>
            {t("emptyState.noExpense.title")}
          </Text>
          <Text style={styles.emptyStateText}>
            {t("emptyState.noExpense.message")}
          </Text>
        </View>
      );
    }

    // Default case: Render the transaction list
    return (
      <FlatList
        data={Object.entries(
          groupTransactionsByMonth(transactions, i18n.language)
        )}
        keyExtractor={(item) => item[0]}
        renderItem={renderMonthSection}
        showsVerticalScrollIndicator={false}
        initialNumToRender={3}
        windowSize={5}
        removeClippedSubviews={true}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.8}
        ListFooterComponent={renderFooter}
      />
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container]}>
        <Header title={t("transactionScreen.transactions.title")} />
        <TransactionSummary activeTab={activeTab} onSelectTab={setActiveTab} transactionsExist={transactions.length === 0}/>
        <View style={styles.contentContainer}>
        {loading && transactions.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFC107" />
            <Text style={styles.loadingText}>
              {t("transactionScreen.common.loading")}
            </Text>
          </View>
        ) : (
            <View style={styles.contentContainer}>{renderContent()}</View>
          )}
          </View>
      </View>
    </SafeAreaView>
  );
};


export default TransactionScreen;
