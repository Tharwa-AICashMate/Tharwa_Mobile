import Theme from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: Theme.colors.text,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: Theme.colors.text,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    color: Theme.colors.text,
  },
  iconPreviewContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  selectedIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  selectedIconName: {
    fontSize: 14,
    color: Theme.colors.text,
  },
  iconsScrollView: {
    maxHeight: 200,
    marginBottom: 20,
  },
  iconsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  iconOption: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedIconOption: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 0,
    margin: 0,
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#F0F0F0",
  },
  saveButton: {
    backgroundColor: Theme.colors.primary,
  },
  disabledButton: {
    backgroundColor: "#CCCCCC",
    opacity: 0.7,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Theme.colors.text,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  inputError: {
    borderColor: "red",
  },
  iconOptionError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
  charCounter: {
    fontSize: 12,
    color: Theme.colors.textLight,
    alignSelf: "flex-end",
    marginBottom: 8,
  },
});
