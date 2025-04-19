// import React from 'react'
// import { View , Text } from 'react-native'
// export default function Home() {
//   return (
//     <View>
//        <Text> this is home</Text>
//     </View>
//   )
// }


import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import ProfileHeader from "../../componenets/ProfileHeader/ProfileHeader";
import Header from "../../componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Theme from "@/theme";
import styles from "./styles";
import BalanceDisplay from "@/componenets/BalanceDisplay";


const Home: React.FC = () => {
  const budget = {
    totalExpenses: 0, // Replace with actual value or logic
    totalIncome: 0,   // Replace with actual value or logic
  };
  const navigation = useNavigation<ProfileNavigationProp>();

  return (
    <View style={styles.container}>
      <StatusBar
        style="light"
        backgroundColor={Theme.colors.highlight}
        translucent={false}
      />
      <Header title=" Home" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Budget Summary */}
        <View style={styles.balanceContainer}>
          <BalanceDisplay
            balance={budget.totalExpenses}
            expense={budget.totalIncome}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
