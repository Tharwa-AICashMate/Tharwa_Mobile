// import { StyleSheet } from "react-native";

// import Theme from "@/theme";

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     paddingHorizontal: 20,
//     marginBottom: 20,
//     boxShadow: "0 1 3 #ccc",
//   },
//   containerTitle: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   monthTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: Theme.colors.text,
//     marginBottom: 10,
//     paddingHorizontal: 15,
//   },
// });

// export default styles;
import { StyleSheet } from 'react-native';
import Theme from '@/theme';

export default StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  rtlContainer: {
    direction: 'rtl',
  },
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  rtlContainerTitle: {
    flexDirection: 'row-reverse',
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
  rtlText: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  calendarIcon: {
    marginRight: 20,
  },
  rtlCalendarIcon: {
    marginRight: 0,
    marginLeft: 20,
    transform: [{ scaleX: -1 }],
  },
});