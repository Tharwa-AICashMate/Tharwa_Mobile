import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CommonActions, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

type PasswordChangeConfirmScreenNavigationProp = any;

const PasswordChangeConfirmScreen: React.FC = () => {
  const navigation = useNavigation<PasswordChangeConfirmScreenNavigationProp>();
  const handleBack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "MainApp",
            state: {
              index: 1,
              routes: [
                {
                  name: "Home",
                },
                {
                  name: "Profile",
                  state: {
                    index: 0,
                    routes: [{ name: "ProfileMain" }, { name: "Settings" }],
                  },
                },
              ],
            },
          },
        ],
      })
    );
  };
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {t("PasswordChangeConfirm.PasswordChanged")}
        </Text>
        {/* <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity> */}
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={80} color="#00c781" />
        </View>

        <Text style={styles.title}>
          {t("PasswordChangeConfirm.changeSucesses")}
        </Text>
        <Text style={styles.description}>
          {t("PasswordChangeConfirm.sucessDetails")}
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>
            {t("PasswordChangeConfirm.return")}
          </Text>
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#FECD3E",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PasswordChangeConfirmScreen;
