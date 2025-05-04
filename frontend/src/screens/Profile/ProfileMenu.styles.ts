import { I18nManager, StyleSheet } from 'react-native';
import Theme from '@/theme';
import i18next from 'i18next';

const useDynamicStyles = () => {
  const isRTL = i18next.language === 'ar' || I18nManager.isRTL;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Theme.colors.highlight,
    },
    scrollContent: {
      flexGrow: 1,
      direction: isRTL ? 'rtl' : 'ltr',
      writingDirection: isRTL ? 'rtl' : 'ltr',
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
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      width: '80%',
      direction: isRTL ? 'rtl' : 'ltr',
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
    iconWrapper: {
      backgroundColor: '#00aaff',
      padding: 10,
      borderRadius: 30,
      marginRight: isRTL ? 0 : 15,
      marginLeft: isRTL ? 15 : 0,
    },
    menuText: {
      fontSize: 16,
      fontWeight: '600',
      color: Theme.colors.textLight,
      textAlign: isRTL ? 'right' : 'left',
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
  });
};

export default useDynamicStyles;
