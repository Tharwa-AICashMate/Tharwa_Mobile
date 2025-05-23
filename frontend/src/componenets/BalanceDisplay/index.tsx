import React from "react";
import { View, Text } from "react-native";
import styles from "./style";
import { useTranslation } from "react-i18next";

interface BalanceDisplayProps {
  balance?: number;
  expense?: number;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({
  balance = 0,
  expense = 0,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.rowContainer,
          { flexDirection: isRTL ? "row-reverse" : "row" },
        ]}
      >
        {/* Balance Section */}
        <View
          style={[
            styles.section,
            isRTL ? { paddingLeft: 10 } : { paddingRight: 10 },
          ]}
        >
          <Text style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}>
            {t("balanceDisplay.totalBalance")}
          </Text>
          <View style={{ flexDirection: isRTL ? "row-reverse" : "row" }}>
            <Text
              style={[
                styles.balanceAmount,
                { textAlign: isRTL ? "right" : "left" },
              ]}
            >
              {balance.toFixed(2)}
            </Text>
            <Text
              style={[
                styles.balanceAmount,
                { textAlign: isRTL ? "right" : "left" },
              ]}
            >
              {" "}
              {t("home.currencySymbol")}
            </Text>
          </View>
        </View>

        {/* Divider Line */}
        <View style={styles.divider} />

        {/* Expense Section */}
        <View
          style={[
            styles.section,
            isRTL ? { paddingRight: 10 } : { paddingLeft: 10 },
          ]}
        >
          <Text style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}>
            {t("balanceDisplay.totalExpense")}
          </Text>
          <View style={{ flexDirection: isRTL ? "row-reverse" : "row" }}>
            <Text
              style={[
                styles.expenseAmount,
                { textAlign: isRTL ? "right" : "left" },
              ]}
            >
              {expense.toFixed(2)}
            </Text>
            <Text
              style={[
                styles.expenseAmount,
                { textAlign: isRTL ? "right" : "left" },
              ]}
            >
              {" "}
              {t("home.currencySymbol")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BalanceDisplay;
