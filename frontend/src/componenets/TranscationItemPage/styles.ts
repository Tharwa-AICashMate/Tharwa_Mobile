import { StyleSheet } from "react-native";

import Theme from "@/theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  details: {
    width: 110,
    marginHorizontal: 10,
  },
  seperator: {
    borderRightWidth: 2,
    borderRightColor: Theme.colors.highlight,
    borderLeftColor: Theme.colors.highlight,
    borderLeftWidth: 2,
    width: 100,
    paddingHorizontal: 10,
  },
  category: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontWeight: "500",
    color: "#32325D",
  },
  date: {
    fontSize: 14,
    color: "rgb(32, 32, 99)",
    marginTop: 2,
  },
  amountContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
  },
  expenseAmount: {
    color: "rgb(32, 32, 99)",
  },
  incomeAmount: {
    color: Theme.colors.textDark,
  },
  type: {
    fontSize: 12,
    color: "#A7B0BA",
    marginTop: 2,
  },
});

export default styles;
