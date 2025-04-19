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
// import { store } from '@/redux/store';
// import AddExpensesScreen from "@/screens/AddExpense";
//there is nothing to push here 
import Savings from "@/screens/Savings";
import SavingDetails from "@/screens/SavingDetails";
import AddSavingsScreen from "@/screens/AddSavings";


import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SecurityPinScreen from "@/screens/Authentication/LoginForms/SecurityPinScreen";
import CreateAccountScreen from "@/screens/Authentication/LoginForms/CreateAccountScreen";
import LoginFormScreen from "@/screens/Authentication/LoginForms/LoginFormScreen";
import LoginScreen from "@/screens/Authentication/LoginScreen";
import NewPasswordScreen from "@/screens/Authentication/LoginForms/NewPasswordScreen";
import PasswordChangedScreen from "@/screens/Authentication/LoginForms/PasswordChangedScreen";
import FingerprintScreen from "@/screens/Authentication/LoginForms/FingerprintScreen";
import ForgotPasswordScreen from "@/screens/Authentication/LoginForms/ForgotPasswordScreen";
import OnboardingScreen from "@/screens/onboarding/OnboardingScreen";
import BottomTabs from "@/componenets/BottomNav/BottomTabs";
import CategoryDetailScreen from "@/screens/CategoryDetails";
import AddExpensesScreen from "@/screens/AddExpense";
import CategoriesScreen from "@/screens/Categories";
import GreenScreenSFP from "@/screens/Security/FingerPrint/AddFingerPrint/GreenScreenSFP/GreenScreenSFP";
import GreenScreen from "@/screens/Security/ChangePin/GreenScreen/GreenScreen";
import GreenScreenFP from "@/screens/Security/FingerPrint/FingerPrintDetails/GreenScreenFP/GreenScreenFP";
import styles from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle.styles";
import TransactionForm from "@/componenets/TransactionForm";
import DeleteAccountScreen from "@/screens/DeleteAccountScreen";
import HelpCenterScreen from "@/screens/HelpCenterScreen";
import LaunchScreen from "@/screens/LaunchScreen/launchScreen";
import NotificationSettingsScreen from "@/screens/NotificationSettingsScreen";
import PasswordSettingsScreen from "@/screens/PasswordSettingsScreen";
import Profile from "@/screens/Profile/Profile";
import SettingsScreen from "@/screens/SettingsScreen";
import SupportChannelsScreen from "@/screens/SupportChannelsScreen";

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
      <StatusBar style="light" />
      <NavigationContainer>
        <RootStack.Navigator 
          initialRouteName="Categories"
          screenOptions={{ headerShown: false }}
        >
          {/* Launch and Onboarding */}
          <RootStack.Screen name="Launch" component={LaunchScreen} />
          <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
          
          {/* Authentication */}
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="LoginForm" component={LoginFormScreen} />
          <RootStack.Screen name="CreateAccount" component={CreateAccountScreen} />
          <RootStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <RootStack.Screen name="SecurityPin" component={SecurityPinScreen} />
          <RootStack.Screen name="NewPassword" component={NewPasswordScreen} />
          <RootStack.Screen name="PasswordChanged" component={PasswordChangedScreen} />
          <RootStack.Screen name="Fingerprint" component={FingerprintScreen} />

          
          {/* Main App */}
          <RootStack.Screen name="MainApp">
            {() => (
              <View style={{ flex: 1 }}>
                <BottomTabs />
              </View>
            )}
          </RootStack.Screen>

          {/* Settings & Profile */}
          <RootStack.Screen name="SettingsScreen" component={SettingsScreen} />
          <RootStack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
          <RootStack.Screen name="PasswordSettingsScreen" component={PasswordSettingsScreen} />
          <RootStack.Screen name="NotificationSettingsScreen" component={NotificationSettingsScreen} />
          <RootStack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen} />
          <RootStack.Screen name="SupportChannelsScreen" component={SupportChannelsScreen} />
          <RootStack.Screen name="Profile" component={Profile} />

          {/* Security Screens */}
          <RootStack.Screen name="GreenScreen" component={GreenScreen} />
          <RootStack.Screen name="GreenScreenFP" component={GreenScreenFP} />
          <RootStack.Screen name="GreenScreenSFP" component={GreenScreenSFP} />

          {/* Category Flow */}
          <RootStack.Screen name="Categories" component={CategoriesScreen} />
          <RootStack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
          <RootStack.Screen name="AddExpensesScreen" component={AddExpensesScreen} />
          <RootStack.Screen name="TransactionForm" component={TransactionForm} />
          <RootStack.Screen name="Savings" component={Savings} />
          <RootStack.Screen name="SavingDetails" component={SavingDetails} />
          <RootStack.Screen name="AddSavings" component={AddSavingsScreen} />
          <RootStack.Screen name="Notification" component={Notification} />
          <RootStack.Screen name="CategoryDetailScreen" component={CategoryDetailScreen} />

        </RootStack.Navigator>
      </NavigationContainer>
    </Provider >
    </GestureHandlerRootView>
  );
  };
