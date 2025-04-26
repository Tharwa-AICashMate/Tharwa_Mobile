import { StyleSheet } from 'react-native';
import Theme from '@/theme';
const styles = StyleSheet.create({
    header: {
      height: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 10,
      marginVertical: 20,
    },
    bellIcon: {
      backgroundColor: Theme.colors.secondery,
      color:Theme.colors.textLight,
      padding: 4,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      margin:2
    },
    title: {
      color: Theme.colors.textLight,
      fontSize: 20,
      fontWeight: '900',
    },
  });

  export default styles