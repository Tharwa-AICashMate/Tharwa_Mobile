import UpdateButton from '@/componenets/Button/Button';
import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Theme from '@/theme';

// Define the navigation param list
type RootStackParamList = {
  Profile: undefined;
  ChangePin: undefined;
  Changed: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Define types for the styles
interface Styles {
  container: StyleProp<ViewStyle>;
  content: StyleProp<ViewStyle>;
  label: StyleProp<TextStyle>;
  inputContainer: StyleProp<ViewStyle>;
  input: StyleProp<TextStyle>;
  button: StyleProp<ViewStyle>;
  icon: StyleProp<ViewStyle>;
}

// Define props for the reusable PinInput component
interface PinInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  showPin: boolean;
  setShowPin: (show: boolean) => void;
}

const PinInput: React.FC<PinInputProps> = ({
  label,
  value,
  onChangeText,
  showPin,
  setShowPin,
}) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
          maxLength={4}
          secureTextEntry={!showPin}
          placeholder="••••"
          placeholderTextColor="#A9A9A9"
        />
        <TouchableOpacity onPress={() => setShowPin(!showPin)}>
          <Icon
            name={showPin ? 'eye-check' : 'eye-check-outline'}
            size={24}
            color="#A9A9A9"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default function ChangePin() {
  const [currentPin, setCurrentPin] = useState<string>('');
  const [newPin, setNewPin] = useState<string>('');
  const [confirmPin, setConfirmPin] = useState<string>('');

  // States to track visibility of each PIN input
  const [showCurrentPin, setShowCurrentPin] = useState<boolean>(false);
  const [showNewPin, setShowNewPin] = useState<boolean>(false);
  const [showConfirmPin, setShowConfirmPin] = useState<boolean>(false);

  // Navigation hook
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#00D09E" translucent={false} />
      <Header title="Change Pin" />

      <View style={styles.content}>
        {/* Current Pin */}
        <PinInput
          label="Current Pin"
          value={currentPin}
          onChangeText={setCurrentPin}
          showPin={showCurrentPin}
          setShowPin={setShowCurrentPin}
        />

        {/* New Pin */}
        <PinInput
          label="New Pin"
          value={newPin}
          onChangeText={setNewPin}
          showPin={showNewPin}
          setShowPin={setShowNewPin}
        />

        {/* Confirm Pin */}
        <PinInput
          label="Confirm Pin"
          value={confirmPin}
          onChangeText={setConfirmPin}
          showPin={showConfirmPin}
          setShowPin={setShowConfirmPin}
        />

        <View style={styles.button}>
          <UpdateButton
            title="Change Pin"
            onPress={() => {
              console.log('Change Pin pressed');
              navigation.navigate('GreenScreen');
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles: Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.highlight,
  },
  content: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    padding: 20,
    paddingTop: 50,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    fontWeight: '500',
  },
  inputContainer: {
    backgroundColor: Theme.colors.secondery,
    borderRadius: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 22,
    color: '#333',
  },
  icon: {
    marginLeft: 10,
  },
  button: {
    alignItems: 'center',
    marginTop: 20,
  },
});