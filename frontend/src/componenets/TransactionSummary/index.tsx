import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getCurrentUserId } from "@/utils/auth";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Theme from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { apiBase } from "@/utils/axiosInstance";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setUserBalance } from "@/redux/slices/AuthSlice";
import {
  fetchFinanceData,
  updateBalance,
  updateIncome,
} from "@/redux/slices/financeSlice";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";


interface TransactionSummaryProps {
  activeTab: "all" | "income" | "expense" | null;
  onSelectTab: (tab: "all" | "income" | "expense") => void;
}

const TransactionSummary: React.FC<TransactionSummaryProps> = ({
  activeTab = null,
  onSelectTab,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [modalVisible, setModalVisible] = useState(false);
  const [modalIncomeVisible, setModalIncomeVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputIncomeValue, setInputIncomeValue] = useState("");
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { balance, expenses, income, savings } = useAppSelector(
    (state) => state.finance
  );

  useEffect(() => {
    async function fetchAll() {
      const userId = await getCurrentUserId();
      dispatch(fetchFinanceData(userId));
      //dispatch(fetchBalance(userId));
    }
    fetchAll();
  }, [dispatch]);

  const availableBalance = balance - expenses - savings + income;

  // Format numbers in Arabic
  // const formatNumber = (number: number) => {
  //   return new Intl.NumberFormat('ar', { style: 'decimal',minimumFractionDigits: 0, }).format(number);
  // };

  const handleSaveBalance = async () => {
    const parsed = parseFloat(inputValue);
    if (isNaN(parsed)) return;
    try {
      const user_id = await getCurrentUserId();
      const url = balance
        ? `${apiBase}/api/balances/user/${user_id}`
        : `${apiBase}/api/balances`;
      const method = balance ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, balance_limit: parsed }),
      });

      if (!response.ok) throw new Error("Failed to save balance");

      const data = await response.json();
      dispatch(setUserBalance(data.balance_limit || parsed));
      dispatch(updateBalance(data.balance_limit || parsed));
    } catch (error) {
      console.log("Error saving balance:", error);
    } finally {
      setModalVisible(false);
    }
  };

  const handleSaveIncome = async () => {
    const parsedIncome = parseFloat(inputIncomeValue);
    if (isNaN(parsedIncome)) return;
    try {
      const user_id = await getCurrentUserId();
      const url = `${apiBase}/income/${user_id}`;
      const method = income == null ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, income: parsedIncome }),
      });

      if (!response.ok) throw new Error("Failed to save income");

      dispatch(updateIncome(parsedIncome));
    } catch (error) {
      console.log("Error saving income:", error);
    } finally {
      setModalIncomeVisible(false);
    }
  };

  const handleAddExpense = () => {
    navigation.navigate("AddExpensesScreen");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.balanceContainer}
        onPress={() => onSelectTab("all")}
      >
        <Text style={styles.balanceLabel}>{t("transactionScreen.transactionSummary.totalBalance")}</Text>
        <Text style={styles.balanceAmount}>{availableBalance.toFixed(2)}</Text>
      </TouchableOpacity>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "income" && styles.activeTab]}
          onPress={() => onSelectTab("income")}
        >
          <MaterialCommunityIcons
            name="arrow-top-right-bold-box-outline"
            size={24}
            color={activeTab === "income" ? "#fff" : Theme.colors.primary}
          />
          <Text style={[styles.tabLabel, activeTab === "income" && styles.activeTabText]}>
            {t("transactionScreen.transactionSummary.income")}
          </Text>
          <Text style={[styles.tabAmount, activeTab === "income" && styles.activeTabText]}>
            {income.toFixed(2)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "expense" && styles.activeTab]}
          onPress={() => onSelectTab("expense")}
        >
          <MaterialCommunityIcons
            name="arrow-bottom-left-bold-box-outline"
            size={24}
            color={activeTab === "expense" ? "#fff" : "#202063"}
          />
          <Text style={[styles.tabLabel, activeTab === "expense" && styles.activeTabText]}>
            {t("transactionScreen.transactionSummary.expense")}
          </Text>
          <Text style={[styles.tabAmount, activeTab === "expense" && styles.activeTabText]}>
            {expenses.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "all" && (
        <View style={styles.addExpenseContainer}>
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.addButtonText}>{t("transactionScreen.transactionSummary.editBalance")}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* {activeTab === "income" && (
        <View style={styles.addExpenseContainer}>
          <TouchableOpacity style={styles.addButton} onPress={() => setModalIncomeVisible(true)}>
            <Text style={styles.addButtonText}>{t("transactionScreen.transactionSummary.editIncome")}</Text>
          </TouchableOpacity>
        </View>
      )} */}

      {activeTab === "expense" && (
        <View style={styles.addExpenseContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
            <Text style={styles.addButtonText}>{t("transactionScreen.transactionSummary.addExpense")}</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{t("transactionScreen.transactionSummary.enterBalance")}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={inputValue}
              onChangeText={setInputValue}
              placeholder={t("transactionScreen.transactionSummary.enterAmount")}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelText}>{t("transactionScreen.common.cancel")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveBalance} style={styles.saveButton}>
                <Text style={styles.saveText}>{t("transactionScreen.common.save")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent visible={modalIncomeVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{t("transactionScreen.transactionSummary.enterIncome")}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={inputIncomeValue}
              onChangeText={setInputIncomeValue}
              placeholder={t("transactionScreen.transactionSummary.enterAmount")}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => setModalIncomeVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelText}>{t("transactionScreen.common.cancel")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveIncome} style={styles.saveButton}>
                <Text style={styles.saveText}>{t("transactionScreen.common.save")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default TransactionSummary;