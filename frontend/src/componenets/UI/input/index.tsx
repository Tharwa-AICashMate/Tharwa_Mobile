import React from 'react';
import { TextInput, Text, View, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import styles from './style';

interface InputProps extends TextInputProps {
  label: string;
  errorMessage?: string;
  containerStyle?: object;
  labelStyle?: object;
  inputStyle?: object;
  endIcon?: React.ReactNode; 
  onEndIconPress?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  errorMessage,
  containerStyle,
  labelStyle,
  inputStyle,
  endIcon,
  onEndIconPress,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          style={[styles.input, inputStyle]}
          placeholder={props.placeholder || label}
        />
        {endIcon && (
          <TouchableOpacity onPress={onEndIconPress} style={styles.iconContainer}>
            {endIcon}
          </TouchableOpacity>
        )}
        </View>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};


export default Input;
