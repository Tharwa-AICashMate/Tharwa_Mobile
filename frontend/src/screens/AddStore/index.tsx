
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StoreForm from '@/componenets/StoreForm';
import { Store } from '@/types/store';
import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import Theme from '@/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from "react-i18next";

const AddStorePage: React.FC = () => {
  const handleSuccess = (newStore: Store) => {
  };
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  return (
    <SafeAreaView style={styles.container}>
      <Header title={t("addStoreScreen.addStore")} />
      <View style={styles.content}>
      <StoreForm onSuccess={handleSuccess} />

      </View>
    </SafeAreaView>
  );
};
const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
  },
  content:{
    flexGrow: 1, 
    borderTopLeftRadius:80,
    borderTopRightRadius:80,
    paddingTop:40,
    backgroundColor: Theme.colors.background,
  }
 
})

export default AddStorePage;
