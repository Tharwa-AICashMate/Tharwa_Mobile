import Theme from "@/theme";
import { StyleSheet } from "react-native";

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
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingBottom: 20,
    
  },
  categoryCard: {
    width: "30%",
    alignItems: "center",
    marginBottom: 20,
    margin:5
  
  },
  categoryIconContainer: {
    width: 80,
    height: 70,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: Theme.colors.accentLight
  },
  categoryName: {
    fontSize: 14,
    color: Theme.colors.text,
    fontWeight: "500",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  budgetContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
export default styles;



