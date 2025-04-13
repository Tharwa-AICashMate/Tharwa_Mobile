import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { Inter_300Light, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { Poppins_700Bold, Poppins_600SemiBold, Poppins_500Medium, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { LeagueSpartan_300Light, LeagueSpartan_400Regular } from '@expo-google-fonts/league-spartan';

import BottomTabs from '../Tharwa_Mobile/src/componenets/BottomNav/BottomTabs'; 
import GreenScreen from '@/screens/GreenScreen'; 

const RootStack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_500Medium,
    Inter_700Bold,
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_500Medium,
    Poppins_400Regular,
    LeagueSpartan_300Light,
    LeagueSpartan_400Regular,
  });

  if (!fontsLoaded) return null; 

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {/* Tab Navigator inside a stack screen */}
        <RootStack.Screen name="MainApp">
          {() => (
            <View style={styles.container}>
              <BottomTabs />
            </View>
          )}
        </RootStack.Screen>
        
        {/* GreenScreen outside of BottomTabs */}
        <RootStack.Screen name="GreenScreen" component={GreenScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
