import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  I18nManager,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchTransactionsAsync } from "@/redux/slices/transactionSlice";
import MonthSection from "@/componenets/MonthSection";
import { Transaction } from "@/types/transactionTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import TransactionSummary from "@/componenets/TransactionSummary";
import Theme from "@/theme";

// ✅ updated helper import
import { groupTransactionsByMonth } from "@/utils/helpers";

import { useTranslation } from 'react-i18next';

type FilterType = "all" | "income" | "expense";

const TransactionScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
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
            {t('transactionScreen.transactions.loadingMore')}
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
          {t('transactionScreen.transactions.error', { error })}
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => dispatch(fetchTransactionsAsync())}
        >
          <Text style={styles.retryButtonText}>
            {t('transactionScreen.common.retry')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container]}>
        <Header title={t('transactionScreen.transactions.title')} />
        <TransactionSummary
          activeTab={activeTab}
          onSelectTab={setActiveTab}
        />
        {loading && transactions.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFC107" />
            <Text style={styles.loadingText}>
              {t('transactionScreen.common.loading')}
            </Text>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <FlatList
            
              data={Object.entries(groupTransactionsByMonth(transactions, i18n.language))}
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
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFC107",
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.highlight,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: "#FFC107",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  footerLoadingContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loadingText: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 14,
    color: '#666',
  },
});

export default TransactionScreen;
