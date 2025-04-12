import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import BottomTabs from './src/componenets/BottomNav/BottomTabs';
import GreenScreen from '@/screens/GreenScreen';
import GreenScreenFP from '@/screens/GreenScreenFP';
import GreenScreenSFP from '@/screens/GreenScreenSFP';
import Theme from '@/theme';

const RootStack = createNativeStackNavigator();

export default function App() {
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
        <RootStack.Screen name="GreenScreenFP" component={GreenScreenFP} />
        <RootStack.Screen name="GreenScreenSFP" component={GreenScreenSFP} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.highlight,
  },
});
