import Theme from "@/theme";
import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 3 - 18; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
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

export default styles;
