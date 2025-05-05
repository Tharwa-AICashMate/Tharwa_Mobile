import Theme from "@/theme";
import { StyleSheet, I18nManager } from "react-native";
import i18next from "../../../../services/i18next";
const isRTL = i18next.language === 'ar' || I18nManager.isRTL;
console.log(isRTL)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
    alignItems: "center",
  },
  header: {
    justifyContent: "center",
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    color: Theme.colors.textLight,
    fontFamily: Theme.typography.fonts.poppins.semiBold,
    fontSize: 30,
  },
  form: {
    height: "80%",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: Theme.colors.background,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    padding: 30,
  },

  primaryButton: {
    backgroundColor: Theme.colors.highlight,
    borderRadius: 30,
    paddingVertical: 8,
    width: 207,
    alignItems: "center",
    marginTop: 20,
  },
  primaryButtonText: {
    color: Theme.colors.textLight,
    fontFamily: Theme.typography.fonts.poppins.semiBold,
    fontSize: Theme.typography.size.sm,
  },
  secondaryButton: {
    backgroundColor: "#E5E5E5",
    borderRadius: 30,
    paddingVertical: 8,
    width: 207,
    alignItems: "center",
    marginBottom: 15,
  },
  secondaryButtonText: {
    color: Theme.colors.textDark,
    fontFamily: Theme.typography.fonts.poppins.semiBold,
    fontSize: Theme.typography.size.sm,
  },
  forgotText: {
    margin: 13,
    color: Theme.colors.textLight,
    fontSize: 14,
  },
  fingerprintButton: {
    alignItems: "center",
    marginVertical: 10,
  },
  fingerprintText: {
    color: Theme.colors.textDark,
    fontFamily: Theme.typography.fonts.poppins.semiBold,
    fontSize: 14,
  },
  socialIcons: {
    flexDirection:"row",
    justifyContent: "center",
    marginVertical: 20,
  },
  socialIcon: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  link: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
  },
  linkText: {
    color: Theme.colors.textLight,
    fontFamily: Theme.typography.fonts.leagueSpartan.light,
    fontSize: 14,
  },
  linkButton: {
    color: Theme.colors.accent,
    fontFamily: Theme.typography.fonts.leagueSpartan.light,
  },
  termsContainer: {
    flexDirection: "row",
    width: "70%",
  },
  termsText: {
    textAlign: "center",
    flex: 1,
    color: Theme.colors.text,
    fontSize: 14,
  },
  termsLink: {
    color: Theme.colors.text,
    fontWeight: "bold",
  },
  scrollContainer: {
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: 30,
  },
  pinContainer: {
    alignItems: "center",
    marginBottom: 40,
  },

  pinDots: {
    flexDirection:"row",
  },
  pinDot: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    borderWidth: 2,
    borderColor: Theme.colors.highlight,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  pinDotActive: {
    backgroundColor:  Theme.colors.accentLight,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    height: 0,
    width: 0,
  },
  char: {
    color: Theme.colors.textLight,
  },
  errorText: {
    color: Theme.colors.highlight,
    fontFamily:Theme.typography.fonts.poppins.bold,
    fontSize: 14,
    marginLeft:20,
    marginTop: 5,
  },
});

export default styles;


