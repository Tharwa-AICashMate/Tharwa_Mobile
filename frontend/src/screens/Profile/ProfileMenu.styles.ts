import { StyleSheet } from 'react-native';
import Theme from '@/theme';

const styles = StyleSheet.create({
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
  },
  iconWrapper: {
    backgroundColor: '#00aaff',
    padding: 10,
    borderRadius: 30,
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.textLight,
  },
});

export default styles;
