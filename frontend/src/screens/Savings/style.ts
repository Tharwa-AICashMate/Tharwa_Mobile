import Theme from "@/theme";
import { Dimensions, StyleSheet } from "react-native";
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
  budgetContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  categoryCard: {
    width: cardWidth,
    alignItems: "center",
    marginBottom: 20,
  },

  categoryIconContainer: {
    width: 100,
    height: 95,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: Theme.colors.accentLight,
  },

  categoryName: {
    fontSize: 14,
    color: Theme.colors.text,
    fontWeight: "500",
    textAlign: "center",
  },})
  export default styles