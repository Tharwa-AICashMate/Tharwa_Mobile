import React, { useEffect, useState } from "react";
import { View, Text, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Theme from "@/theme";
import { styles } from "./styles";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getWeeklyHighs } from "@/redux/slices/financeSlice";

interface QuickStatsCardProps {
  style?: ViewStyle;
}

interface WeeklyHighs {
  highest_income: { amount: number; title: string } | null;
  highest_expense: { amount: number; category_name: string } | null;
}

const QuickStatsCard: React.FC<QuickStatsCardProps> = ({ style }) => {
  const weeklyHighlights = useAppSelector(
    (state) => state.finance.weeklyHighlights
  );
 
  const dispatch = useAppDispatch()
  useEffect(()=>{
    dispatch(getWeeklyHighs())
  },[])
  console.log("------", weeklyHighlights);
  const { highest_income: maxIncome, highest_expense: maxExpense } =
    weeklyHighlights || {};

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
