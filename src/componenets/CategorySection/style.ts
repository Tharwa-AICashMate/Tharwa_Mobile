import { StyleSheet } from "react-native";
import Theme from "@/theme";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  categoryBox: {
    marginTop:20,
    backgroundColor: Theme.colors.accentLight ,
    borderRadius: 20,
    width: '100%',
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    color: Theme.colors?.text ,
    fontWeight: "600",
    textAlign: "center",
    fontSize: 12,
    marginTop: 2,
    paddingHorizontal: 4,
  },
});

export default styles;