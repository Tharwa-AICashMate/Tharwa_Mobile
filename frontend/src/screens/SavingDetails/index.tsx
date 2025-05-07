import React, { useCallback, useEffect } from "react";
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
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import Theme from "@/theme";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import MonthSection from "@/componenets/MonthSection";
import { groupTransactionsByMonth } from "@/utils/helpers";
import { useTranslation } from "react-i18next";

dayjs.extend(utc);

type SavingDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  "SavingDetails"
>;

const SavingDetails: React.FC<SavingDetailsProps> = ({ route, navigation }) => {
  const data = route.params;
  const { t, i18n } = useTranslation();
  const { categoryName, goalID, Target, Icon } = data;
  const dispatch = useAppDispatch();

  const goalIdNumber = Number(goalID);

  const currentAmount = useAppSelector(
    (state) => state.goals.currentAmounts[goalIdNumber]
  );

  const { deposits, loading: isLoading } = useAppSelector(
    (state) => state.deposits
  );

  useFocusEffect(
    useCallback(() => {
      if (goalIdNumber) {
        dispatch(cleargoals());
        dispatch(getDepositsByGoal(goalIdNumber));
        dispatch(fetchGoalCurrentAmount(goalIdNumber));
      }
    }, [dispatch, goalIdNumber])
  );

  useEffect(() => {
    dispatch(fetchGoalCurrentAmount(goalIdNumber));
  }, [deposits]);
  const groupedDeposits = groupTransactionsByMonth(deposits, i18n.language);

  const formatCurrency = (amount?: number): string => {
    if (typeof amount !== "number")
      return t("savingsScreen.currencySymbol") + "0";
    return amount
      .toLocaleString("en-US", {
        style: "decimal",
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
    navigation.navigate("AddSavings", {
      categoryName,
      goalID,
      Target,
      currentAmount,
    });
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
            <Text style={styles.infoLabel}>{t("savingsScreen.goal")}</Text>
          </View>
          <Text style={styles.goalAmount}>{formatCurrency(Target)}</Text>

          <View style={styles.infoRow}>
            <Ionicons
              name="cash-outline"
              size={16}
              color={Theme.colors.text}
              style={styles.infoIcon}
            />
            <Text style={styles.infoLabel}>
              {t("savingsScreen.amountSaved")}
            </Text>
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
              {t("expenseBrief.statusMessage", {
                percentage: percentage,
                status:
                  percentage < 50
                    ? t("expenseBrief.bad")
                    : t("expenseBrief.good"),
              })}
            </Text>
          </View>
        </View>

        <ScrollView style={styles.transactionList}>
          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                minHeight: 200,
              }}
            >
              <ActivityIndicator size="large" color={Theme.colors.primary} />
            </View>
          ) : (
            Object.keys(groupedDeposits).map((month) => (
              <MonthSection
                key={month}
                month={month}
                transactions={groupedDeposits[month]}
                showCategory={false}
                icon={Icon}
              />
            ))
          )}
        </ScrollView>

        <View style={styles.addSavingContainer}>
          <TouchableOpacity style={styles.addButton} onPress={addSavings}>
            <Text style={styles.addButtonText}>
              {t("savingsScreen.addSavings")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SavingDetails;
