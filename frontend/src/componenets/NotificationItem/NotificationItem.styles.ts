import { StyleSheet } from 'react-native'
import Theme from '@/theme'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    width: 37,
    height: 37,
    marginRight: 10,
    marginTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Theme.colors.text,
    marginBottom: 5,
  },
  subtitle: {
    color: Theme.colors.text,
  },
  highlightText: {
    fontWeight: 'bold',
    color: Theme.colors.accentDark,
  },
  time: {
    alignSelf: 'flex-end',
    marginTop: 5,
    color: Theme.colors.accentDark,
    fontSize: 13,
  },
  separator: {
    height: 1,
    backgroundColor: Theme.colors.highlight,
    marginTop: 15,
  },
})

export default styles
