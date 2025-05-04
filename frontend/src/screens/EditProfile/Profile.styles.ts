
import { StyleSheet } from 'react-native';
import Theme from '@/theme';
import i18next from 'i18next';
import { I18nManager } from 'react-native';

const isRTL = i18next.language === 'ar' || I18nManager.isRTL;

export const createStyles = (isRTL = false) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Theme.colors.highlight,
    },
    scrollContent: {
      flexGrow: 1,
      paddingTop: 50,
    },
    contentBox: {
      flex: 1,
      backgroundColor: Theme.colors.background,
      borderTopLeftRadius: 60,
      borderTopRightRadius: 60,
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    profileContent: {
      alignItems: 'center',
      marginTop: -70,
      width: '110%',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '800',
      alignSelf: isRTL ? 'flex-end' : 'flex-start',
      marginVertical: 20,
      marginLeft: isRTL ? 0: '10%',
      marginRight: isRTL ? '10%' : 0,
      color: '#000',
      textAlign: isRTL ? 'right' : 'left',
    },
    inputGroup: {
      width: '80%',
      marginBottom: 15,
    },
    inputLabel: {
      fontSize: 15,
      marginBottom: 8,
      fontWeight: '600',
      color: '#333',
      textAlign: isRTL ? 'right' : 'left',
    },
    input: {
      backgroundColor: Theme.colors.secondery,
      borderRadius: 15,
      padding: 12,
      fontSize: 14,
      textAlign: isRTL ? 'right' : 'left',
    },
    switchRow: {
      width: '80%',
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },
    switchLabel: {
      fontSize: 16,
      color: Theme.colors.textLight,
      fontWeight: '500',
      textAlign: isRTL ? 'right' : 'left',
    },
    updateButton:{
      width: '120%',
      alignSelf: 'center',
      marginVertical: 20,
      marginRight: '10%',
      marginLeft: '15%',
    }
  });

export default createStyles;
