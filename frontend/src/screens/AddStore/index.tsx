
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StoreForm from '@/componenets/StoreForm';
import { Store } from '@/types/store';
import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import Theme from '@/theme';

const AddStorePage: React.FC = () => {
  const handleSuccess = (newStore: Store) => {
  };

  return (
    <View style={styles.container}>
      <Header title="Add Store" />
      <View style={styles.content}>
      <StoreForm onSuccess={handleSuccess} />

      </View>
    </View>
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
