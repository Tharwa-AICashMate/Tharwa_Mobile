import { navigationProps } from "@/types";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import styles from "./styles";
import Input from "@/componenets/UI/input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { clearError, loginUser } from "@/redux/slices/AuthSlice";
import { isStrongPassword, isValidEmail } from "@/utils/validators";
import SocialSignIn from "@/componenets/Login/SocialSignIn";
import Theme from "@/theme";
import { useTranslation } from "react-i18next";

const LoginFormScreen: React.FC<navigationProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const { error, loading } = useSelector((state: any) => state.auth);
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    const resultAction = await dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    dispatch(clearError());
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.highlight}
        translucent={false}
      />

      <View style={styles.header}>
        <Text style={styles.title}>{t("loginScreen.welcome")}</Text>
      </View>

      <View style={styles.form}>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <Input
          label={t("loginScreen.email")}
          value={email}
          keyboardType="email-address"
          onChangeText={setEmail}
          errorMessage={t("loginScreen.emailError")}
          validator={isValidEmail}
          autoCapitalize="none"
          placeholder={t("loginScreen.emailPlaceholder")}
        />

        <Input
          label={t("loginScreen.password")}
          value={password}
          onChangeText={setPassword}
          validator={isStrongPassword}
          errorMessage={t("loginScreen.passwordError")}
          autoCapitalize="none"
          autoComplete="off"
          secureTextEntry={showPassword}
          endIcon={
            <Image
              source={
                showPassword
                  ? require("@/assets/Eye-icon.png")
                  : require("@/assets/Eye-icon-open.png")
              }
              style={{ width: 25, height: 13, objectFit: "contain" }}
            />
          }
          onEndIconPress={() => setShowPassword((show) => !show)}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>{t("loginScreen.login")}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotText}>
            {t("loginScreen.forgotPassword")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("CreateAccount")}
        >
          <Text style={styles.secondaryButtonText}>
            {t("loginScreen.signUp")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fingerprintButton}
          onPress={() => navigation.navigate("Fingerprint")}
        >
          <Text style={styles.fingerprintText}>
            {t("loginScreen.fingerprint")}
          </Text>
        </TouchableOpacity>

        <SocialSignIn />
        <View style={styles.link}>
          <Text style={styles.linkText}>{t("loginScreen.register")}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateAccount")}
          >
            <Text style={styles.linkButton}>{t("loginScreen.signUp")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginFormScreen;
