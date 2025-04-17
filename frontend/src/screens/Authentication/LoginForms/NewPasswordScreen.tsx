import React, { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import Input from "@/componenets/UI/input";
import { navigationProps } from "@/types";

const NewPasswordScreen: React.FC<navigationProps> = ({ navigation }) => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>New Password</Text>
          </View>

          <View style={styles.form}>
           <View style={{gap:20}}>

            <Input
              label="New Password"
              value={password}
              onChangeText={setPassword}
              errorMessage={''}
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              endIcon={
                <Image
                  source={
                    showPassword
                      ? require('@/assets/Eye-icon-open.png')
                      : require('@/assets/Eye-icon.png')
                  }
                  style={{ width: 25, height: 13 }}
                />
              }
              onEndIconPress={() => setShowPassword((prev) => !prev)}
            />

            <Input
              label="Confirm New Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              errorMessage={''}
              autoCapitalize="none"
              secureTextEntry={!showConfirmPassword}
              endIcon={
                <Image
                  source={
                    showConfirmPassword
                      ? require('@/assets/Eye-icon-open.png')
                      : require('@/assets/Eye-icon.png')
                  }
                  style={{ width: 25, height: 13 }}
                />
              }
              onEndIconPress={() => setShowConfirmPassword((prev) => !prev)}
            />
           </View>

            <TouchableOpacity
              style={[styles.primaryButton,{width:'100%'}]}
              onPress={() => navigation.navigate('SecurityPin')}
            >
              <Text style={styles.primaryButtonText}>Change Password</Text>
            </TouchableOpacity>
            
          </View>
        </View>
    </KeyboardAvoidingView>
  );
}


export default NewPasswordScreen;