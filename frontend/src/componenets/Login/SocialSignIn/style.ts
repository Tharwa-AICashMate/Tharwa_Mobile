import Theme from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  linkText: {
    color: Theme.colors.textLight,
    fontFamily: Theme.typography.fonts.leagueSpartan.light,
    fontSize: 14,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  socialIcon: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
});

export default styles;
