// import React from 'react';
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// interface SettingsItemProps {
//   title: string;
//   onPress: () => void;
//   icon?: React.ReactNode;
//   rightElement?: React.ReactNode;
//   showArrow?: boolean;
// }

// const SettingsItem: React.FC<SettingsItemProps> = ({ 
//   title, 
//   onPress,
//   icon, 
//   rightElement, 
//   showArrow = true 
// }) => {
//   return (
//     <TouchableOpacity 
//       style={styles.container}
//       onPress={onPress}
//       activeOpacity={0.7}
//     >
//       <View style={styles.content}>
//       {icon && <View style={styles.icon}>{icon}</View>}
//         <Text style={styles.title}>{title}</Text>
//         <View style={styles.rightContent}>
//           {rightElement}
//           {showArrow && (
//             <Ionicons name="chevron-forward" size={20} color="#888" />
//           )}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 10,
  
//   },
//   content: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 16,
//     color: '#333',
//   },
//   rightContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },icon: {
//     marginRight: 10,
//   }
// });

// export default SettingsItem;
import React from 'react';
import { I18nManager, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import i18next from "./../../services/i18next";

interface SettingsItemProps {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode; 
  rightElement?: React.ReactNode;
  showArrow?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ 
  title, 
  onPress, 
  icon, 
  rightElement, 
  showArrow = true 
}) => {
  const isRTL = i18next.language === "ar" || I18nManager.isRTL;
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.leftContent}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightContent}>
          {rightElement}
          {showArrow && (
            <Ionicons name={isRTL?"chevron-back":"chevron-forward"} size={20} color="#888" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SettingsItem;
