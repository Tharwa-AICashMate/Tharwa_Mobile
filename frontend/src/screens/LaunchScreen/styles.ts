import Theme from "@/theme";
import { Dimensions, StyleSheet } from "react-native";
const { height, width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    height: height,
    width: width,
    zIndex: 10,
    backgroundColor: Theme.colors.highlight,
  },
  ContentContainer: {
    flex: 1,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  splashScreen: {
    position: "absolute",
    top: 0,
    height: height,
    backgroundColor: Theme.colors.highlight,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 52,
    fontFamily: Theme.typography.fonts.poppins.semiBold,
    color: "#fff",
  },
  loginContainer: {
    height: "65%",
    backgroundColor: Theme.colors.background,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
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
  noInternet:{
    color: Theme.colors.accentDark,
    fontSize: 14,
  }


});

export default styles;
