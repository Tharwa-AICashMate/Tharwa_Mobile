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
  loadingSpinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,  
  },
  removeCategoryButton: {
    position: "absolute",
    top: 5,
    right: 15,
    zIndex: 1,
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
    alignItems: "center", 
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
    height: 85,
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

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },

  budgetContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: Theme.colors.text,
    fontSize: 16,
  },
  sectionLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200, 
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
    height: 25,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
