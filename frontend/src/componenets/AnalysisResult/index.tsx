import React from "react";
import { View,  StyleSheet } from "react-native";
import Theme from "@/theme";
import Markdown from "react-native-markdown-display";

const AnalysisResultView: React.FC<{ result: string }> = ({ result }) => {
  const isRTL = containsArabic(result);
  return (
    <View style={[styles.container,{ direction:isRTL?'rtl':'ltr'}]}>
      <Markdown>{result.replace(/```(markdown)?/g, "")}</Markdown>
    </View>
  );
};
function containsArabic(text: string): boolean {
  if (typeof text !== 'string' || text.length === 0) {
    return false; 
  }
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text);
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
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
