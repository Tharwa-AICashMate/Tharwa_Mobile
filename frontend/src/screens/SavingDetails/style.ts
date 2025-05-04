import Theme from "@/theme";
import { StyleSheet, I18nManager } from "react-native";
import i18next from "./../../../services/i18next";
const isRTL = i18next.language === 'ar' || I18nManager.isRTL;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
  },
  goalCard: {
    
    borderRadius: 16,
    padding: 20,
    margin: 16,
    position: 'relative',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoIcon: {
    marginRight: 6,
  },
  infoLabel: {
    fontSize: 12,
  
  },
  goalAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Theme.colors.text,
    marginBottom: 14,
  },
  savedAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    marginBottom: 10,
  },
  categoryIconWrapper: {
    position: 'absolute',
    right: 20,
    top: '40%',
    marginTop: -20,
  },
  categoryIconContainer: {
    width: 125,
    height: 120,
    borderRadius: 20,
    backgroundColor: Theme.colors.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryLabel: {
    fontSize: Theme.typography.size.xxs,
    color: Theme.colors.background,
    marginTop: 4,
  },
  progressContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  progressBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  statusContainer: {
    flexDirection: isRTL?'row-reverse':'row',
    alignItems: 'center',
    justifyContent:"center",
    marginTop:10
  },
  statusText: {
    marginLeft: 6,
    fontSize: Theme.typography.size.xs,
    color: '#555555',
    textAlign:"center"
  },
  depositsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  monthHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  monthHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
  calendarIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  depositItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  depositIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  depositInfo: {
    flex: 1,
  },
  depositTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Theme.colors.text,
  },
  depositTime: {
    fontSize: 11,
    color:Theme.colors.textLight,
    marginTop: 4,
  },
  depositAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  addButtonContainer: {
    padding: 16,
  },
  goalContainer:{
    backgroundColor:Theme.colors.background,
    flex:1,
    marginTop:30,
    borderTopRightRadius:50,
    borderTopLeftRadius:50
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
  transactionList: {
    direction:isRTL?'rtl':'ltr',
    flex: 1,
    backgroundColor: Theme.colors.background,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  monthSection: {
    marginBottom: 20,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Theme.colors.text,
  },
  addSavingContainer:{
    backgroundColor: Theme.colors.background,
  
    
  },
  addButton: {
    backgroundColor: Theme.colors.primary,
    marginHorizontal: 'auto',
    marginVertical: 15,
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

});
export default styles