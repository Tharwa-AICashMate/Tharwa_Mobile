

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Theme from "@/theme";
import styles from "./HeadericonsWithTitle.styles";
import { useTranslation } from "react-i18next";
import i18next from "../../../services/i18next";

interface HeaderProps {
  title: string;
  goBackTo?: string;
  bellNavigateTo?: string;
}

interface LanguageOption {
  code: string;
  label: string;
  nativeLabel: string;
}

export default function Header({
  title,
  goBackTo,
  bellNavigateTo,
}: HeaderProps) {
  const navigation = useNavigation<NavigationProp<any>>();
  const { t } = useTranslation();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const languages: LanguageOption[] = [
    { code: "en", label: "English", nativeLabel: "English" },
    { code: "ar", label: "Arabic", nativeLabel: "العربية" },
  ];

  const handleBack = () => {
    if (goBackTo) {
      navigation.navigate(goBackTo);
    } else {
      navigation.goBack();
    }
  };

  const changeLanguage = async (langCode: string) => {
    try {
      await i18next.changeLanguage(langCode);
      await AsyncStorage.setItem('user-language', langCode);
      setShowLanguageSelector(false);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  const renderLanguageItem = ({ item }: { item: LanguageOption }) => {
    const isSelected = i18next.language === item.code;

    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#f0f0f0",
          backgroundColor: isSelected ? "#f8f8f8" : "#fff",
        }}
        onPress={() => changeLanguage(item.code)}
      >
        <Text
          style={{
            fontWeight: isSelected ? "bold" : "normal",
            fontSize: 16,
            flex: 1,
            color: isSelected ? Theme.colors.primary : "#333",
          }}
        >
          {item.nativeLabel} ({item.label})
        </Text>
        {isSelected && (
          <Ionicons name="checkmark" size={22} color={Theme.colors.primary} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons
            name={i18next.language === "ar" ? "arrow-forward" : "arrow-back"}
            size={24}
            color={Theme.colors.secondery}
          />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
            <Ionicons
              name="camera-outline"
              size={20}
              color="black"
              style={styles.bellIcon}
            />
          </TouchableOpacity>

          {/* Language selector button */}
          <TouchableOpacity
            onPress={() => setShowLanguageSelector(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",

              backgroundColor: Theme.colors.secondery,

              padding: 4,
              borderRadius: 100,

              justifyContent: "center",
              margin: 2,
            }}
          >
            <Ionicons name="language" size={15} color={Theme.colors.text} />
            <Ionicons
              name="chevron-down"
              size={10}
              color={Theme.colors.text}
              style={{ marginLeft: 2 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Language selector modal */}
      <Modal
        visible={showLanguageSelector}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLanguageSelector(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPress={() => setShowLanguageSelector(false)}
        >
          <View
            style={{
              width: "80%",
              maxHeight: "50%",
              backgroundColor: "white",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#f0f0f0",
                backgroundColor: Theme.colors.primary,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 18, fontWeight: "bold" }}
              >
                {t("Select Language")}
              </Text>
            </View>

            <FlatList
              data={languages}
              renderItem={renderLanguageItem}
              keyExtractor={(item) => item.code}
            />

            <TouchableOpacity
              style={{
                padding: 16,
                alignItems: "center",
                borderTopWidth: 1,
                borderTopColor: "#f0f0f0",
              }}
              onPress={() => setShowLanguageSelector(false)}
            >
              <Text style={{ color: Theme.colors.primary, fontWeight: "bold" }}>
                {t("Cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
