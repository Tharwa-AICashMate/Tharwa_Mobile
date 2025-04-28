import Theme from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.secondery,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionDetails: {
    flex: 1,
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
  transactionCategory: {
    fontSize: 14,
    fontWeight: "500",
    color: Theme.colors.textDark,
  },
  transactionTime: {
    fontSize: 12,
    color: Theme.colors.textDark,
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "600",
    width: 80,
    height: 30,
    lineHeight: 30,
    paddingLeft: 15,
    overflow: "hidden",
    color: Theme.colors.accentDark,
  },
  transactionList: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  transactionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Theme.colors.text,
    marginBottom: 4,
  },
  transactionSubtitle: {
    fontSize: 14,
    color: Theme.colors.textLight,
  },

  depositAmount: {
    color: Theme.colors.text,
  },
});
export default styles;
