import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  I18nManager,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import PasswordInput from "../../componenets/PasswordInput";
import axios from "axios";
import { supabase } from "@/utils/supabase"; 
const { height, width } = Dimensions.get("window");
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import Theme from "@/theme";
import { getCurrentUserId } from '@/utils/auth';
import { apiBase } from "@/utils/axiosInstance";
import { useTranslation } from "react-i18next";
import i18next from 'i18next';
import { isStrongPassword } from "@/utils/validators";

const API_BASE_URL = apiBase;

type PasswordSettingsScreenNavigationProp = any;

const PasswordSettingsScreen: React.FC = () => {
  const navigation = useNavigation<PasswordSettingsScreenNavigationProp>();
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isRTL = i18next.language === 'ar' || I18nManager.isRTL;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FECD3E",
    },
    scrollView: {
      flex: 1,
      direction: isRTL ? 'rtl' : 'ltr',
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
    section: {
      backgroundColor: "white",
      borderTopLeftRadius: 80,
      borderTopRightRadius: 80,
      height: height,
      width: width,
      padding: 40,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    label: {
      fontSize: 14,
      color: "#666",
      marginTop: 12,
      marginBottom: 4,
    },
    errorText: {
      color: "red",
      marginTop: 16,
      textAlign: "center",
    },
    changeButton: {
      backgroundColor: "#FECD3E",
      borderRadius: 25,
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: "center",
      marginTop: 24,
    },
    changeButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
    disabledButton: {
      opacity: 0.7,
    }
  });

  const validateInputs = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setLocalError(t("passwordChange.requiredFields"));
      return false;
    }
    if (!isStrongPassword(confirmNewPassword)) {
      setLocalError(t("passwordChange.weakPassword"));
      return false;
    }

    if (newPassword !== confirmNewPassword) {
      setLocalError(t("passwordChange.Passwordsdonotmatch"));
      return false;
    }

    if (newPassword.length < 8) {
      setLocalError(t("passwordChange.Passwordmustbeatleast8characters"));
      return false;
    }

    return true;
  };

  const handleChangePassword = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    setLocalError(null);

    try {
      const userId = await getCurrentUserId();
      console.log(userId);

      // Get email by userId
      const emailRes = await axios.get(`${API_BASE_URL}/delete/get-email/${userId}`);
      if (emailRes.status !== 200) {
        setLocalError(t("passwordChange.emailError"));
        return;
      }
      const email = emailRes.data.email;

      // Verify current password
      const verifyRes = await axios.post(`${API_BASE_URL}/delete/verify-password/${userId}`, {
        email: email,
        password: currentPassword,
      });
      if (verifyRes.status !== 200) {
        setLocalError(t("passwordChange.Incorrectcurrentpassword"));
        return;
      }

      // Update password
      const updateRes = await axios.post(`${API_BASE_URL}/delete/update-password/${userId}`, {
        newPassword: newPassword,
      });

      if (updateRes.status === 200) {
        // Refresh session by signing in with the new password
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: newPassword,
        });
        if (error) {
          setLocalError(t("passwordChange.Failedtorefreshsession"));
          return;
        }
        // Log the session to verify
        const { data: session } = await supabase.auth.getSession();
        console.log("Current session after password change:", session);
        navigation.navigate("PasswordChangeConfirm");
      } else {
        setLocalError(t("passwordChange.Failedtoupdatepassword"));
      }
    } catch (error: any) {
      console.log("Error changing password:", error);
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          setLocalError(t("passwordChange.Networkerror"));
        } else if (error.response.status === 401) {
          setLocalError(t("passwordChange.Incorrectcurrentpassword"));
        } else if (error.response.status === 404) {
          setLocalError(t("passwordChange.Usernotfound"));
        } else {
          setLocalError(t("passwordChange.Servererror"));
        }
      } else {
        setLocalError(t("passwordChange.Somethingwentwrong"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.highlight}
        translucent={false}
      />
      <Header title={t("passwordChange.passwordChange")} />

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.label}>{t("passwordChange.currentPassword")}</Text>
          <PasswordInput
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />

          <Text style={styles.label}>{t("passwordChange.newPassword")}</Text>
          <PasswordInput value={newPassword} onChangeText={setNewPassword} />

          <Text style={styles.label}>{t("passwordChange.confirmNewPassword")}</Text>
          <PasswordInput
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
          />

          {localError && (
            <Text style={styles.errorText}>{localError}</Text>
          )}

          <TouchableOpacity
            style={[styles.changeButton, isLoading && styles.disabledButton]}
            onPress={handleChangePassword}
            disabled={isLoading}
          >
            <Text style={styles.changeButtonText}>
              {isLoading ? t("passwordChange.Processing") : t("passwordChange.changePassword")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PasswordSettingsScreen;
