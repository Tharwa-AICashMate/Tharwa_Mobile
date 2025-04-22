import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import SettingsScreen from "../screens/Settings";
import NotificationSettingsScreen from "../screens/NotificationSettingsScreen/NotificationSettingsScreen";
import PasswordSettingsScreen from "../screens/PasswordSettingsScreen";
import PasswordChangeConfirmScreen from "../screens/PasswordChangeConfirm/PasswordChangeConfirmScreen";
import DeleteAccountScreen from "../screens/DeleteAccountScreen";
import LoginScreen from "@/screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import TransactionsScreen from "../screens/Transaction/index";
import HelpCenterScreen from "../screens/EditProfile";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import { AccessibilityState } from "react-native";
import SupportChannelsScreen from "@/screens/SupportChannelsScreen/SupportChannelsScreen";
import StatsScreen from "@/screens/StatsScreen";
import AddTransactionScreen from "@/screens/AddTransactionScreen";
import CategoryDetailScreen from "@/screens/CategoryDetails/index.js";

interface CustomTabBarButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  accessibilityState: AccessibilityState;
}

const CustomTabBarButton = ({
  children,
  onPress,
  accessibilityState,
}: CustomTabBarButtonProps) => {
  const focused = accessibilityState.selected;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        backgroundColor: focused ? "#FECD3E" : "rgb(245, 245, 245)",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        height: 40,
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen
        name="NotificationSettingsScreen"
        component={NotificationSettingsScreen}
      />
      <Stack.Screen
        name="PasswordSettingsScreen"
        component={PasswordSettingsScreen}
      />
       

      <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen} />
      <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
      <Stack.Screen name="SupportChannelsScreen" component={SupportChannelsScreen} />
      <Stack.Screen name="TransactionsScreen" component={TransactionsScreen} />
      <Stack.Screen name="PasswordChangeConfirmScreen" component={PasswordChangeConfirmScreen} />
      <Stack.Screen name="StatsScreen" component={StatsScreen} />
      <Stack.Screen
        name="AddTransactionScreen"
        comonent={AddTransactionScreen}
      />
    </Stack.Navigator>
  );
};

// ✅ Main Tab Navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }: {
        route: RouteProp<Record<string, object | undefined>, string>;
      }) => ({
        tabBarIcon: ({ focused, size }: { focused: boolean; size: number }) => {
          let iconName:
            | "home"
            | "home-outline"
            | "search"
            | "search-outline"
            | "settings"
            | "settings-outline"
            | "repeat"
            | "repeat-outline"
            | "layers"
            | "layers-outline"
            | undefined;

          if (route.name === "home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "SettingsTab") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "repeat") {
            iconName = focused ? "repeat" : "repeat-outline";
          } else if (route.name === "layers") {
            iconName = focused ? "layers" : "layers-outline";
          }

          return <Ionicons name={iconName} size={size} color={"black"} />;
        },
        tabBarButton: (props: BottomTabBarButtonProps) => (
          <CustomTabBarButton {...props} />
        ),
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgb(250, 250, 249)",
          height: 60,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
        },
      })}
    >
      <Tab.Screen
        name="home"
        component={DashboardScreen}
        options={{ tabBarLabel: "" }}
      />
      <Tab.Screen
        name="repeat"
        component={TransactionsScreen}
        options={{ tabBarLabel: "" }}
      />
      <Tab.Screen
        name="Search"
        component={TransactionsScreen}
        options={{ tabBarLabel: "" }}
      />
      <Tab.Screen
        name="layers"
        component={TransactionsScreen}
        options={{ tabBarLabel: "" }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStackNavigator}
        options={{ tabBarLabel: "" }}
      />
    </Tab.Navigator>
  );
};

// ✅ App Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
