import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Theme from "@/theme";
import { useTranslation } from "react-i18next";

interface AnalysisContentProps {
  onAnalyze: (message: string) => void;
  isLoading?: boolean;
}

const AnalysisContent = ({ onAnalyze, isLoading }: AnalysisContentProps) => {
  const [message, setMessage] = useState("");
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          { 
            textAlign: isRTL ? 'right' : 'left',
            writingDirection: isRTL ? 'rtl' : 'ltr'
          }
        ]}
        placeholder={t("SmartGrocery.enterMessage")}
        placeholderTextColor={Theme.colors.primary}
        multiline={true}
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => onAnalyze(message)}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? t("SmartGrocery.analyzing") : t("SmartGrocery.analyzing")}
        </Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 100,
    width: 300,
    marginBottom: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Theme.colors.secondery,
    textAlignVertical: 'top',
    
  },
  button: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    width:300,
    backgroundColor: Theme.colors.primary,
    borderRadius: 20,
    textAlign: "center",
    paddingVertical: 10,
    color: Theme.colors.textLight,
  },
  buttonText: {
    color: Theme.colors.textLight,
    textAlign: "center",
  }

});

export default AnalysisContent;
