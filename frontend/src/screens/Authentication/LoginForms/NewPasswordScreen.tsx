import React, { useEffect, useState } from "react";
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
import { clearError, resetPassword } from "@/redux/slices/AuthSlice";
import { useTranslation } from "react-i18next";

const NewPasswordScreen: React.FC<navigationProps> = ({ navigation }) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { error, loading } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const handlePasswordReset = async () => {
    if (!doPasswordsMatch(password, confirmPassword)) return;
    const resultAction = await dispatch(resetPassword(password));
    if (resetPassword.fulfilled.match(resultAction)) {
      navigation.navigate("LoginForm");
    } else {
      console.log("ResetFailed failed:", resultAction.error);
    }
  };

  useEffect(() => {
    dispatch(clearError());
  }, []);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t("newPasswordScreen.newPassword")}</Text>
        </View>

        <View style={styles.form}>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <View style={{ gap: 20 }}>
            <Input
              containerStyle={{ width: "80%" }}
              label={t("newPasswordScreen.password")}
              value={password}
              onChangeText={setPassword}
              errorMessage={t("newPasswordScreen.passwordError")}
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
              label={t("newPasswordScreen.confirmPassword")}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              errorMessage={t("newPasswordScreen.passwordErrorMatch")}
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
            <Text style={styles.primaryButtonText}>
              {t("newPasswordScreen.changePassword")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NewPasswordScreen;
