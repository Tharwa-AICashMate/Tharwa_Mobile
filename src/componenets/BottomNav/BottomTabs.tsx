import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import Profile from '../../screens/Profile/Profile';
import Home from '../../screens/Home';
import Stats from '../../screens/Stats';
import Transactions from '../../screens/Transactions';
import Portfolio from '../../screens/Portfolio';
import EditProfile from '../../screens/EditProfile/EditProfile';
import Security from '../../screens/Security/Security';
import Settings from '../../screens/Settings';
import Help from '../../screens/Help';
import Logout from '../../screens/Logout';
import Notification from '@/screens/Notification';
import ChangePin from '@/screens/Security/ChangePin/ChangePin';
import FingerPrint from '@/screens/Security/FingerPrint/FingerPrint';
import TermsAndConditions from '@/screens/Security/TermsAndConditions/TermsAndConditions';
import GreenScreen from '@/screens/Security/ChangePin/GreenScreen/GreenScreen';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import FingerprintDetails from '@/screens/Security/FingerPrint/FingerPrintDetails/FingerPrintDetails';
import AddFingerPrint from '@/screens/Security/FingerPrint/AddFingerPrint/AddFingerPrint';
import Theme from '@/theme';
import styles from './BottomTabs.styles';
import OnBoardingNavigation from '@/navigation/onBoardingNavigation';
import OnboardingScreen from '@/screens/onboarding/OnboardingScreen';
import LoginScreen from '@/screens/Authentication/LoginScreen';
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
};

type BottomTabParamList = {
  Home: undefined;
  Stats: undefined;
  Transactions: undefined;
  Portfolio: undefined;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
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
      <ProfileStack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <ProfileStack.Screen name="FingerprintDetails" component={FingerprintDetails} />
      <ProfileStack.Screen name="AddFingerPrint" component={AddFingerPrint} />
    </ProfileStack.Navigator>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }: { focused: boolean }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Stats') {
            iconName = 'stats-chart-outline';
          } else if (route.name === 'Transactions') {
            iconName = 'swap-horizontal-outline';
          } else if (route.name === 'Portfolio') {
            iconName = 'layers-outline';
          } else {
            iconName = 'person-outline';
          }

          const iconSize = 28;
          const icon = (
            <Ionicons name={iconName} size={iconSize} color={focused ? '#000' : 'black'} />
          );

          return focused ? (
            <View style={styles.activeTabIcon}>{icon}</View>
          ) : (
            icon
          );
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
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

      {/* <Tab.Screen name="OnBoarding" component={OnboardingScreen} /> */}
      {/* <Tab.Screen name="Login" component={LoginScreen} /> */}
      <Tab.Screen name="Home" component={OnboardingScreen} />
      <Tab.Screen name="Stats" component={Stats} />
      <Tab.Screen name="Transactions" component={Transactions} />
      <Tab.Screen name="Portfolio" component={Portfolio} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}


