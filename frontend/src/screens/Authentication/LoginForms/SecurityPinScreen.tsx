import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";

import styles from "./styles";
import { navigationProps } from "@/types";
import SocialSignIn from "@/componenets/Login/SocialSignIn";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { verifyPin } from "@/redux/slices/AuthSlice";

const SecurityPinScreen: React.FC<navigationProps> = ({navigation}) => {
  const [pin, setPin] = useState<String[]>([...Array(6)]);
  const inputs = useRef<(TextInput | null)[]>([]);
  const { error, loading } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handlePinChange = (num: string, index: number) => {
    if (index < 5 && !(num == "")) {
      inputs.current[index + 1]?.focus();
    }
    setPin((pin) => {
      let newPin = [...pin];
      if (/^\d$/.test(num) || num == "")
        newPin = pin.map((n, i) => (i == index ? num : n));
      return newPin;
    });
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !pin[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const verifyOTP = async () => {
      const resultAction = await dispatch(verifyPin(pin.join("")));
      if (verifyPin.fulfilled.match(resultAction)) {
        navigation.navigate("NewPassword");
      } else {
        console.log("Signup failed:", resultAction.error);
      }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Security Pin</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.secondaryButtonText}>Enter Security Pin</Text>
        <View style={styles.pinContainer}>
          <View style={styles.pinDots}>
            {pin.map((val, index) => (
              <View key={index} style={styles.pinDot}>
                <TextInput
                  key={index}
                  ref={(ref) => (inputs.current[index] = ref)}
                  keyboardType="number-pad"
                  secureTextEntry={false}
                  onChangeText={(val) => handlePinChange(val, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  maxLength={1}
                  returnKeyType="done"
                  value={val}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={{ gap: 20 }}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={verifyOTP}
          >
            <Text style={styles.primaryButtonText}>Accept</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Send Again</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <SocialSignIn />

          <View style={styles.link}>
            <Text style={styles.linkText}>Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateAccount")}
            >
              <Text style={styles.linkButton}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default SecurityPinScreen;
