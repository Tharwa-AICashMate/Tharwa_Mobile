import React, { useEffect, useState } from "react";
import { View, Text ,Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Theme from "@/theme";
import BalanceDisplay from "@/componenets/BalanceDisplay";
import ProgressBar from "@/componenets/ProgressBar";
import styles from "./styles";
import { getCurrentUserId } from "@/utils/auth";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchBalance, fetchFinanceData } from "@/redux/slices/financeSlice";
import { useTranslation } from "react-i18next";

interface ExpenseBriefProps {
  setTotalBalance?: (balance: number) => void;
}

const ExpenseBrief: React.FC<ExpenseBriefProps> = ({ setTotalBalance }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [alertShown, setAlertShown] = useState(false);

  const dispatch = useAppDispatch();
  const { balance, expenses, income, savings, loading, error } = useAppSelector(
    (state) => state.finance
  );

  useEffect(() => {
    async function fetchAll() {
      const userId = await getCurrentUserId();
      dispatch(fetchFinanceData(userId));
      dispatch(fetchBalance(userId));
      if (setTotalBalance) setTotalBalance(balance);
    }

    fetchAll();
  }, [dispatch]);

  const availableBalance = balance - expenses - savings + income;
  const percentage = availableBalance ? (expenses / (balance + income - savings)) * 100 : 0;
  const percentageText = percentage.toFixed(2) 
  useEffect(() => {
    if ((percentage > 50 && !alertShown) && (availableBalance> 0 && expenses > 0)) {
      Alert.alert(
        t('expenseBrief.alertTitle'),
        t('expenseBrief.alertMessage', { percentage: percentageText }),
        [{ text: t('common.ok'), onPress: () => setAlertShown(true) }]
      );
    } else if (percentage <= 50) {
      setAlertShown(false);
    }
  }, [percentage, alertShown, percentageText]);
  return (
    <View style={{ marginBottom: 30 }}>
      <View style={styles.budgetContainer}>
        <BalanceDisplay balance={availableBalance} expense={expenses} />
      </View>

      <View style={styles.budgetContainer}>
        <View style={styles.progressContainer}>
          <ProgressBar
            percentage={parseFloat(percentage.toFixed(2))}
            amount={availableBalance || 0}
          />
        </View>

        <View style={[
          styles.budgetStatus,
          { flexDirection: isRTL ? 'row-reverse' : 'row' }
        ]}>
          <Ionicons
            name="checkbox-outline"
            size={16}
            color={Theme.colors.text}
          />
          <Text style={styles.budgetStatusText}>
            {t('expenseBrief.statusMessage', {
              percentage: percentageText,
              status: percentage < 50 ? t('expenseBrief.good') : t('expenseBrief.bad')
            })}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ExpenseBrief;
