import Theme from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
