
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsItem from "../../componenets/SettingsItem";
import ToggleSwitch from "../../componenets/ToggleSwitch";
import { NotificationSettings } from "../../types/settings.types";
import { useNavigation } from "@react-navigation/native";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import Theme from "@/theme";

const { height, width } = Dimensions.get("window");

type SettingsScreenNavigationProp = any;

const NotificationSettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const [settings, setSettings] = useState<NotificationSettings>({
    generalNotification: true,
    sound: true,
    soundCall: true,
    vibrate: true,
    transactionUpdate: false,
    expenseReminder: false,
    budgetNotifications: false,
    lowBalanceAlerts: false,
  });

  const handleToggle =
    (key: keyof NotificationSettings) => (value: boolean) => {
      const updatedSettings = { ...settings, [key]: value };
      setSettings(updatedSettings);
    };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        style="light"
        backgroundColor={Theme.colors.highlight}
        translucent={false}
      />
      <Header title="Notification Settings" />

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <SettingsItem
            title="General Notification"
            onPress={() => {}}
            showArrow={false}
            rightElement={
              <ToggleSwitch
                value={settings.generalNotification}
                onValueChange={handleToggle("generalNotification")}
              />
            }
          />

          {/* <SettingsItem
            title="Sound"
            onPress={() => {}}
            showArrow={false}
            rightElement={
              <ToggleSwitch
                value={settings.sound}
                onValueChange={handleToggle("sound")}
              />
            }
          />

          <SettingsItem
            title="Sound Call"
            onPress={() => {}}
            showArrow={false}
            rightElement={
              <ToggleSwitch
                value={settings.soundCall}
                onValueChange={handleToggle("soundCall")}
              />
            }
          />

          <SettingsItem
            title="Vibrate"
            onPress={() => {}}
            showArrow={false}
            rightElement={
              <ToggleSwitch
                value={settings.vibrate}
                onValueChange={handleToggle("vibrate")}
              />
            }
          /> */}

          <SettingsItem
            title="Transaction Update"
            onPress={() => {}}
            showArrow={false}
            rightElement={
              <ToggleSwitch
                value={settings.transactionUpdate}
                onValueChange={handleToggle("transactionUpdate")}
              />
            }
          />

          <SettingsItem
            title="Expense Reminder"
            onPress={() => {}}
            showArrow={false}
            rightElement={
              <ToggleSwitch
                value={settings.expenseReminder}
                onValueChange={handleToggle("expenseReminder")}
              />
            }
          />

          <SettingsItem
            title="Budget Notifications"
            onPress={() => {}}
            showArrow={false}
            rightElement={
              <ToggleSwitch
                value={settings.budgetNotifications}
                onValueChange={handleToggle("budgetNotifications")}
              />
            }
          />

          <SettingsItem
            title="Low Balance Alerts"
            onPress={() => {}}
            showArrow={false}
            rightElement={
              <ToggleSwitch
                value={settings.lowBalanceAlerts}
                onValueChange={handleToggle("lowBalanceAlerts")}
              />
            }
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
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: "white",
    padding: 40,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    height: height,
    width: width,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default NotificationSettingsScreen;
