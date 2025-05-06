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
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: Theme.colors.background,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 40,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  categoryCard: {
    width: cardWidth,
    alignItems: "center",
    marginBottom: 20,
  },

  categoryIconContainer: {
    width: 95,
    height: 90,
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: Theme.colors.text,
    fontSize: 16,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    minHeight: 300,
  },
  emptyStateAddButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 1,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Theme.colors.text,
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 14,
    color: Theme.colors.textDark,
    textAlign: "center",
    maxWidth: "80%",
    lineHeight: 22,
  },
  actionModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionModalContainer: {
    width: "70%",
    backgroundColor: Theme.colors.background,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingVertical: 18,
  },
  actionButtonText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "500",
    color: Theme.colors.text,
  },
  actionDivider: {
    height: 1,
    backgroundColor: Theme.colors.secondery,
  },
  optionsButton: {
    position: "absolute",
    top: 7,
    right: 7,
    width: 20,
    height: 28,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default styles;
