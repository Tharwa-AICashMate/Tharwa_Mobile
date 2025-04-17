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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    alignSelf: 'flex-start',
    marginVertical: 20,
    marginLeft: '10%',
    color: '#000',
  },
  inputGroup: {
    width: '80%',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 15,
    marginBottom: 8,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    backgroundColor: Theme.colors.secondery,
    borderRadius: 15,
    padding: 12,
    fontSize: 14,
  },
  switchRow: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: Theme.colors.textLight,
    fontWeight: '500',
  },
});

export default styles;
