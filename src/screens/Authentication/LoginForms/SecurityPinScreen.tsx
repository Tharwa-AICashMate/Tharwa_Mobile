import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";

import styles from "./styles";
import { navigationProps } from "@/types";

const SecurityPinScreen: React.FC<navigationProps> = ({navigation}) => {
  const [pin, setPin] = useState<String[]>([...Array(6)]);
  const inputs = useRef<(TextInput | null)[]>([]);

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
            onPress={() => navigation.navigate("NewPassword")}
          >
            <Text style={styles.primaryButtonText}>Accept</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Send Again</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.linkText}>or sign up with </Text>

          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialIcon}>
              <Image
                source={require("@/assets/Facebook-icon.png")}
                style={{ width: 32, height: 32 }}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialIcon}>
              <Image
                source={require("@/assets/Google-icon.png")}
                style={{ width: 32, height: 32 }}
              />
            </TouchableOpacity>
          </View>

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
