import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchTransactionsAsync } from "@/redux/slices/transactionSlice";
import { Ionicons } from "@expo/vector-icons";
import MonthSection from "@/componenets/MonthSection";
import { Transaction } from "@/types/transactionTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import TransactionSummary from "@/componenets/TransactionSummary";
import Theme from "@/theme";
import { groupTransactionsByMonth } from "@/utils/helpers";

type FilterType = "all" | "income" | "expence";

const TransactionScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, summary, loading, error } = useSelector(
    (state: RootState) => state.transactions
  );
  const [activeTab, setActiveTab] = useState<FilterType>("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation();

  const loadTransactions = async (reset = false) => {
    try {
      const newPage = reset ? 1 : page + 1;
      console.log("Fetching page:", newPage);
      
      const result = await dispatch(fetchTransactionsAsync({ page: newPage }));
      const payload = result.payload.transactions;
      
      if (reset) {
        setPage(1);
      } else {
        setPage(newPage);
      }
      
      if (!payload || payload.length < 20) {
        console.log("No more transactions to load");
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
      console.log("Loading more transactions, current page:", page);
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
        <View style={styles.footerLoadingContainer}>
          <ActivityIndicator size="large" color="#FFC107" />
          <Text style={styles.loadingText}>Loading more transactions...</Text>
        </View>
      );
    }
    return null;
  };

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => dispatch(fetchTransactionsAsync())}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const handleBack = () => {
    navigation.goBack();
  };
  console.log(page)
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title="Transaction" />
        <TransactionSummary
          activeTab={activeTab}
          onSelectTab={setActiveTab}
        />
        {loading && transactions.length == 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFC107" />
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <FlatList
              data={Object.entries(groupTransactionsByMonth(transactions))}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#32325D",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
    paddingTop: 16,
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
    textAlign: "center",
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
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#F6F8FA",
  },
  navItem: {
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#FFC107",
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  footerLoadingContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  }
});

export default TransactionScreen;
