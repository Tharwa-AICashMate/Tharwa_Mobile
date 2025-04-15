import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "@/redux/hook";
import { RootStackParamList } from "App";
import Theme from "@/theme";
import Header from "@/componenets/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./style";
import ProgressBar from "@/componenets/ProgressBar";
import ProgressCircle from "@/componenets/ProgressCircle";
import { selectSavedAmount } from "@/redux/slices/savingSlice";
import TransactionItem from "@/componenets/TransactionItem";

type SavingDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  "SavingDetails"
>;
type SavingDetailsRouteProp = SavingDetailsProps["route"];
type SavingDetailsNavigationProp = SavingDetailsProps["navigation"];

const SavingDetails: React.FC<SavingDetailsProps> = () => {
  const route = useRoute<SavingDetailsRouteProp>();
  const navigation = useNavigation<SavingDetailsNavigationProp>();
  const { categoryName } = route.params;
  const savingsData = useAppSelector(
    (state) => state.savings.categories[categoryName]
  );

  const savedAmount = useAppSelector((state) =>
    selectSavedAmount(state, categoryName)
  );

  // Group deposits by month
  const groupedDeposits = savingsData.deposits.reduce(
    (groups: { [key: string]: typeof savingsData.deposits }, deposit) => {
      // Extract month from deposit.date (assuming deposit.date is in a format that can be parsed)
      const monthMatch = deposit.date.match(/([A-Za-z]+)/);
      const month = monthMatch ? monthMatch[0] : "Unknown";

      if (!groups[month]) {
        groups[month] = [];
      }

      groups[month].push(deposit);
      return groups;
    },
    {}
  );

  // Format currency
  const formatCurrency = (amount: number): string => {
    return amount
      .toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(/\.00$/, "");
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  const addSavings = () => {
    navigation.navigate("AddSavings", { categoryName });
  };
  const percentage = Math.round((savedAmount / savingsData.goal) * 100);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header name={categoryName} navigateBack={navigateBack} />

      {/* Goal Summary */}
      <View style={styles.goalContainer}>
        <View style={styles.goalCard}>
          <View style={styles.infoRow}>
            <Ionicons
              name="flag-outline"
              size={16}
              color={Theme.colors.text}
              style={styles.infoIcon}
            />
            <Text style={styles.infoLabel}>Goal</Text>
          </View>
          <Text style={styles.goalAmount}>
            {formatCurrency(savingsData.goal)}
          </Text>

          <View style={styles.infoRow}>
            <Ionicons
              name="cash-outline"
              size={16}
              color={Theme.colors.text}
              style={styles.infoIcon}
            />
            <Text style={styles.infoLabel}>Amount Saved</Text>
          </View>
          <Text style={styles.savedAmount}>{formatCurrency(savedAmount)}</Text>

          {/* Category Icon */}
          <View style={styles.categoryIconWrapper}>
            <View style={styles.categoryIconContainer}>
              <ProgressCircle
                progress={percentage}
                categoryName={categoryName}
              />
            </View>
          </View>
        </View>

        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <ProgressBar
            percentage={percentage}
            amount={savingsData.goal}
            color={Theme.colors.primary}
          />

          {/* Status */}
          <View style={styles.statusContainer}>
            <Ionicons
              name="checkbox-outline"
              size={14}
              color={Theme.colors.text}
            />
            <Text style={styles.statusText}>
              {percentage}% Of Your Goal, Looks Good.
            </Text>
          </View>
        </View>

        {/* Deposits History */}
        <ScrollView style={styles.transactionList}>
          {Object.keys(groupedDeposits).map((month) => (
            <View key={month} style={styles.monthSection}>
              <Text style={styles.monthTitle}>{month}</Text>

              {groupedDeposits[month].map((deposit) => (
                <TransactionItem
                  key={deposit.id}
                  id={deposit.id}
                  title={`${categoryName} Deposit`}
                  subtitle={`${deposit.time} • ${deposit.date}`}
                  amount={deposit.amount}
                  icon={
                    categoryName === "Travel"
                      ? "airplane"
                      : categoryName === "New House"
                        ? "home"
                        : categoryName === "Car"
                          ? "car"
                          : categoryName === "Wedding"
                            ? "diamond-outline"
                            : "save"
                  }
                  iconBgColor={Theme.colors.accentLight}
                  isDeposit={true}
                />
              ))}
            </View>
          ))}
        </ScrollView>

        {/* Add Savings Button */}
        <View style={styles.addSavingContainer}>
          <TouchableOpacity style={styles.addButton} onPress={addSavings}>
            <Text style={styles.addButtonText}>Add Savings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SavingDetails;
