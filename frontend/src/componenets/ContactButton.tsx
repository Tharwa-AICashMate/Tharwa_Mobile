import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface ContactButtonProps {
  isActive?: boolean;
}

const ContactButton: React.FC<ContactButtonProps> = ({ isActive = true }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('SupportChannels' as never);
  };

  return (
    <TouchableOpacity
      style={[styles.button, isActive ? styles.activeButton : styles.inactiveButton]}
      onPress={handlePress}
      disabled={!isActive}
    >
      <Text style={styles.buttonText}>Contact Us</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#FFC937',
  },
  inactiveButton: {
    backgroundColor: '#E0E0E0',
  },
  buttonText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default ContactButton;