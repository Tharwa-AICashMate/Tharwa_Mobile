import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import EditProfile from '../../screens/EditProfile/EditProfile';
import Security from '../../screens/Security/Security';
import Settings from '../../screens/Settings';
import Help from '../../screens/Help';
import Login from '../../screens/Logout';
import Profile from '@/screens/Profile/Profile';
import Notification from '@/screens/Notification/Notification';
import SettingsScreen from '@/screens/SettingsScreen';
import HelpCenterScreen from '@/screens/HelpCenterScreen';

export type RootStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  Security: undefined;
  Settings: undefined;
  Help: undefined;
  Login: undefined;
  Notification: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
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
