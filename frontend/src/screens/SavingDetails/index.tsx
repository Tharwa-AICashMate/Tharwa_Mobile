import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/types";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { cleargoals, getDepositsByGoal } from "@/redux/slices/depositSlice";
import { fetchGoalCurrentAmount } from "@/redux/slices/savingSlice";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import ProgressBar from "@/componenets/ProgressBar";
import ProgressCircle from "@/componenets/ProgressCircle";
import TransactionItem from "@/componenets/TransactionItem";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import Theme from "@/theme";
import { useFocusEffect } from "@react-navigation/native";
import { IDeposit } from "@/types/depositType";

dayjs.extend(utc);

type SavingDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  "SavingDetails"
>;

const SavingDetails: React.FC<SavingDetailsProps> = ({ route, navigation }) => {
  const data = route.params;
  const { categoryName, goalID, Target, Icon } = data
  const dispatch = useAppDispatch();

  const goalIdNumber = Number(goalID);

  const currentAmount = useAppSelector(
    (state) => state.goals.currentAmounts[goalIdNumber]
  );

  const { deposits, loading } = useAppSelector((state) => state.deposits);

  useFocusEffect(
    useCallback(() => {
      if (goalIdNumber) {
        dispatch(cleargoals());
        dispatch(getDepositsByGoal(goalIdNumber));
        dispatch(fetchGoalCurrentAmount(goalIdNumber));
      }
    }, [dispatch, goalIdNumber])
  );

  const groupedDeposits = deposits.reduce(
    (groups: { [key: string]: any[] }, deposit) => {
      const date = dayjs.utc(deposit.created_at || new Date());
      const monthName = date.format("MMMM YYYY");

      if (!groups[monthName]) {
        groups[monthName] = [];
      }

      groups[monthName].push(deposit);
      return groups;
    },
    {}
  );

  const formatCurrency = (amount?: number): string => {
    if (typeof amount !== "number") return "$0";
    return amount
      .toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(/\.00$/, "");
  };

  const percentage =
    currentAmount && Target
      ? Math.min(Math.round((currentAmount / Target) * 100), 100)
      : 0;

  const addSavings = () => {
    navigation.navigate("AddSavings");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={categoryName} />

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
          <Text style={styles.goalAmount}>{formatCurrency(Target)}</Text>

          <View style={styles.infoRow}>
            <Ionicons
              name="cash-outline"
              size={16}
              color={Theme.colors.text}
              style={styles.infoIcon}
            />
            <Text style={styles.infoLabel}>Amount Saved</Text>
          </View>
          <Text style={styles.savedAmount}>
            {formatCurrency(currentAmount)}
          </Text>

          <View style={styles.categoryIconWrapper}>
            <View style={styles.categoryIconContainer}>
              <ProgressCircle
                progress={percentage}
                categoryName={categoryName}
                icon={Icon}
              />
            </View>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <ProgressBar
            percentage={percentage}
            amount={Target || 0}
            color={Theme.colors.primary}
          />

          <View style={styles.statusContainer}>
            <Ionicons
              name="checkbox-outline"
              size={14}
              color={Theme.colors.text}
            />
            <Text style={styles.statusText}>
              {percentage}% Of Your Goal,{" "}
              {percentage < 50 ? "Keep Going!" : "Looks Good."}
            </Text>
          </View>
        </View>

        <ScrollView style={styles.transactionList}>
          {Object.keys(groupedDeposits).map((month) => (
            <View key={month} style={styles.monthSection}>
              <Text style={styles.monthTitle}>{month}</Text>

              {groupedDeposits[month].map((deposit: IDeposit) => {
                const date = dayjs.utc(deposit.created_at).local();
                const formattedDate = date.format("DD MMM");
                const formattedTime = date.format("hh:mm A");

                return (
                  <TransactionItem
                    key={deposit.id}
                    id={deposit.id}
                    title={`${deposit.title} `}
                    subtitle={`${formattedDate} at ${formattedTime}`}
                    amount={deposit.amount}
                    icon={Icon}
                    iconBgColor={Theme.colors.accentLight}
                    isDeposit={true}
                  />
                );
              })}
            </View>
          ))}
        </ScrollView>

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
