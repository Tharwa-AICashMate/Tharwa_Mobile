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
import BalanceModal from "@/componenets/EditBalanceModal";
import { setUserBalance } from "@/redux/slices/AuthSlice";
import ExpenseBrief from "@/componenets/expenceBrief";
const Home: React.FC = () => {
  const totalBalance = useAppSelector(state => state.auth.user?.balance);
  const [openModal,setOpenModal] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  );
  const totalExpences = transactions?.reduce(
    (total, ele) => (total += ele.type == "expense" ? ele.amount : 0),
    0
  )

  const precentage = totalBalance ? totalExpences/totalBalance*100 : 0;
  const fetchBalance = async () => {
    try {
      const user_id = user!.id;
      console.log("user_id", user_id);
      const respons = await axios.get(
        `${apiBase}/api/balances/user/${user_id}`
      );
      dispatch(setUserBalance(respons.data?.balance_limit || 0));

     
    } catch (error) {
      // show the balance model to enter balanace
      setOpenModal(true);
      console.log(openModal);
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
      <>
    <ScrollView style={styles.container}>
      <StatusBar
        style="light"
        backgroundColor={Theme.colors.highlight}
        translucent={false}
      />
      <Header title=" Home" />
      {/* budget */}
      <ExpenseBrief />

      {/* <ScrollView style={styles.contentContainer}> */}
     
      <ScrollView contentContainerStyle={styles.scrollContent}>
         <View style={styles.contentBox}>
        {/* quick stats */}
        <QuickStatsCard
          savingsProgress={30}
          revenueLastWeek={2000}
          foodLastWeek={500}
        />
           <Text>hiiiiii</Text>
           <FinancialCategories />
         </View>
       </ScrollView>

        {/* filter tabs */}
        {/* <FilterTabs
          onTabChange={function (tab: "daily" | "weekly" | "monthly"): void {
            //throw new Error("Function not implemented.");
          }}
        />
        <TransactionList />
      </ScrollView> */}
    </ScrollView>
    {!totalBalance && <BalanceModal isOpen={openModal} setIsOpen={setOpenModal}/>}
    
    </>
  );
};

export default Home;
