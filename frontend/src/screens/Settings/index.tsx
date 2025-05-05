import React, { useEffect } from "react";
import {
  StyleSheet,
  I18nManager,
  View,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchUserSettings } from "../../redux/slices/settingsSlice";
import SettingsItem from "../../componenets/SettingsItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Theme from "@/theme";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import i18next from "./../../../services/i18next";

const { height, width } = Dimensions.get("window");

type SettingsScreenNavigationProp = any;

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { userSettings, loading } = useSelector(
    (state: RootState) => state.settings
  );
  const { t } = useTranslation();
  const isRTL = i18next.language === "ar" || I18nManager.isRTL;

  const handleBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    dispatch(fetchUserSettings());
  }, [dispatch]);

  return (
    <SafeAreaView
      style={[styles.container, { direction: isRTL ? "rtl" : "ltr" }]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.highlight}
        translucent={false}
      />
      <Header title={t("settings.settings")} />

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          {/* <SettingsItem
            title=" Notifications Settings"
            icon={
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#FECD3E"
              />
            }
            onPress={() => navigation.navigate("NotificationSettingsScreen")}
          /> */}
          <SettingsItem
            title={t("settings.passwordSettings")}
            icon={<Ionicons name="key-outline" size={20} color="#FECD3E" />}
            onPress={() => navigation.navigate("PasswordSettingsScreen")}
          />
          <SettingsItem
            title={t("settings.termsAndConditions")}
            icon={
              <Ionicons
                name="document-text-outline"
                size={20}
                color="#FECD3E"
              />
            }
            onPress={() => navigation.navigate("TermsAndConditions")}
          />
          {/* <SettingsItem
            title={t("settings.helpCenter")}
            icon={
              <Ionicons name="help-circle-outline" size={20} color="#FECD3E" />
            }
            onPress={() => navigation.navigate("HelpCenterScreen")}
          /> */}
          <SettingsItem
            title={t("settings.deleteAccount")}
            icon={<Ionicons name="trash-outline" size={20} color="#FECD3E" />}
            onPress={() => navigation.navigate("DeleteAccountScreen")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FECD3E",
  },
  header: {
    padding: 16,
    backgroundColor: "#FECD3E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: "white",
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    height: height,
    width: width,
    alignSelf: "center",
    padding: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default SettingsScreen;
