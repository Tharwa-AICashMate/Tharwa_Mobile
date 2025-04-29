import React, { useEffect, useState } from "react";
import SettingsScreen from "@/screens/Settings";
import PasswordSettingsScreen from "@/screens/PasswordSettingsScreen";
import NotificationSettingsScreen from "@/screens/NotificationSettingsScreen/NotificationSettingsScreen";
import DeleteAccountScreen from "@/screens/DeleteAccountScreen";
import SupportChannelsScreen from "@/screens/SupportChannelsScreen/SupportChannelsScreen";
import Notification from "@/screens/Notification/Notification";
import Profile from "@/screens/Profile/Profile";
import TransactionForm from "@/componenets/TransactionForm";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GreenScreen from "@/screens/Security/ChangePin/GreenScreen/GreenScreen";
import GreenScreenFP from "@/screens/Security/FingerPrint/FingerPrintDetails/GreenScreenFP/GreenScreenFP";
import GreenScreenSFP from "@/screens/Security/FingerPrint/AddFingerPrint/GreenScreenSFP/GreenScreenSFP";
import OnBoardingNavigation from "@/navigation/onBoardingNavigation";
import CategoriesScreen from "@/screens/Categories";
import CategoryDetailScreen from "@/screens/CategoryDetails";
import AddExpensesScreen from "@/screens/AddExpense";
import { supabase } from "@/utils/supabase";
import Savings from "@/screens/Savings";
import SavingDetails from "@/screens/SavingDetails";
import AddSavingsScreen from "@/screens/AddSavings";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import BottomTabs from "@/componenets/BottomNav/BottomTabs";
import Theme from "@/theme";
import { Session } from "@supabase/supabase-js";
import PasswordChangeConfirmScreen from "@/screens/PasswordChangeConfirm/PasswordChangeConfirmScreen";
import { NavigationContainer } from "@react-navigation/native";
import CameraScreen from "@/componenets/Camera";
import CalenderScreen from "@/screens/FinanceOverview/CalenderScreen/CalenderScreen";
import SearchScreen from "@/screens/FinanceOverview/SearchScreen/SearchScreen";
import { RootStackParamList } from "@/navigation/types";
import HelpCenterScreen from "@/screens/EditProfile/HelpCenterScreen";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "@/redux/slices/AuthSlice";
import { AppDispatch } from "@/redux/store";
import { useAppSelector } from "@/redux/hook";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  const [session, setSession] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector((state) => state.auth.user);
  console.log("from nav", user);
  useEffect(() => {
    dispatch(fetchCurrentUser()).then((res) => {
      if (fetchCurrentUser.fulfilled.match(res)) setSession(true);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ? true : false);
    });
  }, []);

  return (
    <>
      <NavigationContainer>
        {!session ? (
          <OnBoardingNavigation />
        ) : (
          <RootStack.Navigator
            initialRouteName={"MainApp"}
            screenOptions={{ headerShown: false }}
          >
            {/* Main App */}
            <RootStack.Screen name="MainApp">
              {() => (
                <View style={styles.container}>
                  <BottomTabs />
                </View>
              )}
            </RootStack.Screen>

            {/* Settings & Profile */}
            <RootStack.Screen
              name="SettingsScreen"
              component={SettingsScreen}
            />
            <RootStack.Screen
              name="HelpCenterScreen"
              component={HelpCenterScreen}
            />
            <RootStack.Screen
              name="PasswordSettingsScreen"
              component={PasswordSettingsScreen}
            />

            <RootStack.Screen
              name="NotificationSettingsScreen"
              component={NotificationSettingsScreen}
            />
            <RootStack.Screen
              name="DeleteAccountScreen"
              component={DeleteAccountScreen}
            />
            <RootStack.Screen
              name="SupportChannelsScreen"
              component={SupportChannelsScreen}
            />
            <RootStack.Screen name="Profile" component={Profile} />

            {/* Security Screens */}
            <RootStack.Screen name="GreenScreen" component={GreenScreen} />
            <RootStack.Screen name="GreenScreenFP" component={GreenScreenFP} />
            <RootStack.Screen
              name="GreenScreenSFP"
              component={GreenScreenSFP}
            />

            {/* Category Flow */}
            <RootStack.Screen name="Categories" component={CategoriesScreen} />
            <RootStack.Screen
              name="CategoryDetail"
              component={CategoryDetailScreen}
            />
            <RootStack.Screen
              name="AddExpensesScreen"
              component={AddExpensesScreen}
            />
            {/* <RootStack.Screen
              name="TransactionForm"
              component={TransactionForm}
            /> */}
            <RootStack.Screen
              name="TransactionForm"
              children={() => (
                <TransactionForm
                  title="Transaction Title"
                  buttonText="Submit"
                  categories={[]}
                  onSubmit={() => console.log("Submitted")}
                />
              )}
            />
            <RootStack.Screen name="Camera" component={CameraScreen} />

            {/* Savings */}
            <RootStack.Screen name="Savings" component={Savings} />
            <RootStack.Screen name="SavingDetails" component={SavingDetails} />
            <RootStack.Screen name="AddSavings" component={AddSavingsScreen} />

            {/* Notification */}
            <RootStack.Screen name="Notification" component={Notification} />
            <RootStack.Screen
              name="CalenderScreen"
              component={CalenderScreen}
            />
            <RootStack.Screen name="SearchScreen" component={SearchScreen} />

            {/* Password Change Confirm */}
            <RootStack.Screen
              name="PasswordChangeConfirm"
              component={PasswordChangeConfirmScreen}
            />
          </RootStack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});
