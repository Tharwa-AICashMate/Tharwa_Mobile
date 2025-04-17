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
      alignItems: 'center',
      paddingVertical: 30,
      paddingHorizontal: 20,
    },
    fingerprintContainer: {
      alignItems: 'center',
      marginBottom: 40,
    },
    fingerprintName: {
      fontSize: 18,
      fontWeight: 'bold',
      borderRadius: 20,
      marginTop: 40,
      color: '#000',
      backgroundColor: '#DFF7E2',
      paddingVertical: 4,
      paddingHorizontal: 50,
    },
  })

  
  export default styles