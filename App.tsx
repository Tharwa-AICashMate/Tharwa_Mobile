import { StatusBar } from "expo-status-bar";

import { useFonts } from "expo-font";
import {
  Inter_500Medium,
  Inter_700Bold,
  Inter_300Light,
} from "@expo-google-fonts/inter";
import {
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_500Medium,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import {
  LeagueSpartan_300Light,
  LeagueSpartan_400Regular,
} from "@expo-google-fonts/league-spartan";


import { NavigationContainer } from "@react-navigation/native";
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoriesScreen from '@/screens/Categories';
import CategoryDetailScreen from '@/screens/CategoryDetails';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import AddExpensesScreen from "@/screens/AddExpense";
export type RootStackParamList = {
  Categories: undefined;
  CategoryDetail: { categoryName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();





export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_500Medium,
    Inter_700Bold,

    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_500Medium,
    Poppins_400Regular,

    LeagueSpartan_300Light,
    LeagueSpartan_400Regular,
  });



  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator 
        initialRouteName="Categories"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
        <Stack.Screen name="AddExpenses" component={AddExpensesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
  );
}



