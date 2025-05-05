import React, { useEffect } from "react";
import { I18nManager, StyleSheet, View } from "react-native";
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
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./src/redux/store";
import MainNavigator from "@/navigation/MainNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { Transaction } from "@/types/transactionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "./services/i18next";
import RNRestart from "react-native-restart";

export type RootStackParamList = {
  Categories: undefined;
  CategoryDetail: {
    categoryName: string;
    categoryId: number;
    UserId: string;
    Icon: string;
  };
  AddExpensesScreen: {
    transaction: Transaction | undefined;
    categoryName: string | undefined;
  };
  AddIncome: {
    transaction: Transaction | undefined;
    savingCategory: string | undefined;
  };
  Savings: { categoryName: string };
  SavingDetails: {
    categoryName: string;
    goalID: number;
    Target: number;
    Icon: string;
  };
  Camera: undefined;
  AddSavings: undefined;
};

const RootStack = createStackNavigator();

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

  useEffect(() => {
    const initLanguage = async () => {
      try {
        const storedLang = await AsyncStorage.getItem("user-language");
        const lang = storedLang || "en"; 
        await i18next.changeLanguage(lang);

        const isRTL = lang === "ar";
        if (I18nManager.isRTL !== isRTL) {
          I18nManager.forceRTL(isRTL);
          I18nManager.allowRTL(isRTL);
        }
      } catch (error) {
        console.log("Failed to initialize language:", error);
      }
    };

    initLanguage();
  }, []);
  console.log("I18nManager.isRTL after initialization:", I18nManager.isRTL);
  
  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <MainNavigator />
      </Provider>
      <Toast />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
