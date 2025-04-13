import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Theme from '@/theme';
import styles from './HeadericonsWithTitle.styles'
interface HeaderProps {
  title: string;
  goBackTo?: string; 
}

export default function Header({ title, goBackTo }: HeaderProps) {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleBack = () => {
    if (goBackTo) {
      navigation.navigate(goBackTo);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBack}>
        <Ionicons name="arrow-back" size={24} color={Theme.colors.secondery} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
        <Ionicons
          name="notifications-outline"
          size={24}
          color="black"
          style={styles.bellIcon}
        />
      </TouchableOpacity>
    </View>
  );
}


