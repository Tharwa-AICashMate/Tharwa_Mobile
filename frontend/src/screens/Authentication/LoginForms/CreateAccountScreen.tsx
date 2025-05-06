import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import styles from "./styles";
import Input from "@/componenets/UI/input";
import { navigationProps, User } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { clearError, registerUser } from "@/redux/slices/AuthSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { AppDispatch } from "@/redux/store";
import {
  doPasswordsMatch,
  isStrongPassword,
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
  isValidUsername,
} from "@/utils/validators";
import Theme from "@/theme";
import { useTranslation } from "react-i18next";
import { I18nManager } from "react-native";
import i18next from "../../../../services/i18next";
const CreateAccountScreen: React.FC<navigationProps> = ({ navigation }) => {
  const isRTL = i18next.language === 'ar' || I18nManager.isRTL;
  const [full_name, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile_num, setphone] = useState<string>("");
  const [DOB, setDob] = useState<Date>(new Date(2000, 0, 1));
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { error, loading } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const {t}=useTranslation()

  async function signUpWithEmail() {
    if (!doPasswordsMatch(confirmPassword, password)) return;
    const user: User = {
      full_name,
      email,
      mobile_num,
      DOB,
    };
    const resultAction = await dispatch(
      registerUser({ user, password })
    );
  
    if (registerUser.fulfilled.match(resultAction)) {
      navigation.navigate('LoginForm');
    } else {
      console.log("Signup failed:", resultAction.error);
    }
  }

  useEffect(()=>{
    dispatch(clearError())
  },[])
 

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="light" backgroundColor={Theme.colors.highlight} translucent={false} />

      <View style={[styles.container,{direction:isRTL?'rtl':'ltr'}]}>
        <View style={styles.header}>
          <Text style={styles.title}>{t("SignUpScreen.welcome")}</Text>
        </View>

        <View style={styles.form}>
          {error && <Text style={styles.errorText}>{error}</Text>}

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            <Input
              label={t("SignUpScreen.FullName")}
              value={full_name}
              onChangeText={setFullName}
              errorMessage={t("SignUpScreen.fullNameError")}
              autoCapitalize="none"
              placeholder={t("SignUpScreen.fullNamePlaceholder")}
              validator={isValidName}
            />

            <Input
              label={t("SignUpScreen.email")}
              value={email}
              onChangeText={setEmail}
              errorMessage={t("SignUpScreen.emailError")}
              autoCapitalize="none"
              placeholder={t("SignUpScreen.emailPlaceholder")}
              validator={isValidEmail}
              keyboardType="email-address"
            />

            <Input
              label={t("SignUpScreen.phoneNumber")}
              value={mobile_num}
              onChangeText={setphone}
              errorMessage={t("SignUpScreen.phoneNumberError")}
              autoCapitalize="none"
              placeholder={t("SignUpScreen.phoneNumberPlaceholder")}
              validator={isValidPhoneNumber}
            />

            <Input
              label={t("SignUpScreen.dateOfBirth")}
              value={dob.toLocaleDateString()}
              autoCapitalize="none"
              placeholder={t("SignUpScreen.dateOfBirthPlaceholder")}
              errorMessage={t("SignUpScreen.dateOfBirthError")}
              editable={false}
              endIcon={
                <Ionicons
                  name="calendar-outline"
                  size={15}
                  onPress={() => setShowDatePicker(true)}
                 
                />
              }
            />

            {showDatePicker && (
              <DateTimePicker
                value={DOB}
                mode="date"
                display="default"
                locale={isRTL ?"ar" :'en'} 
                onChange={(e) => {
                  setDob(new Date(e.nativeEvent.timestamp));
                  setShowDatePicker(false);
                }}
              />
            )}

            <Input
              label={t("SignUpScreen.password")}
              value={password}
              onChangeText={setPassword}
              errorMessage={t("SignUpScreen.passwordError")}
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
                  style={{ width: 25, height: 13 ,objectFit:'contain'}}
                />
              }
              onEndIconPress={() => setShowPassword((prev) => !prev)}
            />

            <Input
              label={t("SignUpScreen.confirmPassword")}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              errorMessage={t("SignUpScreen.passwordErrorMatch")}
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
                  style={{ width: 25, height: 13 ,objectFit:'contain'}}
                />
              }
              onEndIconPress={() => setShowConfirmPassword((prev) => !prev)}
            />

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                {t("SignUpScreen.byContinue")}
                <Text style={styles.termsLink}> {t("SignUpScreen.termsAndConditions")} </Text>
                {t("SignUpScreen.and")}
                <Text style={styles.termsLink}> {t("SignUpScreen.privacyPolicy")}</Text>
              </Text>
            </View>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={signUpWithEmail}
            >
              <Text style={styles.primaryButtonText}>{t("SignUpScreen.signUp")}</Text>
            </TouchableOpacity>
              {loading && (
                <View >
                  <Text >Loading...</Text>
                </View>
              )}
            <View style={styles.link}>
              <Text style={styles.linkText}>{t("SignUpScreen.loginMsg")}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginForm")}
              >
                <Text style={styles.linkButton}> {t("SignUpScreen.login")}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateAccountScreen;
