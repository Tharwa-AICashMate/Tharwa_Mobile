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


const Home: React.FC = () => {
  const budget = {
    totalExpenses: 0, // Replace with actual value or logic
    totalIncome: 0,   // Replace with actual value or logic
  };

  return (
    <View style={styles.container}>
      <StatusBar
        style="light"
        backgroundColor={Theme.colors.highlight}
        translucent={false}
      />
      <Header title=" Hommmme" />

     
    </View>
  );
};

export default Home;




//  <ScrollView contentContainerStyle={styles.scrollContent}>
//    {/* Budget Summary */}
//    <View style={styles.balanceContainer}>
//      <BalanceDisplay
//        balance={budget.totalExpenses}
//        expense={budget.totalIncome}
//      />
//    </View>
//    <FilterTabs
//      onTabChange={function (tab: "daily" | "weekly" | "monthly"): void {
//        throw new Error("Function not implemented.");
//      }}
//    />
//  </ScrollView>;