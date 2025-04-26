import React, { useState } from "react";
import { ScrollView, SafeAreaView, View, Text } from "react-native";
import styled from "styled-components/native";
import { PeriodSelector } from "../../componenets/FinanceOverviewComs/PeriodSelector";
import { BarChart } from "../../componenets/FinanceOverviewComs/BarChart";
import { FinanceSummary } from "../../componenets/FinanceOverviewComs/FinanceSummary";
import { TargetProgress } from "../../componenets/FinanceOverviewComs/TargetProgress";
import styles from "./style";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import BalanceDisplay from "@/componenets/BalanceDisplay";
import ProgressBar from "@/componenets/ProgressBar";
import Theme from "@/theme";
import { useFocusEffect } from "@react-navigation/native";
import { getCurrentUserId } from '@/utils/auth';
import { Ionicons } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
  padding: 16px;
`;

const TargetsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 16px;
`;


const dailyData = [
  { day: "Mon", income: 200, expenses: 150 },
  { day: "Tue", income: 180, expenses: 130 },
  { day: "Wed", income: 220, expenses: 170 },
  { day: "Thu", income: 210, expenses: 160 },
  { day: "Fri", income: 250, expenses: 180 },
  { day: "Sat", income: 270, expenses: 200 },
  { day: "Sun", income: 300, expenses: 230 },
];

const weeklyData = [
  { week: "1st Week", income: 1200, expenses: 800 },
  { week: "2nd Week", income: 900, expenses: 600 },
  { week: "3rd Week", income: 1500, expenses: 750 },
  { week: "4th Week", income: 1800, expenses: 900 },
];

const monthlyData = [
  { month: "Jan", income: 12000, expenses: 8000 },
  { month: "Feb", income: 10000, expenses: 7000 },
  { month: "Mar", income: 11000, expenses: 7500 },
  { month: "Apr", income: 13000, expenses: 8000 },
  { month: "May", income: 14000, expenses: 8500 },
  { month: "Jun", income: 12500, expenses: 7800 },
  { month: "Jul", income: 13500, expenses: 8200 },
  // { month: "Aug", income: 14500, expenses: 8700 },
  // { month: "Sep", income: 15000, expenses: 9000 },
  // { month: "Oct", income: 15500, expenses: 9200 },
  // { month: "Nov", income: 16000, expenses: 9500 },
  // { month: "Dec", income: 17000, expenses: 10000 },
];


const yearlyData = [
  { year: "2022", income: 120000, expenses: 90000 },
  { year: "2023", income: 140000, expenses: 100000 },
  { year: "2024", income: 150000, expenses: 105000 },
  { year: "2025", income: 160000, expenses: 110000 },
  { year: "2026", income: 170000, expenses: 115000 },
];

export const FinanceOverview: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<"Daily" | "Weekly" | "Monthly" | "Year">("Daily");
  const [totalBalance, setTotalBalance] = useState(0);

  const fetchBalance = async () => {
    try {
      const user_id = await getCurrentUserId();
      console.log("user_id", user_id);
      const response = await fetch(`http://192.168.1.4:3000/api/balances/user/${user_id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch balance');
      }
      
      const data = await response.json();
      setTotalBalance(data.balance_limit || 0);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBalance();
    }, [])
  );

  const totalIncome = (selectedPeriod === "Daily" ? dailyData : selectedPeriod === "Weekly" ? weeklyData : selectedPeriod === "Monthly" ? monthlyData : yearlyData)
    .reduce((sum, item) => sum + (item.income || 0), 0);
  const totalExpenses = (selectedPeriod === "Daily" ? dailyData : selectedPeriod === "Weekly" ? weeklyData : selectedPeriod === "Monthly" ? monthlyData : yearlyData)
    .reduce((sum, item) => sum + (item.expenses || 0), 0);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Analysis" />

      <View style={styles.balanceContainer}>
        <BalanceDisplay balance={totalBalance} expense={400000} />
      </View>

      <View style={styles.budgetContainer}>
        <View style={styles.progressContainer}>
          <ProgressBar percentage={30} amount={40} />
        </View>

        <View style={styles.budgetStatus}>
          <Ionicons name="checkbox-outline" size={16} color={Theme.colors.text} />
          <Text style={styles.budgetStatusText}>
            {30}% Of Your Expenses, Looks Good.
          </Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          <PeriodSelector
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />

          <BarChart
            data={selectedPeriod === "Daily" ? dailyData : selectedPeriod === "Weekly" ? weeklyData : selectedPeriod === "Monthly" ? monthlyData : yearlyData}
            maxValue={selectedPeriod === "Daily" ? 300 : selectedPeriod === "Weekly" ? 2000 : selectedPeriod === "Monthly" ? 20000 : 200000}
            period={selectedPeriod}
          />

          <FinanceSummary income={totalIncome} expenses={totalExpenses} />

          <TargetsContainer>
            <TargetProgress title="Travel" progress={30} color={Theme.colors.accentDark} />
            <TargetProgress title="Car" progress={50} color={Theme.colors.accentDark} />
          </TargetsContainer>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
