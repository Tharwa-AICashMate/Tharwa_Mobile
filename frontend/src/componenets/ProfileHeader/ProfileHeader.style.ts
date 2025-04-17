import { StyleSheet } from 'react-native';
import Theme from '@/theme';

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      marginBottom: 20,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    userId: {
      fontSize: 13,
      color: '#555',
    },
  });

  export default styles
