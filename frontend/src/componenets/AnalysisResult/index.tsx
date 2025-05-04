import React from "react";
import { View, Text, StyleSheet ,I18nManager} from "react-native";
import Theme from "@/theme";
import Markdown from "react-native-markdown-display";
import { useTranslation } from "react-i18next";
import i18next from "./../../../services/i18next";
const isRTL = i18next.language === 'ar' || I18nManager.isRTL;

const AnalysisResultView: React.FC<{ result: string }> = ({ result }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Markdown>{result.replace(/```(markdown)?/, "")}</Markdown>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    direction: isRTL ? "rtl" : "ltr",
    padding: 16,
    backgroundColor: Theme.colors.background,
    borderRadius: 8,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Theme.colors.primary,
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Theme.colors.primary,
    marginBottom: 5,
  },
});
export default AnalysisResultView;
