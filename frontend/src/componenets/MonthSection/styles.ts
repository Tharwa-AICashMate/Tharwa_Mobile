import { StyleSheet } from "react-native";

import Theme from "@/theme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
    boxShadow: "0 1 3 #ccc",
  },
  containerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Theme.colors.text,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
});

export default styles;
