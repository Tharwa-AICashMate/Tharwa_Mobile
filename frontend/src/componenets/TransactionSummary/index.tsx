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
import { fetchBalance } from "../expenceBrief";
import {
  fetchFinanceData,
  selectFinance,
  updateBalance,
  addTransaction,
  updateIncome,
} from "@/redux/slices/financeSlice";

interface TransactionSummaryProps {
  activeTab: "all" | "income" | "expence" | null;
  onSelectTab: (tab: "all" | "income" | "expence") => void;
}

const TransactionSummary: React.FC<TransactionSummaryProps> = ({
  activeTab = null,
  onSelectTab,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalIncomeVisible, setModalIncomeVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputIncomeValue, setInputIncomeValue] = useState("");
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { balance, expenses, income, savings, loading, error } = useAppSelector(
    (state) => state.finance
  );

  useEffect(() => {
    async function fetchAll() {
      const userId = await getCurrentUserId();
      dispatch(fetchFinanceData(userId));
      dispatch(fetchBalance(userId));
    }

    fetchAll();
  }, [dispatch]);

  const availableBalance = balance - expenses - savings + income;

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
      console.error("Error saving balance:", error);
    } finally {
      setModalVisible(false);
    }
  };

  const handleSaveIncome = async () => {
    const parsedIncome = parseFloat(inputIncomeValue);
    console.log(parsedIncome)
    if (isNaN(parsedIncome)) return;

    try {
      const user_id = await getCurrentUserId();
      const url =
        income == null
          ? `${apiBase}/income/${user_id}`
          : `${apiBase}/income/${user_id}`;
      const method = income == null ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, income: parsedIncome }),
      });

      if (!response.ok) throw new Error("Failed to save income");

      const data = await response.json();
      dispatch(updateIncome(parsedIncome));
    } catch (error) {
      console.error("Error saving income:", error);
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
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>
          ${availableBalance?.toFixed(2)}
        </Text>
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
          <Text
            style={[
              styles.tabLabel,
              activeTab === "income" && styles.activeTabText,
            ]}
          >
            Income
          </Text>
          <Text
            style={[
              styles.tabAmount,
              activeTab === "income" && styles.activeTabText,
            ]}
          >
            ${income.toFixed(2)}
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
          <Text
            style={[
              styles.tabLabel,
              activeTab === "expense" && styles.activeTabText,
            ]}
          >
            Expense
          </Text>
          <Text
            style={[
              styles.tabAmount,
              activeTab === "expense" && styles.activeTabText,
            ]}
          >
            ${expenses.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "all" && (
        <View style={styles.addExpenseContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>Edit Balance</Text>
          </TouchableOpacity>
        </View>
      )}

      {activeTab === "incom" && (
        <View style={styles.addExpenseContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalIncomeVisible(true)}
          >
            <Text style={styles.addButtonText}>Edit Income</Text>
          </TouchableOpacity>
        </View>
      )}

      {activeTab === "expence" && (
        <View style={styles.addExpenseContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddExpense}>
            <Text style={styles.addButtonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modals for Balance and Income */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Total Balance</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Enter amount"
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSaveBalance}
                style={styles.saveButton}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent visible={modalIncomeVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Income</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={inputIncomeValue}
              onChangeText={setInputIncomeValue}
              placeholder="Enter amount"
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={() => setModalIncomeVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSaveIncome}
                style={styles.saveButton}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default TransactionSummary;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  balanceContainer: {
    width: "97%",
    height: 80,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    marginLeft: 10,
    padding: 10,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: Theme.colors.background,
    borderRadius: 16,
  },
  tabLabel: {
    fontSize: 14,
    color: "#32325D",
    marginBottom: 4,
  },
  tabAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#32325D",
  },
  activeTab: {
    backgroundColor: "#32325D",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelText: {
    color: "white",
    fontWeight: "bold",
  },
  addExpenseContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: Theme.colors.accentDark,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
