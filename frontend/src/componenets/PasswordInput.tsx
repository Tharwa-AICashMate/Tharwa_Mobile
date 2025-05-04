
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View,I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import i18next from "./../../services/i18next";
const isRTL = i18next.language === 'ar' || I18nManager.isRTL;
interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  placeholder = '••••••••',
  secureTextEntry = true,
}) => {
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={!showPassword}
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Ionicons
          name={showPassword ? 'eye-off-outline' : 'eye-outline'}
          size={20}
          color="#888"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: isRTL ?'row-reverse':'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 8,
    marginVertical: 8,
  },
  input: {
    textAlign:isRTL?'right':'left',
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    color: '#333',
  },
  iconContainer: {
    padding: 8,
  },
});

export default PasswordInput;
