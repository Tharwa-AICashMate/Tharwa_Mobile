import React, { useEffect, useState } from "react";
import { View, Text, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Theme from "@/theme";
import { styles } from "./styles";
import { useTranslation } from "react-i18next";
import { supabase } from "@/utils/supabase";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getWeeklyHighs } from "@/redux/slices/financeSlice";

interface QuickStatsCardProps {
  style?: ViewStyle;
}

interface WeeklyHighs {
  highest_income: { amount: number; title: string } | null;
  highest_expense: { amount: number; category_name: string } | null;
}

const QuickStatsCard: React.FC<QuickStatsCardProps> = ({ style }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const weeklyHighlights = useAppSelector(
    (state) => state.finance.weeklyHighlights
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
      dispatch(getWeeklyHighs());
  }, []);
  //console.log("------", weeklyHighlights);
  const { highest_income: maxIncome, highest_expense: maxExpense } =
    weeklyHighlights || {};

  return (
    <View style={[styles.card, style]}>
      <Text style={[styles.title, { textAlign: isRTL ? "right" : "left" }]}>
        {t("home.quickStats.weeklyHighlights")}
      </Text>
      <View style={styles.statsContainer}>
        {/* Highest Income */}
        <View
          style={[
            styles.stat,
            { flexDirection: isRTL ? "row-reverse" : "row" },
          ]}
        >
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="trending-up"
              size={18}
              color={Theme.colors.accent}
            />
          </View>
          <View
            style={[
              styles.statContent,
              { alignItems: isRTL ? "flex-end" : "flex-start" },
            ]}
          >
            <Text
              style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}
            >
              {t("home.quickStats.highestIncome")}
            </Text>
            <View style={{ flexDirection: isRTL ? "row-reverse" : "row" }}>
              <Text style={[styles.amount]}>
                {maxIncome?.amount && maxIncome.amount > 0
                  ? `${maxIncome.amount.toFixed(2)}`
                  : `0.00`}
              </Text>
              <Text style={[styles.amount]}> {t("home.currencySymbol")}</Text>
            </View>
            <Text
              style={[
                styles.description,
                { textAlign: isRTL ? "right" : "left" },
              ]}
            >
              {maxIncome?.title || t("home.quickStats.noHighlights")}
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Highest Expense */}
        <View
          style={[
            styles.stat,
            { flexDirection: isRTL ? "row-reverse" : "row" },
          ]}
        >
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="trending-down"
              size={18}
              color={Theme.colors.accentDark}
            />
          </View>
          <View
            style={[
              styles.statContent,
              { alignItems: isRTL ? "flex-end" : "flex-start" },
            ]}
          >
            <Text
              style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}
            >
              {t("home.quickStats.highestExpense")}
            </Text>
            <View style={{ flexDirection: isRTL ? "row-reverse" : "row" }}>
              <Text
                style={[styles.amount, { textAlign: isRTL ? "right" : "left" }]}
              >
                {maxExpense?.amount && maxExpense.amount > 0
                  ? `${isRTL?'':'-'} ${maxExpense?.amount.toFixed(2)} ${isRTL?'-':''}`
                  : `0.00`}
              </Text>
              <Text style={[styles.amount]}> {t("home.currencySymbol")}</Text>
            </View>
            <Text
              style={[
                styles.description,
                { textAlign: isRTL ? "right" : "left" },
              ]}
            >
              {maxExpense?.category_name || t("home.quickStats.noHighlights")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default QuickStatsCard;
