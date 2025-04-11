import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import EditProfile from '../../screens/EditProfile';
import Security from '../../screens/Security';
import Settings from '../../screens/Settings';
import Help from '../../screens/Help';
import Login from '../../screens/Logout';
import Profile from '@/screens/Profile';
import Notification from '@/screens/Notification';

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
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Notification" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
