import BalanceDisplay from '@/componenets/BalanceDisplay';
import ProgressBar from '@/componenets/ProgressBar';
import Theme from '@/theme';
import { RootStackParamList } from 'App';
import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from '@/componenets/Header';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '@/redux/hook';
import styles from './style';
import CategorySection from '@/componenets/CategorySection';

type SavingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Savings"
>;

const savingsGoals = [
  { id: '1', name: 'Travel', icon: 'airplane', bgColor: Theme.colors.accentLight },
  { id: '2', name: 'New House', icon: 'home', bgColor:Theme.colors.accentLight  },
  { id: '3', name: 'Car', icon: 'car', bgColor: Theme.colors.accentLight  },
  { id: '4', name: 'Wedding', icon: 'diamond-outline', bgColor: Theme.colors.accentLight  },
];

function Savings() {
  const navigation = useNavigation<SavingsScreenNavigationProp>();
  const budget = useAppSelector((state) => state.expenses.budget);
  
  const navigateToCategory = (categoryName: string) => {
    navigation.navigate("SavingDetails", { categoryName });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Header name="Savings" navigateBack={() => navigation.goBack()} />
        
        {/* Budget Summary */}
        <View style={styles.balanceContainer}>
          <BalanceDisplay
            balance={budget.totalExpenses}
            expense={budget.totalIncome}
          />
        </View>
        <View style={styles.budgetContainer}>
          <View style={styles.progressContainer}>
            <ProgressBar
              percentage={budget.percentageUsed}
              amount={budget.budgetLimit}
            />
          </View>
          
          {/* Budget Status */}
          <View style={styles.budgetStatus}>
            <Ionicons
              name="checkbox-outline"
              size={16}
              color={Theme.colors.text}
            />
            <Text style={styles.budgetStatusText}>
              {budget.percentageUsed}% Of Your Expenses, Looks Good.
            </Text>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <ScrollView contentContainerStyle={styles.categoriesGrid}>
            <CategorySection data={savingsGoals} onpress={navigateToCategory}/>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Savings;