import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '@/types/transactionTypes';
import CategoryTransaction from '../CategoryTransaction';
import { formatCurrency, formatDate } from '@/utils/helpes';
import Theme from '@/theme';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const { amount, type, category, date, description } = transaction;
  
  return (
    <View style={styles.container}>
      <CategoryTransaction category={category} />
      
      <View style={styles.details}>
        <Text style={styles.description}>{category}</Text>
        <Text style={styles.date}>{formatDate(date)}</Text>
      </View>
      <View>
        <Text style={styles.category}>{description}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[
          styles.amount,
          type === 'expense' ? styles.expenseAmount : styles.incomeAmount
        ]}>
          {type === 'expense' ? '-' : '+'}{formatCurrency(amount)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent:'space-between',
  },
  details: {
    marginRight:30,
  },
  category:{
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    marginRight:20
  
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    color: '#32325D',
  },
  date: {
    fontSize: 14,
    color: 'rgb(32, 32, 99)',
    marginTop: 2,

  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  expenseAmount: {
    color: 'rgb(32, 32, 99)',
  },
  incomeAmount: {
    color: Theme.colors.textDark,
  },
  type: {
    fontSize: 12,
    color: '#A7B0BA',
    marginTop: 2,
  },
});

export default TransactionItem;
