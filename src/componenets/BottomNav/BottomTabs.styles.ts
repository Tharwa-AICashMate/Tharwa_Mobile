import { StyleSheet } from 'react-native';
import Theme from '@/theme';
const styles = StyleSheet.create({
    activeTabIcon: {
      backgroundColor: Theme.colors.primary,
      borderRadius: 22,
      padding: 13,
      justifyContent: 'center',
      alignItems: 'center',
      minWidth: 55,
      minHeight: 55,
    },
  });

  export default styles