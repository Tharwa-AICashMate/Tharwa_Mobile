import Theme from "@/theme";
import i18next from "i18next";
import { StyleSheet, Dimensions, I18nManager } from "react-native";

const screenWidth = Dimensions.get("window").width;

const useDynamicStyles = () => {
  const isRTL = i18next.language === 'ar' || I18nManager.isRTL;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Theme.colors.primary,

    },
    baseContainer:{
      flex:1,
      direction: isRTL ? 'rtl' : 'ltr',
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
    balanceContainer: {
      borderRadius: 12,
      padding: 7,
    },
    progressContainer: {
      marginBottom: 24,
    },
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
    categoriesContainer: {
      flex: 1,
      backgroundColor: Theme.colors.background,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      paddingTop: 40,
    },
    budgetContainer: {
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
  });

  return styles;
};

export default useDynamicStyles;
