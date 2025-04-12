import { useFonts } from "expo-font";

import {
  Inter_500Medium,
  Inter_700Bold,
  Inter_300Light,
} from "@expo-google-fonts/inter";
import {
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_500Medium,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import {
  LeagueSpartan_300Light,
  LeagueSpartan_400Regular,
} from "@expo-google-fonts/league-spartan";
import OnBoardingNavigation from "@/navigation/onBoardingNavigation";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

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
    <SafeAreaView style={{flex:1}}>
      <StatusBar style="light" />
      <OnBoardingNavigation />
    </SafeAreaView>
  );
}
