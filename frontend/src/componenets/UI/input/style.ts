import Theme from "@/theme";
import { StyleSheet, I18nManager } from "react-native";
import i18next from "../../../../services/i18next";
const isRTL = i18next.language === 'ar' || I18nManager.isRTL;
console.log(isRTL);
const styles = StyleSheet.create({
  container: {
    direction:isRTL?'rtl':'ltr',
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontFamily: Theme.typography.fonts.poppins.medium,
    color: Theme.colors.textLight,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  inputContainer: {
    flexDirection: isRTL? "row-reverse": "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: Theme.colors.secondery,
    borderRadius: 18,
    height: 41,
    paddingHorizontal: 20,
  },
  input: {
    textAlign:isRTL?'right':'left',
    paddingVertical: 10,
    paddingRight: 20,
    flex: 1,
    fontSize: 16,
    width: "100%",
    color: Theme.colors.text
  },
  iconContainer: {
    position: "absolute",
    right: isRTL? "100%": 0,
    paddingHorizontal: 10,
  },
  errorText: {
    color: Theme.colors.highlight,
    fontFamily: Theme.typography.fonts.poppins.bold,
    fontSize: 14,
    marginLeft: 20,
    marginTop: 5,
  },
});

export default styles;
