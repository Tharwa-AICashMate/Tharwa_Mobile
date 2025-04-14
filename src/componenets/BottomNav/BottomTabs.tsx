import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
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
import { NavigatorScreenParams } from '@react-navigation/native';
import FingerprintDetails from '@/screens/Security/FingerPrint/FingerPrintDetails/FingerPrintDetails';
import AddFingerPrint from '@/screens/Security/FingerPrint/AddFingerPrint/AddFingerPrint';
import Theme from '@/theme';
import styles from './BottomTabs.styles';
import CategoriesScreen from '@/screens/Categories';
import SettingsScreen from '@/screens/SettingsScreen';
import HelpCenterScreen from '@/screens/HelpCenterScreen';
import PasswordSettingsScreen from '@/screens/PasswordSettingsScreen';
import NotificationSettingsScreen from '@/screens/NotificationSettingsScreen';
import DeleteAccountScreen from '@/screens/DeleteAccountScreen';
import SupportChannelsScreen from '@/screens/SupportChannelsScreen';

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
      <ProfileStack.Screen name="SettingsScreen" component={SettingsScreen} />
      <ProfileStack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
      <ProfileStack.Screen name="PasswordSettingsScreen" component={PasswordSettingsScreen} />
      <ProfileStack.Screen name="NotificationSettingsScreen" component={NotificationSettingsScreen} />
      <ProfileStack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen} />
      <ProfileStack.Screen name="SupportChannelsScreen" component={SupportChannelsScreen} />
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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Stats" component={Stats} />
      <Tab.Screen name="Transactions" component={Transactions} />
      <Tab.Screen name="Portfolio" component={CategoriesScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}