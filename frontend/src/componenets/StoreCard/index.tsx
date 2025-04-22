
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Store } from '../../types/store';

interface StoreCardProps {
  store: Store;
  distance: number;
  totalPrice: number;
}

const StoreCard: React.FC<StoreCardProps> = ({ store, distance, totalPrice }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.storeName}>{store.name}</Text>
      
      {store.address && (
        <Text style={styles.storeAddress}>{store.address}</Text>
      )}
      
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Distance :</Text>
          <Text style={styles.infoValue}>{distance.toFixed(1)} m</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Total Price</Text>
          <Text style={[styles.infoValue, styles.priceValue]}>
            ${totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>
      
      {store.working_hours && (
        <Text style={styles.workingHours}>
          <Text style={styles.workingHoursLabel}>Hours: </Text>
          {store.working_hours}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  storeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  storeAddress: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  priceValue: {
    color: '#28a745',
  },
  workingHours: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 8,
  },
  workingHoursLabel: {
    fontWeight: '600',
  },
});

export default StoreCard;