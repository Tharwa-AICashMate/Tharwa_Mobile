import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    width: '45%',
    backgroundColor: '#00D09E',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: 'center', 
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});
