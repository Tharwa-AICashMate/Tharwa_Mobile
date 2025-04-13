import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "@/redux/hook";
import { RootStackParamList } from "App";
import BalanceDisplay from "@/componenets/BalanceDisplay";
import ProgressBar from "@/componenets/ProgressBar";
import styles from "./style";
import Theme from "@/theme";
import Header from "@/componenets/Header";

type CategoriesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Categories"
>;

const CategoriesScreen = () => {
  const navigation = useNavigation<CategoriesScreenNavigationProp>();

  const budget = useAppSelector((state) => state.expenses.budget);
  const categories = useAppSelector((state) => state.expenses.categories);

  const navigateToCategory = (categoryName: string) => {
    navigation.navigate("CategoryDetail", { categoryName });
  };

  const navigateToAddExpense = () => {
    navigation.navigate("AddExpenses");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header name="Categories" navigateBack={() => navigation.goBack()} />

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

      {/* Categories Grid */}
      <View style={styles.categoriesContainer}>
        <ScrollView contentContainerStyle={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              
            >
              <Pressable
              onPress={() => navigateToCategory(category.name)}
              style={({ pressed }) => [
                styles.categoryIconContainer,
                {
                  backgroundColor: pressed
                    ? Theme.colors.accentDark
                    : Theme.colors.accentLight,
                },
              ]}
            >
                <Ionicons name={category.icon as any} size={40} color="white" />
                </Pressable>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}

          {/* More Category Card */}
          <TouchableOpacity style={styles.categoryCard}>
            <Pressable
              onPress={navigateToAddExpense}
              style={({ pressed }) => [
                styles.categoryIconContainer,
                {
                  backgroundColor: pressed
                    ? Theme.colors.accentDark
                    : Theme.colors.accentLight,
                },
              ]}
            >
              <Ionicons name="add" size={40} color="white" />
            </Pressable>
            <Text style={styles.categoryName}>More</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>


    </SafeAreaView>
  );
};

export default CategoriesScreen;
