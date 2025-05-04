import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  I18nManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import AccordionItem from "../../componenets/AccordionItem";
import CategoryTabs from "../../componenets/CategoryTab";
import { SafeAreaView } from "react-native-safe-area-context";
import Theme from "../../theme";
import Header from "../../componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import { useTranslation } from "react-i18next";
import i18next from "./../../../services/i18next";
const isRTL = i18next.language === "ar" || I18nManager.isRTL;

const HelpCenterScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const { t } = useTranslation();
  const staticFAQs = [
    {
      id: "1",
      question: t("generalFAQs.howDoIStartSaving_Q"),
      answer: t("generalFAQs.howDoIStartSaving_A"),
      category: t("help.general"),
    },
    {
      id: "2",
      question: t("generalFAQs.howMuchDoesItCostToUseTharwa_Q"),
      answer: t("generalFAQs.howMuchDoesItCostToUseTharwa_A"),
      category: t("help.general"),
    },
    {
      id: "3",
      question: t("generalFAQs.howToContactSupport_Q"),
      answer: t("generalFAQs.howToContactSupport_A"),
      category:  t("help.general"),
    },
    {
      id: "4",
      question: t("accountFAQs.howToChangePassword_Q"),
      answer: t("accountFAQs.howToChangePassword_Q"),
      category: t("help.account")
    },
    {
      id: "5",
      question: t("accountFAQs.howToUpdateMySettings_Q"),
      answer: t("accountFAQs.howToUpdateMySettings_A"),
      category: t("help.account")
    },
    {
      id: "6",
      question: t("accountFAQs.howToDeleteAccount_Q"),
      answer: t("accountFAQs.howToDeleteAccount_A"),
      category: t("help.account")
    },
    {
      id: "7",
      question: t("accountFAQs.howToUpdateMyProfile_Q"),
      answer: t("accountFAQs.howToUpdateMyProfile_A"),
      category: t("help.account")
    },
    {
      id: "8",
      question: t("servicesFAQs.howToAccessTransactionsHistory_Q"),
      answer: t("servicesFAQs.howToUpdateMyProfile_A"),
      category: t("help.services")
    },
    {
      id: "9",
      question: t("servicesFAQs.CanUseAppOffline_Q"),
      answer: t("servicesFAQs.CanUseAppOffline_A"),
      category: t("help.services")
    },
  ];

  const filteredFAQs = useMemo(() => {
    return staticFAQs
      .filter((faq) => faq.category === selectedCategory)
      .filter((faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [searchQuery, selectedCategory]);

  const handleContactUsPress = () => {
    navigation.navigate("SupportChannelsScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.highlight}
        translucent={false}
      />
      <Header title={t("help.helpAndFAQs")} />
      <View style={styles.mainContent}>
        <Text style={styles.searchText}>{t("help.howCanWeHelpYou")}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.actionButton, styles.activeButton]}>
            <Text style={styles.buttonText}>{t("help.faq")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton]}
            onPress={handleContactUsPress}
          >
            <Text style={styles.buttonText}>{t("help.contactUs")}</Text>
          </TouchableOpacity>
        </View>

        <CategoryTabs
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search-outline"
            size={18}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#888"
          />
        </View>

        <ScrollView style={styles.faqList}>
          {filteredFAQs.map((faq) => (
            <AccordionItem key={faq.id} item={faq} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    direction: isRTL ? "rtl" : "ltr",
    backgroundColor: "#FECD3E",
    flex: 1,
  },
  mainContent: {
    flex: 1,
    backgroundColor: "white",
    padding: 40,
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
  },
  searchText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  searchInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 10,
    width: "100%",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 0,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    overflow: "hidden",
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  activeButton: {
    backgroundColor: "#FFC937",
  },
  buttonText: {
    color: "#333",
    fontWeight: "500",
    fontSize: 14,
  },
  faqList: {
    flex: 1,
    marginTop: 15,
  },
});

export default HelpCenterScreen;
