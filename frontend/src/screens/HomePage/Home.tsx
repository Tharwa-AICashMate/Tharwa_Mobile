import React, { useEffect, useState } from "react";
import { View, Text,  ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../../componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import Theme from "@/theme";
import styles from "./styles";
import QuickStatsCard from "@/componenets/HomeScreen/QuickStatsCard";
import { useAppSelector } from "@/redux/hook";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchTransactionsAsync } from "@/redux/slices/transactionSlice";
import FinancialCategories from "@/componenets/HomeScreen/FinancialCategories";
import BalanceModal from "@/componenets/EditBalanceModal";
import ExpenseBrief from "@/componenets/expenceBrief";
const Home: React.FC = () => {
  const [openModal,setOpenModal] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const totalBalance = user?.balance||0
  const dispatch = useDispatch<AppDispatch>();
  


  useEffect(()=>{
    if(user && !user.balance)
      setOpenModal(true);
    else
      setOpenModal(false)
  },[user])

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchTransactionsAsync());
    }, [])
  );
 
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
     
      <ScrollView style={styles.scrollContent}>
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
