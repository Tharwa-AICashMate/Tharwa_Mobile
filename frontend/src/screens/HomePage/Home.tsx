import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
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

const Home: React.FC = () => {
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

      {/* budget */}
      <View style={styles.budgetContainer}>
        <BalanceDisplay balance={20000} expense={400000} />
      </View>

      <View style={styles.budgetContainer}>
        <View style={styles.progressContainer}>
          <ProgressBar percentage={30} amount={40} />
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
      </View>

      <ScrollView style={styles.contentContainer}>
        {/* quick stats */}
        <QuickStatsCard
          savingsProgress={30}
          revenueLastWeek={2000}
          foodLastWeek={500}
        />

        {/* filter tabs */}
        <FilterTabs
          onTabChange={function (tab: "daily" | "weekly" | "monthly"): void {
            throw new Error("Function not implemented.");
          }}
        />
        <TransactionList />
      </ScrollView>
    </ScrollView>
  );
};

export default Home;
