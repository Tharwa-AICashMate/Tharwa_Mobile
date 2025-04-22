import React from "react";
import { StyleSheet, View } from "react-native";
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
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export type RootStackParamList = {
  Categories: undefined;
  CategoryDetail: { categoryName: string };
  AddExpenses: undefined;
  Savings: undefined;
  SavingDetails: { categoryName: string };
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

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // You can use Theme.colors.background if needed
  },
});