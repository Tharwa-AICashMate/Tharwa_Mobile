import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '@/types/transactionTypes';
import Entypo from '@expo/vector-icons/Entypo';
import Theme from '@/theme';
import TransactionItem from "@/componenets/TransactionItem";
import styles from './styles';
interface MonthSectionProps {
  month: string;
  transactions: Transaction[];
  showCategory:boolean
}

const MonthSection: React.FC<MonthSectionProps> = ({ month, transactions,showCategory }) => {
  console.log(transactions)
  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
      <Text style={styles.monthTitle}>{month}</Text>
      <Entypo name="calendar" size={24} color={Theme.colors.primary} style={{marginRight:20}} />
      </View>
      {transactions.map(transaction => {
            console.log(transaction);
            return (
              <TransactionItem
                  key={transaction.transaction_id}
                  transaction={transaction}
                  iconBgColor={Theme.colors.accentLight}
                  showCategory ={showCategory}
              />)
      })}
    </View>
  );
};

export default MonthSection;
