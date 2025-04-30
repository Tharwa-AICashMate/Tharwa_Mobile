import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '@/types/transactionTypes';
import Entypo from '@expo/vector-icons/Entypo';
import Theme from '@/theme';
import TransactionItem from "@/componenets/TransactionItem";
interface MonthSectionProps {
  month: string;
  transactions: Transaction[];
  showCategory:boolean, icon?: string
}

const MonthSection: React.FC<MonthSectionProps> = ({ month, transactions,showCategory,icon }) => {
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
                  key={transaction.id}
                  transaction={transaction}
                  iconBgColor={Theme.colors.accentLight}
                  showCategory ={showCategory}
                  icon={icon}
              />)
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:"100%",
    paddingHorizontal:20,
    marginBottom: 20,
    boxShadow:'0 1 3 #ccc'
    },
  containerTitle:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Theme.colors.text,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
});

export default MonthSection;
