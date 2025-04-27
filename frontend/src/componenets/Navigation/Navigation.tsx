import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import EditProfile from "../../screens/EditProfile/EditProfile";
import Security from "../../screens/Security/Security";
import Settings from "../../screens/Settings";
import Help from "../../screens/Help";
import Login from "../../screens/Logout";
import Profile from "@/screens/Profile/Profile";
import Notification from "@/screens/Notification/Notification";
import SettingsScreen from "@/screens/Settings";
import HelpCenterScreen from "@/screens/EditProfile";

export type RootStackParamList = {
  MainApp: undefined;
  SettingsScreen: undefined;
  HelpCenterScreen: undefined;
  PasswordSettingsScreen: undefined;
  NotificationSettingsScreen: undefined;
  DeleteAccountScreen: undefined;
  SupportChannelsScreen: undefined;
  Profile: undefined;
  GreenScreen: undefined;
  GreenScreenFP: undefined;
  GreenScreenSFP: undefined;
  Categories: undefined;
  CategoryDetail: undefined;
  AddExpensesScreen: undefined;
  TransactionForm: undefined;
  Camera: undefined;
  Savings: undefined;
  SavingDetails: {
    categoryName: string;
    goalID: string;
    Target: number;
    Icon: string;
  };
  AddSavings: undefined;
  Notification: undefined;
  CalenderScreen: undefined;
  SearchScreen: undefined;
  PasswordChangeConfirm: undefined;
  EditProfile: undefined;
  Security: undefined;
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Profile"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Security" component={Security} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Notification" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
