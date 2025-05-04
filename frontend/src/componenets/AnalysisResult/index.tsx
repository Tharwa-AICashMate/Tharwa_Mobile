import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '@/theme';
import Markdown from 'react-native-markdown-display';
import { useTranslation } from 'react-i18next';


  
  const AnalysisResultView: React.FC<{ result: string }> = ({ result }) => {
      const { t, i18n } = useTranslation();
      const isRTL = i18n.language === 'ar';
    return (
      <View style={styles.container}>
        <Markdown>
          {result.replace(/```(markdown)?/,"")}
        </Markdown>
      </View>
    );
  };
  
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Theme.colors.background,
    borderRadius: 8,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.primary,
    marginBottom: 5,
  },
});
export default AnalysisResultView;