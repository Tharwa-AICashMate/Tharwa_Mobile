import { StyleSheet } from 'react-native';
import Theme from '@/theme';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Theme.colors.highlight,
    },
    contentBox: {
      flex: 1,
      backgroundColor: Theme.colors.background,
      borderTopLeftRadius: 60,
      borderTopRightRadius: 60,
      paddingVertical: 30,
      paddingHorizontal: 25,
    },
    title: {
      fontSize: 20,
      fontWeight: '800',
      marginBottom: 30,
      color:Theme.colors.textLight
    },
    option: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 18,
      borderBottomWidth: 1,
      borderBottomColor: '#E2F4E7',
      marginBottom: 10,
    },
    optionText: {
      fontSize: 15,
      color: Theme.colors.textLight,
      fontWeight: '600',
    },
  });

  export default styles