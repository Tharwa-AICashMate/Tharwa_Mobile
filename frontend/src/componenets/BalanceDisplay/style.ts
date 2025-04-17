import Theme from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 16,
    minHeight: 100,
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: Theme.colors.textLight,
  },
  label: {
    fontSize: 14,
    color: Theme.colors.textLight,
    marginBottom: 4,
    fontFamily: 'Inter-Medium',
  },

  balanceAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.colors.background,
    fontFamily: 'Inter-Bold',
  },
  expenseAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: Theme.colors.textDark,
    fontFamily: 'Inter-Bold',
  },
});
export default styles