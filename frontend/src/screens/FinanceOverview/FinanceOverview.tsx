// import React, { useState } from "react";
// import { ScrollView, SafeAreaView, View, Text } from "react-native";
// import styled from "styled-components/native";
// import { PeriodSelector } from "../../componenets/FinanceOverviewComs/PeriodSelector";
// import { BarChart } from "../../componenets/FinanceOverviewComs/BarChart";
// import { FinanceSummary } from "../../componenets/FinanceOverviewComs/FinanceSummary";
// import { TargetProgress } from "../../componenets/FinanceOverviewComs/TargetProgress";
// import styles from "./style";
// import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
// import BalanceDisplay from "@/componenets/BalanceDisplay";
// import ProgressBar from "@/componenets/ProgressBar";
// import Theme from "@/theme";
// import { useFocusEffect } from "@react-navigation/native";
// import { getCurrentUserId } from '@/utils/auth';
// import { Ionicons } from "@expo/vector-icons";
// import { apiBase } from "@/utils/axiosInstance";



// const TargetsContainer = styled.View`
//   flex-direction: row;
//   justify-content: space-around;
//   margin-top: 16px;
// `;






// const weeklyData = [
//   { week: "1st Week", income: 1200, expenses: 800 },
//   { week: "2nd Week", income: 900, expenses: 600 },
//   { week: "3rd Week", income: 1500, expenses: 750 },
//   { week: "4th Week", income: 1800, expenses: 900 },
// ];

// const monthlyData = [
//   { month: "Jan", income: 12000, expenses: 8000 },
//   { month: "Feb", income: 10000, expenses: 7000 },
//   { month: "Mar", income: 11000, expenses: 7500 },
//   { month: "Apr", income: 13000, expenses: 8000 },
//   { month: "May", income: 14000, expenses: 8500 },
//   { month: "Jun", income: 12500, expenses: 7800 },
//   { month: "Jul", income: 13500, expenses: 8200 },
//   { month: "Aug", income: 14500, expenses: 8700 },
//   { month: "Sep", income: 15000, expenses: 9000 },
//   { month: "Oct", income: 15500, expenses: 9200 },
//   { month: "Nov", income: 16000, expenses: 9500 },
//   { month: "Dec", income: 17000, expenses: 10000 },
// ];


// const yearlyData = [
//   { year: "2022", income: 120000, expenses: 90000 },
//   { year: "2023", income: 140000, expenses: 100000 },
//   { year: "2024", income: 150000, expenses: 105000 },
//   { year: "2025", income: 160000, expenses: 110000 },
//   { year: "2026", income: 170000, expenses: 115000 },
// ];

// export const FinanceOverview: React.FC = () => {
//   const [selectedPeriod, setSelectedPeriod] = useState<"Weekly" | "Monthly" | "Year">("Weekly");
//   const [totalBalance, setTotalBalance] = useState(0);

//   const fetchBalance = async () => {
//     try {
//       const user_id = await getCurrentUserId();
//       console.log("user_id", user_id);
//       const response = await fetch(`${apiBase}/api/balances/user/${user_id}`);

//       if (!response.ok) {
//         throw new Error('Failed to fetch balance');
//       }

//       const data = await response.json();
//       setTotalBalance(data.balance_limit || 0);
//     } catch (error) {
//       console.error('Error fetching balance:', error);
//     }
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       fetchBalance();
//     }, [])
//   );

//   const totalIncome = ( selectedPeriod === "Weekly" ? weeklyData : selectedPeriod === "Monthly" ? monthlyData : yearlyData)
//     .reduce((sum, item) => sum + (item.income || 0), 0);
//   const totalExpenses = (selectedPeriod === "Weekly" ? weeklyData : selectedPeriod === "Monthly" ? monthlyData : yearlyData)
//     .reduce((sum, item) => sum + (item.expenses || 0), 0);

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Analysis" />

//       <View style={styles.balanceContainer}>
//         <BalanceDisplay balance={totalBalance} expense={400000} />
//       </View>

//       <View style={styles.budgetContainer}>
//         <View style={styles.progressContainer}>
//           <ProgressBar percentage={30} amount={40} />
//         </View>

//         <View style={styles.budgetStatus}>
//           <Ionicons name="checkbox-outline" size={16} color={Theme.colors.text} />
//           <Text style={styles.budgetStatusText}>
//             {30}% Of Your Expenses, Looks Good.
//           </Text>
//         </View>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.categoriesContainer}>
//           <PeriodSelector
//             selectedPeriod={selectedPeriod}
//             onPeriodChange={setSelectedPeriod}
//           />

//           <BarChart
//             data={ selectedPeriod === "Weekly" ? weeklyData : selectedPeriod === "Monthly" ? monthlyData : yearlyData}
//             maxValue={ selectedPeriod === "Weekly" ? 2000 : selectedPeriod === "Monthly" ? 20000 : 200000}
//             period={selectedPeriod}
//           />

//           <FinanceSummary income={totalIncome} expenses={totalExpenses} />

//           <TargetsContainer>
//             <TargetProgress title="Travel" progress={30} color={Theme.colors.accentDark} />
//             <TargetProgress title="Car" progress={50} color={Theme.colors.accentDark} />
//           </TargetsContainer>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };





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
import { apiBase } from "@/utils/axiosInstance";

const TargetsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 16px;
`;

export const FinanceOverview: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<"Weekly" | "Monthly" | "Year">("Weekly");
  const [totalBalance, setTotalBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [yearlyData, setYearlyData] = useState<any[]>([]);

  const fetchBalance = async () => {
    try {
      const user_id = await getCurrentUserId();
      const response = await fetch(`${apiBase}/api/balances/user/${user_id}`);

      if (!response.ok) throw new Error('Failed to fetch balance');

      const data = await response.json();
      setTotalBalance(data.balance_limit || 0);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const fetchData = async () => {
    try {
      const user_id = await getCurrentUserId();

      // Fetch total income
      const incomeResponse = await fetch(`${apiBase}/income/${user_id}`);
      const incomeDataJson = await incomeResponse.json();
      const newIncome = incomeDataJson.income || 0;  // Save the income to a variable

      setIncome(newIncome);
      console.log("Fetched Income:", newIncome);
      // console.log("Weekly Data:", weeklyData);

      // Fetch weekly data
      const weeklyIncomeResponse = await fetch(`${apiBase}/weekly-amounts/${user_id}`);
      const weeklyIncomeJson = await weeklyIncomeResponse.json();
      const weeklyIncomeArray = weeklyIncomeJson.weeklyAmounts || [];

      const weeklyExpenseResponse = await fetch(`${apiBase}/weekly-expense-amounts/${user_id}`);
      const weeklyExpenseJson = await weeklyExpenseResponse.json();
      const weeklyExpenseArray = weeklyExpenseJson.weeklyAmounts || [];

      // Fetch monthly data
      const monthlyIncomeResponse = await fetch(`${apiBase}/monthly-amounts/${user_id}`);
      const monthlyIncomeJson = await monthlyIncomeResponse.json();
      const monthlyIncomeArray = monthlyIncomeJson.monthlyAmounts || [];

      const monthlyExpenseResponse = await fetch(`${apiBase}/monthly-expense-amounts/${user_id}`);
      const monthlyExpenseJson = await monthlyExpenseResponse.json();
      const monthlyExpenseArray = monthlyExpenseJson.monthlyAmounts || [];

      // Fetch yearly data
      const yearlyIncomeResponse = await fetch(`${apiBase}/yearly-amounts/${user_id}`);
      const yearlyIncomeJson = await yearlyIncomeResponse.json();
      const yearlyIncomeArray = yearlyIncomeJson.yearlyAmounts || [];

      const yearlyExpenseResponse = await fetch(`${apiBase}/yearly-expense-amounts/${user_id}`);
      const yearlyExpenseJson = await yearlyExpenseResponse.json();
      const yearlyExpenseArray = yearlyExpenseJson.yearlyAmounts || [];

      // Handle Weekly Data

      setWeeklyData(
        weeklyIncomeArray.map((amount: number, index: number) => ({
          week: `Week ${index + 1}`,
          income: newIncome + amount, // <<< حطيت amount مباشرة
          expenses: weeklyExpenseArray[index] || 0, // <<< expense برضه بناء على ال index
        }))
      );

      // Handle Monthly Data
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      setMonthlyData(
        monthlyIncomeArray.map((amount: number, index: number) => ({
          month: months[index] || `Month ${index + 1}`,
          income: newIncome + amount,
          expenses: monthlyExpenseArray[index] || 0,
        }))
      );

      // Handle Yearly Data
      setYearlyData(
        yearlyIncomeArray.map((item: any, index: number) => ({
          year: item.year,
          income: newIncome + (item.amount || 0),
          expenses: yearlyExpenseArray[index]?.amount || 0,
        }))
      );


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBalance();
      fetchData();
    }, [])
  );

  const periodData = selectedPeriod === "Weekly" ? weeklyData : selectedPeriod === "Monthly" ? monthlyData : yearlyData;
  const totalIncome = periodData.reduce((sum, item) => sum + (item.income || 0), 0);
  const totalExpenses = periodData.reduce((sum, item) => sum + (item.expenses || 0), 0);

  const averageIncome = periodData.length > 0 ? totalIncome / periodData.length : 0;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Analysis" />

      <View style={styles.balanceContainer}>
        <BalanceDisplay balance={totalBalance} expense={totalExpenses} />
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
            data={periodData}
            maxValue={selectedPeriod === "Weekly" ? 10000 : selectedPeriod === "Monthly" ? 20000 : 200000}
            period={selectedPeriod}
          />

          <FinanceSummary income={averageIncome} expenses={totalExpenses} />

          <TargetsContainer>
            <TargetProgress title="Travel" progress={30} color={Theme.colors.accentDark} />
            <TargetProgress title="Car" progress={50} color={Theme.colors.accentDark} />
          </TargetsContainer>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
