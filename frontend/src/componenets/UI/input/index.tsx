import React, { useState } from 'react';
import { TextInput, Text, View,  TextInputProps, TouchableOpacity } from 'react-native';
import styles from './style';

interface InputProps extends TextInputProps {
  label: string;
  errorMessage?: string;
  containerStyle?: object;
  labelStyle?: object;
  inputStyle?: object;
  endIcon?: React.ReactNode; 
  onEndIconPress?: () => void;
  validator?:(value: string)=>boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  errorMessage,
  containerStyle,
  labelStyle,
  inputStyle,
  endIcon,
  validator,
  onEndIconPress,
  ...props
}) => {
  const [error, setError] = useState<string>('')
  const handelValidation = ()=>{
    if(validator && !validator(props?.value!))
      setError(errorMessage || 'Invalid input');
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          style={[styles.input, inputStyle]}
          placeholder={props.placeholder || label}
          onBlur={handelValidation}
          onFocus={()=>setError('')}
        />
        {endIcon && (
          <TouchableOpacity onPress={onEndIconPress} style={styles.iconContainer}>
            {endIcon}
          </TouchableOpacity>
        )}
        </View>
      {error && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};


export default Input;
