import Theme from "@/theme";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  balanceContainer: {
    borderRadius: 12,
    padding: 12,
  },
  budgetStatus: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  budgetStatusText: {
    marginLeft: 5,
    fontSize: Theme.typography.size.xs,
    color: Theme.colors?.text ,

  },
  transactionList: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.secondery,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionCategory: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.colors.textDark,
  },
  transactionTime: {
    fontSize: 12,
    color: Theme.colors.textDark,
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.accentDark,
  },
  addExpenseContainer:{
    backgroundColor: Theme.colors.background,
  },
  addButton: {
    backgroundColor: Theme.colors.primary,
    marginHorizontal: 'auto',
    marginVertical: 20,
    paddingVertical: 8,
    borderRadius: 30,
    width: '60%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
  progressContainer: {
    marginBottom: 24,
  },
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Theme.colors.textLight,
  },
  budgetContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

    bottomNav: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.background,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.primary,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNavItem: {
    backgroundColor:Theme.colors.primary ,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  noTransactions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  noTransactionsText: {
    fontSize: 16,
    color: Theme.colors.textLight,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyStateAddButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 18,
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
});

export default styles;
