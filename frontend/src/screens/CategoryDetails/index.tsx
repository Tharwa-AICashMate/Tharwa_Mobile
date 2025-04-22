import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '../../redux/hook';
import { RootStackParamList } from '../../App';
import BalanceDisplay from '../../componenets/BalanceDisplay';
import ProgressBar from '../../componenets/ProgressBar';
import Theme from '../../theme';
import styles from './style';
import TransactionItem from "../../componenets/TransactionItem";

type CategoryDetailProps = NativeStackScreenProps<
  RootStackParamList,
  "CategoryDetail"
>;
type CategoryDetailRouteProp = CategoryDetailProps["route"];
type CategoryDetailNavigationProp = CategoryDetailProps["navigation"];

const CategoryDetailScreen = () => {
  const route = useRoute<CategoryDetailRouteProp>();
  const navigation = useNavigation<CategoryDetailNavigationProp>();
  const { categoryName } = route.params;
  const budget = useAppSelector((state: any) => state.expenses.budget);
  const transactions = useAppSelector((state: any) => state.expenses.transactions);

  const categoryTransactions = transactions.filter(
    (transaction: any) => transaction.category === categoryName
  );

  const groupedTransactions = categoryTransactions.reduce(
    (groups: { [key: string]: typeof categoryTransactions }, transaction: any) => {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const month = monthNames[transaction.date.getMonth()];

      if (!groups[month]) {
        groups[month] = [];
      }

      groups[month].push(transaction);
      return groups;
    },
    {}
  );

  const formatTransactionDate = (date: Date): string => {
    return date.getDate().toString().padStart(2, "0");
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.balanceContainer}>
          <BalanceDisplay
            balance={budget.totalExpenses}
            expense={budget.totalIncome}
          />
        </View>
        <View style={styles.budgetContainer}>
          <View style={styles.progressContainer}>
            <ProgressBar
              percentage={budget.percentageUsed}
              amount={budget.budgetLimit}
            />
          </View>

          <View style={styles.budgetStatus}>
            <Ionicons
              name="checkbox-outline"
              size={16}
              color={Theme.colors.text}
            />
            <Text style={styles.budgetStatusText}>
              {budget.percentageUsed}% Of Your Expenses, Looks Good.
            </Text>
          </View>
        </View>

        <ScrollView style={styles.transactionList}>
          {Object.keys(groupedTransactions).map((month) => (
            <View key={month} style={styles.monthSection}>
              <Text style={styles.monthTitle}>{month}</Text>

              {groupedTransactions[month].map((transaction: any) => (
                <TransactionItem
                  key={transaction.id}
                  id={transaction.id}
                  title={transaction.category}
                  subtitle={`${transaction.time} - ${month} ${formatTransactionDate(transaction.date)}`}
                  amount={transaction.amount}
                  icon={transaction.icon}
                  iconBgColor={transaction.iconBgColor}
                  isDeposit={false}
                />
              ))}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default CategoryDetailScreen;
