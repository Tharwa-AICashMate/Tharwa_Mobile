import React, { useEffect, useState } from "react";
import { View, Text, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Theme from "@/theme";
import { styles } from "./styles";
import { useAppSelector } from "@/redux/hook";
import { Transaction } from "@/types/transactionTypes";
import { supabase } from "@/utils/supabase";

interface QuickStatsCardProps {
  style?: ViewStyle;
}


async function getWeeklyHighs(userId: string) {
  const { data, error } = await supabase
    .rpc('get_weekly_highs', { uid: userId });

  if (error) {
    console.log('Error fetching weekly highs:', error);
    return { success: false, error };
  }

  console.log('Weekly highs:', {data});
  return  data[0] ;
}

const QuickStatsCard: React.FC<QuickStatsCardProps> = ({ style }) => {
  // const transactions = useAppSelector(
  //   (state) => state.transactions.transactions
  // );

  // const getMaxTransactionForWeek = (transactions: Transaction[]) => {
  //   const startOfWeek = new Date();
  //   startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of the week (Sunday)
  //   startOfWeek.setHours(0, 0, 0, 0);

  //   const endOfWeek = new Date();
  //   endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week (Saturday)
  //   endOfWeek.setHours(23, 59, 59, 999);

  //   const transactionsThisWeek = transactions.filter((transaction) => {
  //     const transactionDate = new Date(transaction.created_at);
  //     return transactionDate >= startOfWeek && transactionDate <= endOfWeek;
  //   });

  //   const maxIncome = transactionsThisWeek
  //     .filter((t) => t.type === "income")
  //     .reduce((max, t) => (t.amount > max.amount ? t : max), {
  //       amount: 0,
  //     } as Transaction);

  //   const maxExpense = transactionsThisWeek
  //     .filter((t) => t.type === "expense")
  //     .reduce((max, t) => (t.amount > max.amount ? t : max), {
  //       amount: 0,
  //     } as Transaction);

  //   return { maxIncome, maxExpense };
  // };

  const userId = useAppSelector(state => state.auth.user?.id) 
  interface WeeklyHighs {
    highest_income: { amount: number; title: string } | null;
    highest_expense: { amount: number; category_name: string } | null;
  }
  
  const [totals, setTotals] = useState<WeeklyHighs>({
    highest_income: null,
    highest_expense: null,
  });
  useEffect(() => {
    async function fetchData() {
      if (userId) {
        setTotals(await getWeeklyHighs(userId));
      } else {
        console.error("User ID is undefined");
      }
    }
    fetchData()
  }, [userId]);
  console.log(totals);
  const { highest_income:maxIncome, highest_expense:maxExpense } = totals || {};

  return (
    <View style={[styles.card, style]}>
      <Text style={styles.title}>Weekly Highlights</Text>
      <View style={styles.statsContainer}>
        {/* Highest Income */}
        <View style={styles.stat}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="trending-up"
              size={18}
              color={Theme.colors.accent}
            />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.label}>Highest Income</Text>
            <Text style={styles.amount}>
              {maxIncome?.amount && maxIncome.amount > 0
                ? `$${maxIncome.amount.toFixed(2)}`
                : "$0.00"}
            </Text>
            <Text style={styles.description}>
              {maxIncome?.title || "No weekly highlights yet"}
            </Text>
          </View>
        </View>
        {/* Divider */}
        <View style={styles.divider} />

        {/* Highest Expense */}
        <View style={styles.stat}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="trending-down"
              size={18}
              color={Theme.colors.accentDark}
            />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.label}>Highest Expense</Text>
            <Text style={styles.amount}>
              {maxExpense?.amount && maxExpense.amount > 0
                ? `-$${maxExpense?.amount.toFixed(2)}`
                : "$0.00"}
            </Text>
            <Text style={styles.description}>
              {maxExpense?.category_name || "No weekly highlights yet"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default QuickStatsCard;
