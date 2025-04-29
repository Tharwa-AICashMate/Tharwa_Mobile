import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Theme from "@/theme";
import BalanceDisplay from "@/componenets/BalanceDisplay";
import ProgressBar from "@/componenets/ProgressBar";
import styles from "./styles"; // Assuming the styles are shared
import { useAppSelector } from "@/redux/hook";

const ExpenseBrief: React.FC = () => {
  const balance = useAppSelector((state) => state.auth.user?.balance) || 0;
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  );
  const totalExpenses = transactions?.reduce(
    (total, ele) => (total += ele.type == "expense" ? ele.amount : 0),
    0
  );

  const percentage = balance ? (totalExpenses / balance) * 100 : 0;
  return (
    <View style={{marginBottom:30}}>
      <View style={styles.budgetContainer}>
        <BalanceDisplay balance={balance - totalExpenses} expense={totalExpenses} />
      </View>

      <View style={styles.budgetContainer}>
        <View style={styles.progressContainer}>
          <ProgressBar percentage={percentage?.toFixed(2)} amount={balance || 0} />
        </View>
        <View style={styles.budgetStatus}>
          <Ionicons
            name="checkbox-outline"
            size={16}
            color={Theme.colors.text}
          />
          <Text style={styles.budgetStatusText}>
            {percentage?.toFixed(2)}% Of Your Expenses, Looks{" "}
            {percentage < 50 ? "Good" : "Bad"}.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ExpenseBrief;
