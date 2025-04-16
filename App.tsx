

import React from 'react';
<<<<<<< Updated upstream
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
=======
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import {
  useFonts as useInterFonts,
  Inter_300Light,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

import {
  useFonts as usePoppinsFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_500Medium,
  Poppins_400Regular,
} from '@expo-google-fonts/poppins';

import {
  useFonts as useLeagueSpartanFonts,
  LeagueSpartan_300Light,
  LeagueSpartan_400Regular,
} from '@expo-google-fonts/league-spartan';

import BottomTabs from './src/componenets/BottomNav/BottomTabs';
import GreenScreen from '@/screens/Security/ChangePin/GreenScreen/GreenScreen';
import GreenScreenFP from '@/screens/Security/FingerPrint/FingerPrintDetails/GreenScreenFP/GreenScreenFP';
import GreenScreenSFP from '@/screens/Security/FingerPrint/AddFingerPrint/GreenScreenSFP/GreenScreenSFP';
import OnBoardingNavigation from '@/navigation/onBoardingNavigation';
import Theme from '@/theme';

import LoginScreen from '@/screens/Authentication/LoginScreen';
import LaunchScreen from '@/screens/LaunchScreen/launchScreen';
import LoginFormScreen from '@/screens/Authentication/LoginForms/LoginFormScreen';
import CreateAccountScreen from '@/screens/Authentication/LoginForms/CreateAccountScreen';
import ForgotPasswordScreen from '@/screens/Authentication/LoginForms/ForgotPasswordScreen';
import SecurityPinScreen from '@/screens/Authentication/LoginForms/SecurityPinScreen';
import NewPasswordScreen from '@/screens/Authentication/LoginForms/NewPasswordScreen';
import PasswordChangedScreen from '@/screens/Authentication/LoginForms/PasswordChangedScreen';
import FingerprintScreen from '@/screens/Authentication/LoginForms/FingerprintScreen';

import CategoriesScreen from '@/screens/Categories';
import CategoryDetailScreen from '@/screens/CategoryDetails';
import AddExpensesScreen from '@/screens/AddExpense';

import { Provider } from 'react-redux';

import { store } from './src/redux/store'
import SettingsScreen from '@/screens/SettingsScreen';
import HelpCenterScreen from '@/screens/HelpCenterScreen';
import PasswordSettingsScreen from '@/screens/PasswordSettingsScreen';
import NotificationSettingsScreen from '@/screens/NotificationSettingsScreen';
import DeleteAccountScreen from '@/screens/DeleteAccountScreen';
import SupportChannelsScreen from '@/screens/SupportChannelsScreen';
import Notification from '@/screens/Notification';
import Profile from '@/screens/Profile/Profile';
import OnboardingScreen from '@/screens/onboarding/OnboardingScreen';
import TransactionsScreen from '@/screens/TransactionsScreen';

const RootStack = createNativeStackNavigator();
>>>>>>> Stashed changes

export default function App() {
  return (
<<<<<<< Updated upstream
    <SafeAreaProvider>
      <ReduxProvider store={store}>
        <AppNavigator />
      </ReduxProvider>
    </SafeAreaProvider>
=======
    <Provider store={store}>
      <StatusBar style="light" />
      <NavigationContainer>
        <RootStack.Navigator 
          initialRouteName="Launch"
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
              <View style={styles.container}>
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
          <RootStack.Screen name="AddExpenses" component={AddExpensesScreen} />
          <RootStack.Screen name="Notification" component={Notification} />
          {/* {TransactionsScreen} */}
          <RootStack.Screen name="TransactionsScreen" component={TransactionsScreen}/>
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
>>>>>>> Stashed changes
  );
}