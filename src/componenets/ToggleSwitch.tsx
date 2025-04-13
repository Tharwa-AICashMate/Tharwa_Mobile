
import React from 'react';
import { Switch } from 'react-native';

interface ToggleSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ value, onValueChange }) => {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#d9d9d9', true: '#FECD3E' }}
      thumbColor="white"
      ios_backgroundColor="#d9d9d9"
    />
  );
};

export default ToggleSwitch;