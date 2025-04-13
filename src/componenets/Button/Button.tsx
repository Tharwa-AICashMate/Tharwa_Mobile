import Theme from '@/theme';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from './Button.styles';
interface UpdateButtonProps {
  onPress: () => void;
  title?: string;
}

export default function UpdateButton({ onPress, title = 'Update Profile' }: UpdateButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}


