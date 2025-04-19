// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { FontAwesome5 } from '@expo/vector-icons';
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';

// interface QuickStatsCardProps {
//   savingsProgress: number; // Percentage (0-100)
//   revenueLastWeek: number;
//   foodLastWeek: number;
// }

// const QuickStatsCard: React.FC<QuickStatsCardProps> = ({ savingsProgress, revenueLastWeek, foodLastWeek }) => {
//   const [fontsLoaded] = useFonts({
//     Inter_400Regular,
//     Inter_500Medium,
//     Inter_600SemiBold,
//   });

//   if (!fontsLoaded) {
//     return null; // Or a loading indicator
//   }

//   const radius = 30;
//   const strokeWidth = 5;
//   const progressWidth = (savingsProgress / 100) * (radius * 2);

//   return (
//     <View style={styles.container}>
//       {/* Savings On Goals */}
//       <View style={styles.savingsContainer}>
//         <View style={styles.progressCircle}>
//           <FontAwesome5 name="car" size={20} color="#3F51B5" style={styles.carIcon} />
//           <View style={[styles.outerCircle, { width: radius * 2, height: radius * 2 }]}>
//             <View style={[styles.innerCircle, { width: radius * 2 - strokeWidth, height: radius * 2 - strokeWidth }]}>
//               <View style={[styles.progressBar, { width: progressWidth, height: strokeWidth }]} />
//             </View>
//           </View>
//         </View>
//         <Text style={styles.savingsLabel}>Savings</Text>
//         <Text style={styles.savingsLabel}>On Goals</Text>
//       </View>

//       {/* Separator */}
//       <View style={styles.separator} />

//       {/* Revenue Last Week */}
//       <View style={styles.revenueFoodContainer}>
//         <View style={styles.itemContainer}>
//           <MaterialIcons name="stacked-line-chart" size={24} color="#7986CB" />
//           <View style={styles.textContainer}>
//             <Text style={styles.itemLabel}>Revenue Last Week</Text>
//             <Text style={styles.itemValue}>${revenueLastWeek.toFixed(2)}</Text>
//           </View>
//         </View>

//         {/* Food Last Week */}
//         <View style={styles.itemContainer}>
//           <MaterialIcons name="restaurant" size={24} color="#F44336" />
//           <View style={styles.textContainer}>
//             <Text style={styles.itemLabel}>Food Last Week</Text>
//             <Text style={styles.itemValue}>-${Math.abs(foodLastWeek).toFixed(2)}</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#FFF3CD',
//     borderRadius: 10,
//     padding: 15,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   savingsContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 15,
//   },
//   progressCircle: {
//     position: 'relative',
//     width: 60,
//     height: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   outerCircle: {
//     borderRadius: 30,
//     backgroundColor: '#E0E0E0',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   innerCircle: {
//     borderRadius: 25,
//     backgroundColor: '#FFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
//   progressBar: {
//     position: 'absolute',
//     backgroundColor: '#3F51B5',
//     borderRadius: 2,
//   },
//   carIcon: {
//     position: 'absolute',
//   },
//   savingsLabel: {
//     fontFamily: 'Inter_400Regular',
//     fontSize: 12,
//     color: '#555',
//     textAlign: 'center',
//   },
//   separator: {
//     height: '80%',
//     width: 1,
//     backgroundColor: '#E0E0E0',
//   },
//   revenueFoodContainer: {
//     flex: 1,
//     paddingLeft: 15,
//     justifyContent: 'space-around',
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   textContainer: {
//     marginLeft: 10,
//   },
//   itemLabel: {
//     fontFamily: 'Inter_500Medium',
//     fontSize: 14,
//     color: '#333',
//   },
//   itemValue: {
//     fontFamily: 'Inter_600SemiBold',
//     fontSize: 16,
//     color: '#222',
//   },
// });

// export default QuickStatsCard;