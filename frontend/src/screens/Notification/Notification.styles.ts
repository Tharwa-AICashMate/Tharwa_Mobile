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
    paddingVertical: 20,
    paddingHorizontal: 10,
    
  },
  contentcontainer:{
    width:"85%",
    marginTop:15
  }
})


export default styles 