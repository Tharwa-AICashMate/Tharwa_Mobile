import React, { useState } from 'react';
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  GestureResponderEvent,
  I18nManager,
} from 'react-native';
import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import Theme from '@/theme';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';


const TermsAndConditions: React.FC = () => {
  const isRTL = i18next.language === 'ar' || I18nManager.isRTL;
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const {t}=useTranslation()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Theme.colors.highlight,
    },
    contentContainer: {
      flex: 1,
      backgroundColor: Theme.colors.background,
      borderTopLeftRadius: 60,
      borderTopRightRadius: 60,
      paddingTop: 40,
      paddingHorizontal: 25,
      marginTop: 10,
    },
    scrollView: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: isRTL ? 'right' : 'left',
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
    paragraphContainer: {
      marginBottom: 16,
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
    fixedWidthText: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: 'monospace',
      color: '#333',
      textAlign: isRTL ? 'right' : 'left',
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
    listContainer: {
      marginBottom: 16,
    },
    listItem: {
      fontSize: 14,
      lineHeight: 22,
      paddingLeft: 8,
      color: '#333',
      textAlign: isRTL ? 'right' : 'left',
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
    readMoreText: {
      fontSize: 14,
      marginVertical: 20,
      textAlign: isRTL ? 'right' : 'left',
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
    link: {
      color: '#3299FF',
      textDecorationLine: 'underline',
      textAlign: isRTL ? 'right' : 'left',
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
    footer: {
      paddingVertical: 20,
    },
    checkboxContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderWidth: 2,
      borderColor: '#00D09E',
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: isRTL?0:10,
      marginLeft: isRTL?10:0,
    },
    checkboxChecked: {
      backgroundColor: Theme.colors.highlight,
    },
    checkmark: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    checkboxLabel: {
      fontSize: 14,
      textAlign: isRTL ? 'right' : 'left',
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
    acceptButton: {
      backgroundColor: Theme.colors.highlight,
      borderRadius: 24,
      paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    acceptButtonDisabled: {
      backgroundColor: '#A0E5D3',
    },
    acceptButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  const toggleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  const handleAccept = () => {
    console.log('Terms accepted:', isChecked);
  };

  const openUrl = (url: string) => {
    Linking.openURL(url).catch((err) => console.log('An error occurred', err));
  };


  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor={Theme.colors.highlight} translucent={false} />
      <Header title={t("settings.termsAndConditions")} />
      <View style={styles.contentContainer}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>{t("termsAndConditions.title")}</Text>

          <View style={styles.paragraphContainer}>
           
              <Text  style={styles.fixedWidthText}>
                {t("termsAndConditions.termsAndConditionsText")}
              </Text>
            
          </View>

          <Text style={styles.readMoreText}>
            {t("termsAndConditions.readMore")}{' '}
            <Text style={styles.link} onPress={() => openUrl('https://www.finwiseapp.de')}>
              www.finwiseapp.de
            </Text>
          </Text>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
            <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
              {isChecked && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>{t("termsAndConditions.accept")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.acceptButton, !isChecked && styles.acceptButtonDisabled]}
            onPress={handleAccept}
            disabled={!isChecked}
          >
            <Text style={styles.acceptButtonText}>{t("termsAndConditions.acceptButton")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TermsAndConditions;
