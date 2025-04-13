import { StyleSheet } from 'react-native';
import Theme from '@/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.highlight,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingTop: 40,
    paddingHorizontal: 25,
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraphContainer: {
    marginBottom: 16,
  },
  fixedWidthText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'monospace',
    color: '#333',
  },
  listContainer: {
    marginBottom: 16,
  },
  listItem: {
    fontSize: 14,
    lineHeight: 22,
    paddingLeft: 8,
    color: '#333',
  },
  readMoreText: {
    fontSize: 14,
    marginVertical: 20,
    textAlign: 'left',
  },
  link: {
    color: '#3299FF',
    textDecorationLine: 'underline',
  },
  footer: {
    paddingVertical: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#00D09E',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: Theme.colors.highlight,
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
  },
  acceptButton: {
    backgroundColor: Theme.colors.highlight,
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButtonDisabled: {
    backgroundColor: '#A0E5D3',
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
