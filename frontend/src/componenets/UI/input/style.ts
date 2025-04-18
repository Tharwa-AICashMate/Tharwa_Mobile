import Theme from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
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
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: Theme.colors.secondery,
    borderRadius: 18,
    height: 41,
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 10,
    paddingRight: 20,
    flex: 1,
    fontSize: 16,
    width: "100%",
    color: Theme.colors.text,
    textAlign: Theme.typography.direction || "left",
  },
  iconContainer: {
    position: "absolute",
    right: 0,
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
