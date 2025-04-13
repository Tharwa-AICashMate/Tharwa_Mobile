import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

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
