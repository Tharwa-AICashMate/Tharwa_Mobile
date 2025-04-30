import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Theme from "@/theme";
import { useAppSelector } from "@/redux/hook"; // Use your Redux hook

// Import the transaction type
import { Transaction } from "@/types/transactionTypes";

// Define the component props
type QuickStatsCardProps = {
  style?: ViewStyle;
};

const QuickStatsCard: React.FC<QuickStatsCardProps> = ({ style }) => {
  const transactions = useAppSelector(
    (state) => state.transactions.transactions
  );

  // Helper function to filter transactions for the current week
  const getMaxTransactionForWeek = (transactions: Transaction[]) => {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of the week (Sunday)
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date();
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week (Saturday)
    endOfWeek.setHours(23, 59, 59, 999);

    const transactionsThisWeek = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.created_at);
      return transactionDate >= startOfWeek && transactionDate <= endOfWeek;
    });

    const maxIncome = transactionsThisWeek
      .filter((t) => t.type === "income")
      .reduce((max, t) => (t.amount > max.amount ? t : max), {
        amount: 0,
      } as Transaction);

    const maxExpense = transactionsThisWeek
      .filter((t) => t.type === "expense")
      .reduce((max, t) => (t.amount > max.amount ? t : max), {
        amount: 0,
      } as Transaction);

    return { maxIncome, maxExpense };
  };

  const { maxIncome, maxExpense } = getMaxTransactionForWeek(transactions);

  return (
    <View style={[styles.card, style]}>
      <Text style={styles.title}>Weekly Highlights</Text>
      <View style={styles.statsContainer}>
        {/* Highest Income */}
        <View style={styles.stat}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="trending-up"
              size={18}
              color={Theme.colors.primary}
            />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.label}>Highest Income</Text>
            <Text style={styles.amount}>
              {maxIncome.amount > 0 ? `$${maxIncome.amount.toFixed(2)}` : "-"}
            </Text>
            <Text style={styles.description}>
              {maxIncome.category_name || "No weekly highlights yet"}
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Highest Expense */}
        <View style={styles.stat}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="trending-down"
              size={18}
              color={Theme.colors.accentDark}
            />
          </View>
          <View style={styles.statContent}>
            <Text style={styles.label}>Highest Expense</Text>
            <Text style={styles.amount}>
              {maxExpense.amount > 0
                ? `-$${maxExpense.amount.toFixed(2)}`
                : "-"}
            </Text>
            <Text style={styles.description}>
              {maxExpense.category_name || "No weekly highlights yet"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.background,
    borderRadius: 12,
    padding: 12,
    width: 350,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: Theme.colors.textDark,
  },
  statsContainer: {
    flexDirection: "row",
  },
  stat: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Theme.colors.secondery,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  statContent: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: Theme.colors.text,
    marginBottom: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: Theme.colors.textDark,
    marginBottom: 2,
  },
  description: {
    fontSize: 12,
    color: Theme.colors.text,
  },
  divider: {
    width: 1,
    backgroundColor: Theme.colors.textLight,
    marginHorizontal: 12,
  },
});

export default QuickStatsCard;
