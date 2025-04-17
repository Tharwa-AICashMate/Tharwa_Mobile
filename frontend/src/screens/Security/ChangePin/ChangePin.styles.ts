import { StyleSheet } from 'react-native';
import Theme from '@/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.highlight,
  },
  content: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    padding: 20,
    paddingTop: 50,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    fontWeight: '500',
  },
  inputContainer: {
    backgroundColor: Theme.colors.secondery,
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 22,
    color: '#333',
  },
  icon: {
    marginLeft: 10,
  },
  button: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default styles;
