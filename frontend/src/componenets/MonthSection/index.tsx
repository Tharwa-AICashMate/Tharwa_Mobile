import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '@/types/transactionTypes';
import TransactionItem from '../TranscationItemPage/index';
import Entypo from '@expo/vector-icons/Entypo';
import Theme from '@/theme';
interface MonthSectionProps {
  month: string;
  transactions: Transaction[];
}

const MonthSection: React.FC<MonthSectionProps> = ({ month, transactions }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
      <Text style={styles.monthTitle}>{month}</Text>
      <Entypo name="calendar" size={24} color={Theme.colors.primary} style={{marginRight:20}} />
      </View>
      {transactions.map(transaction => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  containerTitle:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#32325D',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
});

export default MonthSection;
