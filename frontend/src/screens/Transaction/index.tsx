import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchTransactionsAsync } from '@/redux/slices/transactionSlice';
import { Ionicons } from '@expo/vector-icons';
import MonthSection from '@/componenets/MonthSection';
import { Transaction } from '@/types/transactionTypes';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import TransactionSummary from '@/componenets/TransactionSummary';
import Theme from '@/theme';

type FilterType = 'all' | 'income' | 'expence';


const TransactionScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { transactionsByMonth, summary, loading, error } = useSelector(
    (state: RootState) => state.transactions
  );
  const [activeTab, setActiveTab] = useState<FilterType>('all');
    const navigation = useNavigation();
  
    useFocusEffect(
      useCallback(() => {
        dispatch(fetchTransactionsAsync());
      }, [dispatch])
    );
  
  const filterTransactions = (transactions: Transaction[]): Transaction[] => {
    if (activeTab === 'all') return transactions;
    return transactions.filter(transaction => transaction.type === activeTab);
  };
  
  const renderMonthSection = ({ item }: { item: [string, Transaction[]] }) => {
    const [month, transactions] = item;
    const filteredTransactions = filterTransactions(transactions);
    
    if (filteredTransactions.length === 0) return null;
    
    return (
      <MonthSection key={month} month={month} transactions={filteredTransactions}  />
    );
  };
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFC107" />
      </View>
    );
  }
  
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
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title='Transaction' />
        <TransactionSummary
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          transactions={filterTransactions(Object.values(transactionsByMonth).flat())} 
        />
        
        <View style={styles.contentContainer}>
          <FlatList
            data={Object.entries(transactionsByMonth)}
            keyExtractor={(item) => item[0]}
            renderItem={renderMonthSection}
            showsVerticalScrollIndicator={false}
            initialNumToRender={3} 
            windowSize={5} 
            removeClippedSubviews={true}
          />
        </View>
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFC107',
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.highlight,

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#32325D',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    paddingTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F6F8FA',
  },
  navItem: {
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#FFC107',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransactionScreen;
