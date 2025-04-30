import React, { useEffect, useState } from "react";
import { View, Text,  ScrollView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Header from "../../componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import Theme from "@/theme";
import styles from "./styles";
import QuickStatsCard from "@/componenets/HomeScreen/QuickStatsCard";
import { useAppSelector } from "@/redux/hook";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchTransactionsAsync } from "@/redux/slices/transactionSlice";
import BalanceModal from "@/componenets/EditBalanceModal";
import ExpenseBrief from "@/componenets/expenceBrief";
import FinanceCategories from "@/componenets/HomeScreen/FinancialCategories";
import { CategoryType } from "@/componenets/HomeScreen/FinancialCategories";
import type { CategoryDetailNavigationProp } from "../CategoryDetails";

const Home: React.FC = () => {
  const [openModal,setOpenModal] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const totalBalance = user?.balance||0
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<CategoryDetailNavigationProp>();

   const addExpense = () => {
     navigation.navigate("AddExpensesScreen");
   };

   const [selectedCategory, setSelectedCategory] = React.useState<
     string | undefined
   >();

   const handleSelectCategory = (category: CategoryType) => {
     console.log(`Selected Category: ${category.label} (ID: ${category.id})`);
     setSelectedCategory(category.id);
   };

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
        <ExpenseBrief />

        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentBox}>
            <QuickStatsCard/>

            <FinanceCategories
              onSelectCategory={(category) => setSelectedCategory(category.id)}
              selectedCategoryId={selectedCategory}
            />

            <View style={styles.addExpenseContainer}>
              <TouchableOpacity style={styles.addButton} onPress={addExpense}>
                <Text style={styles.addButtonText}>Add Expenses</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
      {!totalBalance && (
        <BalanceModal isOpen={openModal} setIsOpen={setOpenModal} />
      )}
    </>
  );
};

export default Home;
