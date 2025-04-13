import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
import Theme from '@/theme';

const RootStack = createNativeStackNavigator();

export default function App() {
  const [interLoaded] = useInterFonts({
    Inter_300Light,
    Inter_500Medium,
    Inter_700Bold,
  });

  const [poppinsLoaded] = usePoppinsFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_500Medium,
    Poppins_400Regular,
  });

  const [leagueSpartanLoaded] = useLeagueSpartanFonts({
    LeagueSpartan_300Light,
    LeagueSpartan_400Regular,
  });

  const fontsLoaded = interLoaded && poppinsLoaded && leagueSpartanLoaded;

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="MainApp">
          {() => (
            <View style={styles.container}>
              <BottomTabs />
            </View>
          )}
        </RootStack.Screen>

        <RootStack.Screen name="GreenScreen" component={GreenScreen} />
        <RootStack.Screen name="GreenScreenFP" component={GreenScreenFP} />
        <RootStack.Screen name="GreenScreenSFP" component={GreenScreenSFP} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
});
//thete is nothing to commit 
