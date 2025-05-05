import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, I18nManager } from "react-native";
import styles from "./styles";
import Input from "@/componenets/UI/input";
import { navigationProps } from "@/types";
import SocialSignIn from "@/componenets/Login/SocialSignIn";
import { useDispatch, useSelector } from "react-redux";
import { isValidEmail } from "@/utils/validators";
import { clearError, forgetPassword } from "@/redux/slices/AuthSlice";
import { AppDispatch } from "@/redux/store";
import { useTranslation } from "react-i18next";
import i18next from "../../../../services/i18next";

const ForgotPasswordScreen: React.FC<navigationProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const { error, loading } = useSelector((state: any) => state.auth);
  const isRTL = i18next.language === 'ar' || I18nManager.isRTL;

  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  async function handelForgetPassword() {
    const resultAction = await dispatch(forgetPassword(email));
    if (forgetPassword.fulfilled.match(resultAction)) {
      navigation.navigate("SecurityPin");
    } else {
      console.log("Invalid Email:", resultAction.error);
    }
  }

  useEffect(() => {
    dispatch(clearError());
  }, []);
  return (
    <View style={[styles.container,{direction:isRTL?'rtl':'ltr'}]}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {t("forgotPasswordScreen.forgotPassword")}
        </Text>
      </View>

      <View style={styles.form}>
        <View>
          <Text
            style={[styles.secondaryButtonText, { alignSelf: "flex-start" }]}
          >
            {t("forgotPasswordScreen.resetPassword")}
          </Text>
          <Text style={styles.linkText}>
            {t("forgotPasswordScreen.resetPasswordDescription")}
          </Text>
        </View>

        <Input
          label={t("forgotPasswordScreen.enterEmailAddress")}
          keyboardType="email-address"
          value={email}
          validator={isValidEmail}
          onChangeText={setEmail}
          errorMessage={t("forgotPasswordScreen.invalidEmailOrPassword")}
          autoCapitalize="none"
          placeholder={t("forgotPasswordScreen.emailPlaceholder")}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handelForgetPassword}
        >
          <Text style={styles.primaryButtonText}>
            {t("forgotPasswordScreen.nextStep")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("CreateAccount")}
        >
          <Text style={styles.secondaryButtonText}>
            {t("forgotPasswordScreen.signUp")}
          </Text>
        </TouchableOpacity>

        <SocialSignIn />

        <View style={styles.link}>
          <Text style={styles.linkText}>
            {t("forgotPasswordScreen.dontHaveAnAccount")}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateAccount")}
          >
            <Text style={styles.linkButton}>
              {t("forgotPasswordScreen.signUp")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
