import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  Dimensions,
  StatusBar,
  I18nManager,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import PasswordInput from "@/componenets/PasswordInput";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import Theme from "@/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCurrentUserId } from "@/utils/auth";
import { apiBase } from "@/utils/axiosInstance";
import { CommonActions } from "@react-navigation/native";
import { logoutUser } from "@/redux/slices/AuthSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import useDeleteAccountStyles from "./deleteAccount.styles";

// import i18next from 'i18next';
import i18next from "i18next";

type RootStackParamList = {
  EditProfile: undefined;
  Security: undefined;
  Settings: undefined;
  Help: undefined;
  Logout: undefined;
  Profile: undefined;
};

const { height, width } = Dimensions.get("window");

type DeleteAccountScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DeleteAccountScreen"
>;

const API_BASE_URL = apiBase;
const styles = useDeleteAccountStyles();

const DeleteAccountScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<DeleteAccountScreenNavigationProp>();
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const logout = async () => {
    dispatch(logoutUser());
  };

  const handleDeleteRequest = async () => {
    if (!password) {
      Alert.alert(t("deleteAccount.error"), t("deleteAccount.enterPassword"));
      return;
    }

    setLoading(true);
    try {
      const userId = await getCurrentUserId();
      if (!userId) {
        Alert.alert(
          t("deleteAccount.error"),
          t("deleteAccount.unableToFetchUser")
        );
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/delete/get-email/${userId}`
      );
      const result = await response.json();

      if (!response.ok || !result.email) {
        Alert.alert(
          t("deleteAccount.error"),
          t("deleteAccount.unableToFetchUser")
        );
        return;
      }

      const userEmail = result.email;

      const verifyResponse = await fetch(
        `${API_BASE_URL}/delete/verify-password/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail, password }),
        }
      );

      const verifyResult = await verifyResponse.json();

      if (!verifyResponse.ok) {
        throw new Error(
          verifyResult.error || t("deleteAccount.passVerifyFailed")
        );
      }

      setShowModal(true);
    } catch (error) {
      Alert.alert(
        t("deleteAccount.error"),
        t("deleteAccount.Incorrectpasswordorservererror")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      const userId = await getCurrentUserId();
      if (!userId) {
        Alert.alert(
          t("deleteAccount.error"),
          t("deleteAccount.unableToFetchUser")
        );
        return;
      }

      const response = await fetch(`${API_BASE_URL}/delete/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || t("deleteAccount.AccountDelFailed"));
      }

      // Clear local storage
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("authToken");

      setShowModal(false);

      Alert.alert(
        t("deleteAccount.AccountDeleted"),
        t("deleteAccount.accounrDeletedSuccessfully"),
        [
          {
            text: "OK",
            onPress: async () => {
              await logout();
            },
          },
        ]
      );
    } catch (error) {
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("authToken");

      setShowModal(false);

      Alert.alert(
        t("deleteAccount.AccountDeleted"),
        t("deleteAccount.Youraccountmayhavealreadybeendeleted"),
        [
          {
            text: "OK",
            onPress: async () => {
              await logout();
            },
          },
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t("deleteAccount.deleteAccount")} />
        <View style={styles.content}>
      <KeyboardAvoidingView>
          <Text style={styles.warningTitle}>{t("deleteAccount.areusure")}</Text>

          <Text style={styles.warningText}>
            {t("deleteAccount.bydeleting")}
          </Text>

          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>
              {t("deleteAccount.Transactionhistory")}
            </Text>
            <Text style={styles.bulletPoint}>
              {t("deleteAccount.Savedbudgets")}
            </Text>
            <Text style={styles.bulletPoint}>
              {t("deleteAccount.Accountsetting")}
            </Text>
            <Text style={styles.bulletPoint}>
              {t("deleteAccount.Allpersonalinformation")}
            </Text>
          </View>

          <Text style={styles.passwordLabel}>
            {t("deleteAccount.plzenterpasswordtoconfirm")}
          </Text>
          <PasswordInput value={password} onChangeText={setPassword} />

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteRequest}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.deleteButtonText}>
                {t("deleteAccount.deleteAccount")}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mainCancelButton}
            onPress={() => navigation.goBack()}
            >
            <Text style={styles.mainCancelButtonText}>
              {t("deleteAccount.cancel")}
            </Text>
          </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>

        {/* Confirmation Modal */}
        <Modal visible={showModal} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                {t("deleteAccount.deleteAccount")}
              </Text>
              <Text style={styles.modalSubTitle}>
                {t("deleteAccount.doyouwanttodelete")}
              </Text>

              <Text style={styles.modalText}>
                {t("deleteAccount.bydeleting")}
              </Text>

              <TouchableOpacity
                style={styles.confirmDeleteButton}
                onPress={handleDeleteConfirm}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.confirmDeleteButtonText}>
                    {t("deleteAccount.YesDeleteAccount")}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>
                  {t("deleteAccount.cancel")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </SafeAreaView>
  );
};

// const { height, width } = Dimensions.get('window');

export default DeleteAccountScreen;
