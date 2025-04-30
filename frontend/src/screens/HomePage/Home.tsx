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
import HomeScreenNavigation, { NavigationTile } from "@/componenets/HomeScreen/HomeScreenNavigation";

const Home: React.FC = () => {
  const [openModal,setOpenModal] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const totalBalance = user?.balance||0
  const dispatch = useDispatch<AppDispatch>();

   const [selectedCategory, setSelectedCategory] = React.useState<
     string | undefined
   >();

   const handleSelectCategory = (tile: NavigationTile) => {
     setSelectedCategory(tile.id);
     console.log(`Selected Tile: ${tile.label}`);
     // Add navigation or other logic here if needed
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

            <HomeScreenNavigation
              onSelectTile={handleSelectCategory}
              style={styles.budgetContainer}
            />

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
