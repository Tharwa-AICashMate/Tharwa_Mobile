import { StyleSheet } from "react-native";
import Theme from "@/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.highlight,
  },
  scrollContent: {
    flex:1
  },
  contentBox: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  budgetContainer: {
    borderRadius: 12,
    padding: 7,
  },
  progressContainer: {},
  budgetStatus: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  budgetStatusText: {
    marginLeft: 5,
    fontSize: Theme.typography.size.xs,
    color: Theme.colors?.text,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
    paddingTop: 16,
  },
  addExpenseContainer: {
    backgroundColor: Theme.colors.background,
  },
  addButton: {
    backgroundColor: Theme.colors.primary,
    marginHorizontal: "auto",
    marginVertical: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: "auto",
    alignItems: "center",
  },
  addButtonText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default styles;
