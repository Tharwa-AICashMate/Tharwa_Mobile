import { StyleSheet, I18nManager } from "react-native";
import i18next from "./../../../services/i18next";
import Theme from '@/theme';
const isRTL = i18next.language === 'ar' || I18nManager.isRTL;
console.log(isRTL)

export default StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
   calendarIcon: {
    marginRight: 20,
  },

});