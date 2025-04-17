import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from "@/screens/Authentication/LoginScreen";
import OnboardingScreen from "@/screens/onboarding/OnboardingScreen";
import LaunchScreen from '@/screens/LaunchScreen/launchScreen';
import LoginFormScreen from '@/screens/Authentication/LoginForms/LoginFormScreen';
import FingerprintScreen from '@/screens/Authentication/LoginForms/FingerprintScreen';
import PasswordChangedScreen from '@/screens/Authentication/LoginForms/PasswordChangedScreen';
import NewPasswordScreen from '@/screens/Authentication/LoginForms/NewPasswordScreen';
import SecurityPinScreen from '@/screens/Authentication/LoginForms/SecurityPinScreen';
import ForgotPasswordScreen from '@/screens/Authentication/LoginForms/ForgotPasswordScreen';
import CreateAccountScreen from '@/screens/Authentication/LoginForms/CreateAccountScreen';

type RootStackParamList = {
  Launch: undefined;
  Onboarding: undefined;
  Login: undefined;
  LoginForm: undefined;
  CreateAccount: undefined;
  ForgotPassword: undefined;
  SecurityPin: undefined;
  NewPassword: undefined;
  PasswordChanged: undefined;
  Fingerprint: undefined;
  MainApp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const OnBoardingNavigation: React.FC = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Launch"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Launch" component={LaunchScreen} />
      <Stack.Screen name="Launch" component={LaunchScreen} /> */
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="LoginForm" component={LoginFormScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="SecurityPin" component={SecurityPinScreen} />
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} />
      <Stack.Screen name="Fingerprint" component={FingerprintScreen} />
    </Stack.Navigator>
  );
}

export default OnBoardingNavigation;