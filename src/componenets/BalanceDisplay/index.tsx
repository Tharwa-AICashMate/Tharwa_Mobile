import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

interface BalanceDisplayProps {
  balance?: number; 
  expense?: number; 
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ 
  balance = 0, 
  expense = 0 
}) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {/* Balance Section */}
        <View style={[styles.section, { paddingRight: 10 }]}>
          <Text style={styles.label}>Total Balance</Text>
          <Text style={styles.balanceAmount} numberOfLines={1}>
            {formatCurrency(balance)}
          </Text>
        </View>

        {/* Divider Line */}
        <View style={styles.divider} />

        {/* Expense Section */}
        <View style={[styles.section, { paddingLeft: 10 }]}>
          <Text style={styles.label}>Total Expense</Text>
          <Text style={styles.expenseAmount} numberOfLines={1}>
            {formatCurrency(expense)}
          </Text>
        </View>
      </View>
    </View>
  );
};



export default BalanceDisplay;