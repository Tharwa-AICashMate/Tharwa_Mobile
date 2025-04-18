import React from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import {
  useFonts as useInterFonts,
  Inter_300Light,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import {
  useFonts as usePoppinsFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_500Medium,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

import {
  useFonts as useLeagueSpartanFonts,
  LeagueSpartan_300Light,
  LeagueSpartan_400Regular,
} from "@expo-google-fonts/league-spartan";

import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import MainNavigator from "@/navigation/MainNavigator";
// import { store } from '@/redux/store';
// import AddExpensesScreen from "@/screens/AddExpense";
//there is nothing to push here

export type RootStackParamList = {
  Categories: undefined;
  CategoryDetail: { categoryName: string };
  AddExpenses: undefined;
  Savings: undefined;
  SavingDetails: { categoryName: string };
  AddSavings: undefined;
};

export default function App() {
  const [interLoaded] = useInterFonts({
    Inter_300Light,
    Inter_500Medium,
    Inter_700Bold,
  });

  const [poppinsLoaded] = usePoppinsFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_500Medium,
    Poppins_400Regular,
  });

  const [leagueSpartanLoaded] = useLeagueSpartanFonts({
    LeagueSpartan_300Light,
    LeagueSpartan_400Regular,
  });

  const fontsLoaded = interLoaded && poppinsLoaded && leagueSpartanLoaded;

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <MainNavigator />
    </Provider>
  );
}
