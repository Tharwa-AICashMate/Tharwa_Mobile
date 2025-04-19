import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import Input from "@/componenets/UI/input";
import { navigationProps } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { doPasswordsMatch, isStrongPassword } from "@/utils/validators";
import { resetPassword } from "@/redux/slices/AuthSlice";

const NewPasswordScreen: React.FC<navigationProps> = ({ navigation }) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { error, loading } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handlePasswordReset = async () => {
    if (!doPasswordsMatch(password, confirmPassword)) return;
    const resultAction = await dispatch(resetPassword(password));
    if (resetPassword.fulfilled.match(resultAction)) {
      navigation.navigate("LoginForm");
    } else {
      console.log("ResetFailed failed:", resultAction.error);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>New Password</Text>
        </View>

        <View style={styles.form}>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <View style={{ gap: 20 }}>
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              errorMessage={"Invalid Password"}
              validator={isStrongPassword}
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              endIcon={
                <Image
                  source={
                    showPassword
                      ? require("@/assets/Eye-icon-open.png")
                      : require("@/assets/Eye-icon.png")
                  }
                  style={{ width: 25, height: 13 }}
                />
              }
              onEndIconPress={() => setShowPassword((prev) => !prev)}
            />

            <Input
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              errorMessage={"Passwords don't match"}
              autoCapitalize="none"
              validator={doPasswordsMatch.bind("", password)}
              secureTextEntry={!showConfirmPassword}
              endIcon={
                <Image
                  source={
                    showConfirmPassword
                      ? require("@/assets/Eye-icon-open.png")
                      : require("@/assets/Eye-icon.png")
                  }
                  style={{ width: 25, height: 13 }}
                />
              }
              onEndIconPress={() => setShowConfirmPassword((prev) => !prev)}
            />
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, { width: "100%" }]}
            onPress={handlePasswordReset}
          >
            <Text style={styles.primaryButtonText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NewPasswordScreen;
