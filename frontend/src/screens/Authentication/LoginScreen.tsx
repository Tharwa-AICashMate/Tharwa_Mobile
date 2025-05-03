import React from "react";
import { View, Text,  TouchableOpacity, Image, StatusBar } from "react-native";
import { navigationProps } from "@/types";
import styles from "./styles";
import Theme from "@/theme";
import { useTranslation } from "react-i18next";

const LoginScreen: React.FC<navigationProps> = ({ navigation }) => {
  const {t}=useTranslation()
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Theme.colors.background} translucent={false} />

      <View style={styles.loginScreenContainer}>
        <Image source={require("@/assets/logo2.png")} />
        <Text style={styles.title}>{t("logo")}
        </Text>
        <Text style={styles.subtitle}>
          {t("Login.loginMsg")}
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("LoginForm")}
        >
          <Text style={styles.primaryButtonText}>{t("Login.login")}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("CreateAccount")}
        >
          <Text style={styles.secondaryButtonText}>{t("Login.signUp")}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotText}>{t("Login.forgotPassword")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

