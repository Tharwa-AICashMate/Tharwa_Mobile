   
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store';
import Theme from '@/theme';
import { useTranslation } from 'react-i18next';

const StoreResult: React.FC = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
  const { bestStoreResult, loading, error } = useAppSelector(
    (state: RootState) => state.store
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>{t("SmartGrocery.findingBestStore")}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!bestStoreResult?.length) {
    return null;
  }

  //const { store, totalPrice, distance } = bestStoreResult;

  // عرض القيم كما هي بدون تقريب
  //const formattedDistance = distance != null ? `${distance} km` : 'Distance not available';
  //const formattedPrice = totalPrice != null ? `$${totalPrice}` : 'Price not available';

  const openMaps = (st) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${st.latitude},${st.longitude}`;
    Linking.openURL(url);
  };
  console.log('bestResults-----------',bestStoreResult)

  return (
    <View>
      {bestStoreResult?.map((store, index) => (
        <View key={index} style={styles.container}>
          <Text style={styles.title}>{t("SmartGrocery.bestStoresFound")}</Text>
          <View style={styles.storeInfo}>
            <Text style={styles.storeName}>{store.store.name}</Text>
            <Text style={styles.storeDetail}>
              Distance: {store.distance != null ? `${store.distance} km` : `{t("SmartGrocery.distanceNotAvailable")}`}
            </Text>
            <Text style={styles.storeDetail}>
              Total Price: {store.totalPrice != null ? `$${store.totalPrice}` : `{t("SmartGrocery.priceNotAvailable")}`}
            </Text>
          </View>
  
          <TouchableOpacity style={styles.mapsButton} onPress={() => openMaps(store.store)}>
            <Text style={styles.mapsButtonText}>{t("SmartGrocery.openInMaps")}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
  

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  storeInfo: {
    marginBottom: 15,
  },
  storeName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  storeDetail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 3,
  },
  mapsButton: {
    backgroundColor: Theme.colors.primary,
    padding: 12,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
  },
  mapsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default StoreResult;
