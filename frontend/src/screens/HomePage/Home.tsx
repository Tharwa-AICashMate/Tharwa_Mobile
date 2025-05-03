import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
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
import HomeScreenNavigation, {
  NavigationTile,
} from "@/componenets/HomeScreen/HomeScreenNavigation";
const Home: React.FC = () => {
  const { getBalance } = useAppSelector((state) => state.finance);
  
  const [openModal, setOpenModal] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const [totalBalance, setTotalBalance] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = React.useState<
    string | undefined
  >();

  const handleSelectCategory = (tile: NavigationTile) => {
    setSelectedCategory(tile.id);
    navigation.navigate(tile.screen);
    console.log(`Selected Tile: ${tile.label}`);
  };

  
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
        <ExpenseBrief/>

        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentBox}>
            {/* quick stats */}
            <QuickStatsCard />
            <HomeScreenNavigation
              onSelectTile={handleSelectCategory}
              style={styles.budgetContainer}
            />
          </View>
        </ScrollView>
      </ScrollView>
      {getBalance && (
        <BalanceModal isOpen={getBalance} setIsOpen={setOpenModal} />
      )}
    </>
  );
};

export default Home;
