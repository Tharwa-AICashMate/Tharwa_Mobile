import Theme from "@/theme";
import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create(
  {
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
      width: "80%",
      backgroundColor: "white",
      borderRadius: 10,
      padding: 30,
      alignItems: "center",
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
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 15,
    },
    inputContainer: {
      width: "100%",
      marginBottom: 15,
    },
    input: {
      width: "100%",
      height: 40,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      paddingHorizontal: 10,
      backgroundColor: "#f0f0f0",
    },
    saveButton: {
      width: "100%",
      backgroundColor: Theme.colors.primary,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      alignItems: "center",
    },
    saveButtonText: {
      color: "white",
      fontWeight: "bold",
    },
    cancelButton: {
      width: "100%",
      backgroundColor: "#f0f0f0",
      borderRadius: 5,
      padding: 10,
      alignItems: "center",
    },
    cancelButtonText: {
      color: Theme.colors.text,
    },
  }
) 

