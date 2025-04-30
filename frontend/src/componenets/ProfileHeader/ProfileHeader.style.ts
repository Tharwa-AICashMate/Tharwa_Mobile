import { StyleSheet } from 'react-native';
import Theme from '@/theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 30,
  },
  initialsCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Theme.colors.secondery, 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:5
  },
  initialsText: {
    fontSize: 36,
    color: Theme.colors.text,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userId: {
    fontSize: 13,
    color: '#555',
  },
});


  export default styles
