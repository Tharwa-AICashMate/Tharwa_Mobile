import React, { useState } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity } from "react-native";
import { getCurrentUserId } from "@/utils/auth";
import { apiBase } from "@/utils/axiosInstance";
import styles from "./styles";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setUserBalance } from "@/redux/slices/AuthSlice";
import { updateBalance, updateGetBalance } from "@/redux/slices/financeSlice";

interface BalanceModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const BalanceModal: React.FC<BalanceModalProps> = ({
  isOpen = false,
  setIsOpen,
}) => {
  const totalBalance = useAppSelector(state => state.auth.user?.balance);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch()
  const handleSaveBalance = async () => {
    const parsed = parseFloat(inputValue);
    if (isNaN(parsed) || parsed <= 0) {
      setError("Enter a valid balance value");
      return;
    }

    try {
      const user_id = await getCurrentUserId();
      const url = totalBalance
        ? `${apiBase}/api/balances/user/${user_id}`
        : `${apiBase}/api/balances`;
      const method = totalBalance ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, balance_limit: parsed }),
      });

      const data = await response.json();
      dispatch(setUserBalance(data.balance_limit ?? parsed));
      dispatch(updateBalance(data.balance_limit??parsed))
      dispatch(updateGetBalance(false))
    } catch (error) {
      console.log("Error saving balance:", error);
    } finally {
      setIsOpen(false);
      setError("");
    }
  };

  const handleCancel = () => {
    if (totalBalance !== null && totalBalance !== undefined)
      setIsOpen(false);
    else
      setError("Enter a valid balance value");
  };

  return (
    <Modal animationType="slide" transparent visible={isOpen}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter Total Balance</Text>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Enter amount"
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSaveBalance} style={styles.saveButton}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BalanceModal;
