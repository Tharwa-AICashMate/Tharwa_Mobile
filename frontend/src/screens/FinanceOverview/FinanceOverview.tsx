import React, { useState } from "react";
import { ScrollView, SafeAreaView, View, Text } from "react-native";
import styled from "styled-components/native";
import { PeriodSelector } from "../../componenets/FinanceOverviewComs/PeriodSelector";
import { BarChart } from "../../componenets/FinanceOverviewComs/BarChart";
import { FinanceSummary } from "../../componenets/FinanceOverviewComs/FinanceSummary";
import { TargetProgress } from "../../componenets/FinanceOverviewComs/TargetProgress";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";

import Theme from "@/theme";
import { useFocusEffect } from "@react-navigation/native";
import { getCurrentUserId } from "@/utils/auth";
import { Ionicons } from "@expo/vector-icons";
import { apiBase } from "@/utils/axiosInstance";
import ExpenseBrief from "@/componenets/expenceBrief";
import { useTranslation } from "react-i18next";
import useDynamicStyles from "./style";

const TargetsContainer = styled.View`
  flex-direction: row;
  
  margin-top: 16px;
  justify-content:space-between;
  flex-warp:warp;
`;

export const FinanceOverview: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<"Weekly" | "Monthly" | "Year">("Weekly");
  const [totalBalance, setTotalBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [yearlyData, setYearlyData] = useState<any[]>([]);
  const { t } = useTranslation();
  const styles = useDynamicStyles();
  const fetchData = async () => {
    try {
      const user_id = await getCurrentUserId();

      // Fetch total income
      const incomeResponse = await fetch(`${apiBase}/income/${user_id}`);
      const incomeDataJson = await incomeResponse.json();
      const newIncome = incomeDataJson.income || 0; // Save the income to a variable

      setIncome(newIncome);
      console.log("Fetched Income:", newIncome);
      // console.log("Weekly Data:", weeklyData);

      // Fetch weekly data
      const weeklyIncomeResponse = await fetch(
        `${apiBase}/weekly-amounts/${user_id}`
      );
      const weeklyIncomeJson = await weeklyIncomeResponse.json();
      const weeklyIncomeArray = weeklyIncomeJson.weeklyAmounts || [];

      const weeklyExpenseResponse = await fetch(
        `${apiBase}/weekly-expense-amounts/${user_id}`
      );
      const weeklyExpenseJson = await weeklyExpenseResponse.json();
      const weeklyExpenseArray = weeklyExpenseJson.weeklyAmounts || [];

      // Fetch monthly data
      const monthlyIncomeResponse = await fetch(
        `${apiBase}/monthly-amounts/${user_id}`
      );
      const monthlyIncomeJson = await monthlyIncomeResponse.json();
      const monthlyIncomeArray = monthlyIncomeJson.monthlyAmounts || [];

      const monthlyExpenseResponse = await fetch(
        `${apiBase}/monthly-expense-amounts/${user_id}`
      );
      const monthlyExpenseJson = await monthlyExpenseResponse.json();
      const monthlyExpenseArray = monthlyExpenseJson.monthlyAmounts || [];

      // Fetch yearly data
      const yearlyIncomeResponse = await fetch(
        `${apiBase}/yearly-amounts/${user_id}`
      );
      const yearlyIncomeJson = await yearlyIncomeResponse.json();
      const yearlyIncomeArray = yearlyIncomeJson.yearlyAmounts || [];

      const yearlyExpenseResponse = await fetch(
        `${apiBase}/yearly-expense-amounts/${user_id}`
      );
      const yearlyExpenseJson = await yearlyExpenseResponse.json();
      const yearlyExpenseArray = yearlyExpenseJson.yearlyAmounts || [];

      // Handle Weekly Data
      setWeeklyData(
        weeklyIncomeArray.map((amount: number, index: number) => ({
          week: `Week ${index + 1}`,
          income: amount, 
          expenses: weeklyExpenseArray[index] || 0, 
        }))
      );

      // Handle Monthly Data
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      setMonthlyData(
        monthlyIncomeArray.map((amount: number, index: number) => ({
          month: months[index] || `Month ${index + 1}`,
          income: amount,
          expenses: monthlyExpenseArray[index] || 0,
        }))
      );
      console.log('-----------', monthlyExpenseArray)
      // Handle Yearly Data
      setYearlyData(
        yearlyIncomeArray.map((item: any, index: number) => ({
          year: item.year,
          income: (item.amount || 0),
          expenses: yearlyExpenseArray[index]?.amount || 0,
        }))
      );
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );
  const periodData =
    selectedPeriod === "Weekly"
      ? weeklyData
      : selectedPeriod === "Monthly"
        ? monthlyData
        : yearlyData;
  const totalIncome = periodData.reduce(
    (sum, item) => sum + (item.income || 0),
    0
  );
  const totalExpenses = periodData.reduce(
    (sum, item) => {
      return sum + (item.expenses || 0)
    },
    0
  );

  const averageIncome =
    periodData.length > 0 ? totalIncome / periodData.length : 0;
 const averageExpence =
    periodData.length > 0 ? totalExpenses / periodData.length : 0;
  return (
    <SafeAreaView style={styles.container}>
      <Header title={t("analysis.analysis")} />

      <ExpenseBrief />

      <View style={styles.baseContainer}>

        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.categoriesContainer}>
            <PeriodSelector
              selectedPeriod={selectedPeriod}
              onPeriodChange={setSelectedPeriod}
            />

            <BarChart
              data={periodData}
              period={selectedPeriod}
            />

            <FinanceSummary income={averageIncome} expenses={averageExpence} />

            <TargetsContainer>
              <TargetProgress
                color={Theme.colors.accentDark}
              />

            </TargetsContainer>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
