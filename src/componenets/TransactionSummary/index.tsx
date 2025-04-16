import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TransactionSummary as TransactionSummaryType } from '@/types/transactionTypes';
import { formatCurrency } from '@/utils/helpes';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Theme from '@/theme';
interface TransactionSummaryProps {
  summary: TransactionSummaryType;
  onSelectTab: (tab: 'all' | 'income' | 'expense') => void;
  activeTab: 'all' | 'income' | 'expense';
}

const TransactionSummary: React.FC<TransactionSummaryProps> = ({ 
  summary, 
  onSelectTab,
  activeTab
}) => {
  const { totalBalance, income, expense } = summary;
  
  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>{formatCurrency(totalBalance)}</Text>
      </View>
      
      <View style={styles.tabsContainer}>
        <View 
          style={[
            styles.tab, 
            activeTab === 'income' && styles.activeTab,
            { borderTopLeftRadius: 16, borderBottomLeftRadius: 16 }
          ]}
          onTouchEnd={() => onSelectTab('income')}
        >
          <MaterialCommunityIcons name="arrow-top-right-bold-box-outline" size={24} color={Theme.colors.primary} />
          <Text style={[styles.tabLabel,activeTab === 'income' && styles.activeTabText]}>Income</Text>
          <Text style={[styles.tabAmount, activeTab === 'income' && styles.activeTabText]}>
            {formatCurrency(income)}
          </Text>
        </View>
        
        <View 
          style={[
            styles.tab, 
            activeTab === 'expense' && styles.activeTab,
            { borderTopRightRadius: 16, borderBottomRightRadius: 16 }
          ]}
          onTouchEnd={() => onSelectTab('expense')}
        >
          <MaterialCommunityIcons name="arrow-bottom-left-bold-box-outline" size={24} color={'202063'} />
          <Text style={[styles.tabLabel,activeTab === 'expense' && styles.activeTabText]}>Expense</Text>
          <Text style={[styles.tabAmount, activeTab === 'expense' && styles.activeTabText]}>
            {formatCurrency(expense)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  balanceContainer: {
    width:330,
    height:80,
    backgroundColor:'white',
    borderRadius:15,
    display:'flex',
    alignItems: 'center',
    justifyContent:'center',
    marginBottom: 24,
    marginLeft:10,
    padding:10
  },
  balanceLabel: {
    fontSize: 14,
    color: Theme.colors.textLight,
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: '600',
    color: Theme.colors.textLight,
  },
  tabsContainer: {
    flexDirection: 'row',
    // backgroundColor: '#F6F8FA',
    // overflow: 'hidden',
    justifyContent:'space-between',
    alignItems:'center',
    // gap:10
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft:10,
    backgroundColor:Theme.colors.background,
    borderRadius: 16,
  },
  activeTab: {
    backgroundColor: '#32325D',
  },
  tabLabel: {
    fontSize: 14,
    color: '#32325D',
    marginBottom: 4,
  },
  tabAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#32325D',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
});

export default TransactionSummary;