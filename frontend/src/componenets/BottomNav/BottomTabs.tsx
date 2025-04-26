import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import Profile from "../../screens/Profile/Profile";
import Home from "../../screens/HomePage/Home";
import Stats from "../../screens/Analysis/analysis";
import Portfolio from "../../screens/Portfolio";
import EditProfile from "../../screens/EditProfile/EditProfile";
import Security from "../../screens/Security/Security";
import Settings from "../../screens/Settings";
import Help from "../../screens/Help";
import Logout from "../../screens/Logout";
import Notification from "@/screens/Notification/Notification";
import ChangePin from "@/screens/Security/ChangePin/ChangePin";
import FingerPrint from "@/screens/Security/FingerPrint/FingerPrint";
import TermsAndConditions from "@/screens/Security/TermsAndConditions/TermsAndConditions";
import { NavigatorScreenParams } from "@react-navigation/native";
import FingerprintDetails from "@/screens/Security/FingerPrint/FingerPrintDetails/FingerPrintDetails";
import { StackScreenProps } from "@react-navigation/stack";
import AddFingerPrint from "@/screens/Security/FingerPrint/AddFingerPrint/AddFingerPrint";
import Theme from "@/theme";
import styles from "./BottomTabs.styles";
import CategoriesScreen from "@/screens/Categories";
import SettingsScreen from "@/screens/Settings";
import HelpCenterScreen from "@/screens/EditProfile";
import PasswordSettingsScreen from "@/screens/PasswordSettingsScreen";
import NotificationSettingsScreen from "@/screens/NotificationSettingsScreen/NotificationSettingsScreen";
import DeleteAccountScreen from "@/screens/DeleteAccountScreen";
import SupportChannelsScreen from "@/screens/SupportChannelsScreen/SupportChannelsScreen";
import AddExpensesScreen from "@/screens/AddExpense";
import TransactionForm from "../TransactionForm";
import Savings from "@/screens/Savings";
import CategoryDetailScreen from "@/screens/CategoryDetails";
import TransactionScreen from "@/screens/Transaction";
import StoreHome from "@/screens/StoreHome";
import StoreScreen from "@/screens/StoreHome";
import { FinanceOverview } from "@/screens/FinanceOverview/FinanceOverview";
import CalenderScreen from "@/screens/FinanceOverview/CalenderScreen/CalenderScreen";
import SearchScreen from "@/screens/FinanceOverview/SearchScreen/SearchScreen";
// import TransactionScreen from "@/screens/Transaction";

type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  Security: undefined;
  Settings: undefined;
  Help: undefined;
  Logout: undefined;
  Notification: undefined;
  ChangePin: undefined;
  FingerPrint: undefined;
  TermsAndConditions: undefined;
  FingerprintDetails: undefined;
  AddFingerPrint: undefined;
  SettingsScreen: undefined;
  HelpCenterScreen: undefined;
  PasswordSettingsScreen: undefined;
  NotificationSettingsScreen: undefined;
  DeleteAccountScreen: undefined;
  SupportChannelsScreen: undefined;
  StoreHome: undefined;
  AddExpensesScreen: undefined;
  TransactionForm: undefined; 

};

type BottomTabParamList = {
  Home: undefined;
  Stats: undefined;
  Transactions: undefined;
  Portfolio: undefined;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
  Store: undefined;
  Categories: undefined; 
  FinanceOverview: undefined; 

};

const Tab = createBottomTabNavigator<BottomTabParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={Profile} />
      <ProfileStack.Screen name="EditProfile" component={EditProfile} />
      <ProfileStack.Screen name="Security" component={Security} />
      <ProfileStack.Screen name="Settings" component={Settings} />
      <ProfileStack.Screen name="Help" component={Help} />
      <ProfileStack.Screen name="Logout" component={Logout} />
      <ProfileStack.Screen name="Notification" component={Notification} />
      <ProfileStack.Screen name="ChangePin" component={ChangePin} />
      <ProfileStack.Screen name="FingerPrint" component={FingerPrint} />
      <ProfileStack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
      />
      <ProfileStack.Screen
        name="FingerprintDetails"
        component={FingerprintDetails}
      />
      <ProfileStack.Screen name="AddFingerPrint" component={AddFingerPrint} />
      <ProfileStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <ProfileStack.Screen name="StoreHome" component={StoreHome} />
      <ProfileStack.Screen
        name="HelpCenterScreen"
        component={HelpCenterScreen}
      />
      <ProfileStack.Screen
        name="PasswordSettingsScreen"
        component={PasswordSettingsScreen}
      />
      <ProfileStack.Screen
        name="NotificationSettingsScreen"
        component={NotificationSettingsScreen}
      />
      <ProfileStack.Screen
        name="DeleteAccountScreen"
        component={DeleteAccountScreen}
      />
      <ProfileStack.Screen
        name="SupportChannelsScreen"
        component={SupportChannelsScreen}
      />
      {/* <ProfileStack.Screen name="CategoryDetailScreen" component={CategoryDetailScreen} /> */}
      <ProfileStack.Screen
        name="AddExpensesScreen"
        component={AddExpensesScreen}
      />
      <ProfileStack.Screen
        name="TransactionForm"
        component={Home} />
     
    </ProfileStack.Navigator>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }: {
        route: { name: keyof BottomTabParamList };
      }) => ({
        tabBarIcon: ({ focused }: { focused: boolean }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Stats") {
            iconName = "stats-chart-outline";
          } else if (route.name === "Transactions") {
            iconName = "swap-horizontal-outline";
          } else if (route.name === "Portfolio") {
            iconName = "layers-outline";
          } else if (route.name === "FinanceOverview") {
            iconName = "analytics-outline";
          }else if(route.name === "Store"){
            iconName='storefront-outline';
          }else if (route.name ==="Categories"){
            iconName='layers-outline'
          }
          else {
            iconName = "person-outline";
          }

          const iconSize = 28;
          const icon = (
            <Ionicons
              name={iconName}
              size={iconSize}
              color={focused ? "#000" : "black"}
            />
          );

          return focused ? (
            <View style={styles.activeTabIcon}>{icon}</View>
          ) : (
            icon
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: Theme.colors.secondery,
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
          paddingBottom: 10,
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
          height: 90,
          borderTopWidth: 0,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="FinanceOverview" component={FinanceOverview} />
      <Tab.Screen name="Store" component={StoreScreen} />
      <Tab.Screen name="Transactions" component={TransactionScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}
