import Theme from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  errorText: {
    color: Theme.colors.highlight,
    fontFamily: Theme.typography.fonts.poppins.bold,
    fontSize: 14,
    marginLeft: 20,
    marginTop: 5,
    textAlign: "center",
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
    justifyContent: "center",
    gap: 40,
  },
  saveButton: {
    backgroundColor: Theme.colors.highlight,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  saveText: {
    color: Theme.colors.background,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: Theme.colors.textLight,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelText: {
    color: Theme.colors.background,
    fontWeight: "bold",
  },
});

export default styles;
