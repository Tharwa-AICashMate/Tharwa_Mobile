import React, { useState } from "react";
import { View, Text, StyleSheet,I18nManager } from "react-native";
import { Transaction } from "@/types/transactionTypes";
import Entypo from "@expo/vector-icons/Entypo";
import Theme from "@/theme";
import TransactionItem from "@/componenets/TransactionItem";
import styles from "./styles";
import i18next from "./../../../services/i18next";
interface MonthSectionProps {
  month: string;
  transactions: Transaction[];
  showCategory:boolean, icon?: string
}
const MonthSection: React.FC<MonthSectionProps> = ({ month, transactions,showCategory,icon }) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const isRTL =  i18next.language === 'ar' || I18nManager.isRTL
  const handleToggleMenu = (id: string) => {
    setActiveMenuId((prev) => (prev === id ? null : id));
  };
  //console.log(transactions)
  return (
    <View style={[styles.container, {direction:isRTL?'rtl':'ltr'} ]}>
      <View style={styles.containerTitle}>
        <Text style={styles.monthTitle}>{month}</Text>
        <Entypo
          name="calendar"
          size={24}
          color={Theme.colors.primary}
          style={{ marginRight: 20 }}
        />
      </View>
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.transaction_id}
          transaction={transaction}
          iconBgColor={Theme.colors.accentLight}
          showCategory={showCategory}
                  icon={icon}
          isMenuVisible={activeMenuId === transaction.transaction_id}
          onToggleMenu={handleToggleMenu}
        />
      ))}
    </View>
  );
};

export default MonthSection;
