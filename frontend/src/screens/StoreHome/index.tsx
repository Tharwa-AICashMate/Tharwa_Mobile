
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store';
import { findBestStore } from '@/redux/slices/storeThunk';
import LocationDisplay from '@/componenets/LocationDisplay';
import GroceryInput from '@/componenets/GroceryInput';
import GroceryList from '@/componenets/GroceryList';
import StoreResult from '@/componenets/StoreResult';
import SearchRadiusSelector from '@/componenets/SearchRadiusSelector';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '@/theme';
import { useNavigation } from '@react-navigation/native';
import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle';

const StoreScreen: React.FC = () => {
  const dispatch = useAppDispatch();  
  const [loading, setLoading] = React.useState(false); 
    const navigation = useNavigation();
  
  const { items } = useAppSelector((state) => state.grocery);
  const { userLocation, locationDetected, searchRadius } = useAppSelector((state) => state.store);

  const handleFindBestStore = async () => {
    setLoading(true); 
    await dispatch(findBestStore()); 
    setLoading(false); 
  };
  const handleBack = () => {
    navigation.goBack();
  };

  const canSearch = items.length > 0 && locationDetected;

  return (
    <SafeAreaView style={styles.safeArea}>
            <Header title="Smart Grocery Offers" />
            <LocationDisplay />

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          
          
          <SearchRadiusSelector />
          
          <GroceryInput />
          <GroceryList />
          
          <TouchableOpacity
  style={[
    styles.findButton,
    !canSearch && styles.disabledButton
  ]}
  onPress={handleFindBestStore}
  disabled={!canSearch || loading}
>
  {loading ? (
    <ActivityIndicator color="white" />
  ) : (
    <Text style={styles.findButtonText}>
      Find Best Store ({searchRadius}km)
    </Text>
  )}
</TouchableOpacity>          
          <StoreResult />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: Theme.colors.background,
    paddingTop: 40,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  findButton: {
    backgroundColor: Theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 15,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  findButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default StoreScreen;
