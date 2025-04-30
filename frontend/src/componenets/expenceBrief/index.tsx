import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Theme from "@/theme";
import BalanceDisplay from "@/componenets/BalanceDisplay";
import ProgressBar from "@/componenets/ProgressBar";
import styles from "./styles";
import { getCurrentUserId } from "@/utils/auth";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchBalance, fetchFinanceData } from "@/redux/slices/financeSlice";

interface ExpenseBriefProps {
  setTotalBalance?: (balance: number) => void;
}

const ExpenseBrief: React.FC<ExpenseBriefProps> = ({ setTotalBalance }) => {
  const dispatch = useAppDispatch();
  const { balance, expenses, income, savings, loading, error } = useAppSelector(
    (state) => state.finance
  );
  console.log({ balance, expenses, income, savings, loading, error });
  useEffect(() => {
    async function fetchAll() {
      const userId = await getCurrentUserId();
      console.log(userId)
      dispatch(fetchFinanceData(userId));
      dispatch(fetchBalance(userId));
      if(setTotalBalance)
        setTotalBalance(balance)
    }

    fetchAll();
  }, [dispatch]);

  const availableBalance = balance - expenses - savings + income;
  const percentage = availableBalance ? (expenses / (balance+income)) * 100 : 0;
  return (
    <View style={{ marginBottom: 30 }}>
      <View style={styles.budgetContainer}>
        <BalanceDisplay balance={availableBalance} expense={expenses} />
      </View>

      <View style={styles.budgetContainer}>
        <View style={styles.progressContainer}>
          <ProgressBar
            percentage={parseFloat(percentage?.toFixed(2))}
            amount={availableBalance || 0}
          />
        </View>
        <View style={styles.budgetStatus}>
          <Ionicons
            name="checkbox-outline"
            size={16}
            color={Theme.colors.text}
          />
          <Text style={styles.budgetStatusText}>
            {percentage?.toFixed(2)}% Of Your Expenses, Looks{" "}
            {percentage < 50 ? "Good" : "Bad"}.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ExpenseBrief;
