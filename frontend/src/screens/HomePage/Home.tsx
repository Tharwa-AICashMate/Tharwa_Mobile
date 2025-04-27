import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ProfileHeader from "../../componenets/ProfileHeader/ProfileHeader";
import Header from "../../componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Theme from "@/theme";
import styles from "./styles";
import BalanceDisplay from "@/componenets/BalanceDisplay";
import FilterTabs from "@/componenets/HomeScreen/FilterTabs";
import ProgressBar from "@/componenets/ProgressBar";
import QuickStatsCard from "@/componenets/HomeScreen/QuickStatsCard";
import TransactionList from "@/componenets/TransactionList";
import { apiBase } from "@/utils/axiosInstance";
import { useAppSelector } from "@/redux/hook";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchTransactionsAsync } from "@/redux/slices/transactionSlice";
import FinancialCategories from "@/componenets/HomeScreen/FinancialCategories";

const Home: React.FC = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  );
  console.log(transactions);
  const totalExpences = transactions?.reduce(
    (total, ele) => (total += ele.type == "expence" ? ele.amount : 0),
    0
  );
  const fetchBalance = async () => {
    try {
      const user_id = user!.id;
      console.log("user_id", user_id);
      const respons = await axios.get(
        `${apiBase}/api/balances/user/${user_id}`
      );

      //console.log(respons.data);

      setTotalBalance(respons.data?.balance_limit || 0);
    } catch (error) {
      // show the balance model to enter balanace
      console.log("Error fetching balance:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBalance();
      dispatch(fetchTransactionsAsync());
    }, [])
  );
  const budget = {
    totalExpenses: 0, // Replace with actual value or logic
    totalIncome: 0, // Replace with actual value or logic
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        style="light"
        backgroundColor={Theme.colors.highlight}
        translucent={false}
      />
      <Header title=" Home" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentBox}>
          <Text>hiiiiii</Text>
          <FinancialCategories />
        </View>
      </ScrollView>

      {/* budget */}
      {/* <View style={styles.budgetContainer}>
        <BalanceDisplay
          balance={totalBalance}
          expense={totalExpences}
        />
      </View>

      <View style={styles.budgetContainer}>
        <View style={styles.progressContainer}>
          <ProgressBar percentage={totalExpences/totalBalance*100} amount={totalBalance} />
        </View>
        <View style={styles.budgetStatus}>
          <Ionicons
            name="checkbox-outline"
            size={16}
            color={Theme.colors.text}
          />
          <Text style={styles.budgetStatusText}>
            {30}% Of Your Expenses, Looks Good.
          </Text>
        </View>
      </View> */}

      {/* quick stats */}
      {/* <QuickStatsCard
          savingsProgress={30}
          revenueLastWeek={2000}
          foodLastWeek={500}
        /> */}

      {/* filter tabs */}
      {/* <FilterTabs
          onTabChange={function (tab: "daily" | "weekly" | "monthly"): void {
            //throw new Error("Function not implemented.");
          }}
        /> */}
      {/* <TransactionList /> */}
    </ScrollView>
  );
};

export default Home;
