import Theme from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    loginScreenContainer: {
      width: 280,
      alignItems: "center",
    },
    title: {
      fontSize: 52,
      fontFamily: Theme.typography.fonts.poppins.semiBold,
      color: Theme.colors.highlight,
      marginBottom: 0,
    },
    subtitle: {
      textAlign: "center",
      color: Theme.colors.text,
      fontFamily: Theme.typography.fonts.leagueSpartan.regular,
      fontSize: Theme.typography.size.xs,
      marginBottom: 50,
    },
    primaryButton: {
      backgroundColor: Theme.colors.highlight,
      borderRadius: 30,
      paddingVertical: 14,
      width: "100%",
      alignItems: "center",
      marginBottom: 15,
    },
    primaryButtonText: {
      color: Theme.colors.textLight,
      fontFamily: Theme.typography.fonts.poppins.semiBold,
      fontSize: Theme.typography.size.sm,
    },
    secondaryButton: {
      backgroundColor: "#E5E5E5",
      borderRadius: 30,
      paddingVertical: 14,
      width: "100%",
      alignItems: "center",
      marginBottom: 15,
    },
    secondaryButtonText: {
      color: Theme.colors.textDark,
      fontFamily: Theme.typography.fonts.poppins.semiBold,
      fontSize: Theme.typography.size.sm,
    },
    forgotText: {
      color: Theme.colors.textLight,
      fontSize: 14,
    },
    container: {
      flex: 1,
      backgroundColor: Theme.colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
    },
  });
  
  export default styles