import React, { useState } from 'react';
import { TextInput, Text, View,  TextInputProps, TouchableOpacity, I18nManager } from 'react-native';
import styles from './style';
import i18next from "../../../../services/i18next";
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
    if(validator && !validator(props?.value?.trim()!))
      setError(errorMessage || 'Invalid input');
  }
  const isRTL = i18next.language === 'ar' || I18nManager.isRTL;


  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          style={[styles.input, inputStyle,{textAlign:isRTL?'right':'left'}]}
          placeholder={props.placeholder || label}
          onBlur={handelValidation}
          onFocus={()=>setError('')}
        />
        {endIcon && (
          <TouchableOpacity onPress={onEndIconPress} style={[styles.iconContainer,{right:isRTL? "100%": 0,}]}>
            {endIcon}
          </TouchableOpacity>
        )}
        </View>
      {error && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};


export default Input;
