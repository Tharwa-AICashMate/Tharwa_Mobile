// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
// import { useAppSelector } from '@/redux/hook';
// import { RootState } from '@/redux/store';

// const StoreResult: React.FC = () => {
//   const { bestStoreResult, loading, error } = useAppSelector(
//     (state: RootState) => state.store
//   );

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.loadingText}>Finding the best store...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   if (!bestStoreResult) {
//     return null;
//   }

//   const { store, totalPrice, distance } = bestStoreResult;

//   const openMaps = () => {
//     const url = `https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`;
//     Linking.openURL(url);
//   };
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Best Store Found:</Text>
//       <View style={styles.storeInfo}>
//         <Text style={styles.storeName}>{store.name}</Text>
//         <Text style={styles.storeDetail}>
//           Distance: {distance.toFixed(2)} km
//         </Text>
//         <Text style={styles.storeDetail}>
//           Total Price: ${totalPrice.toFixed(2)}
//         </Text>
//       </View>

//       {/* Item Prices section removed as 'items' does not exist */}

//       <TouchableOpacity style={styles.mapsButton} onPress={openMaps}>
//         <Text style={styles.mapsButtonText}>Open in Maps</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: 15,
//     padding: 15,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 10,
//   },
//   loadingText: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: '#666',
//   },
//   errorText: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: 'red',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   storeInfo: {
//     marginBottom: 15,
//   },
//   storeName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   storeDetail: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 3,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   itemRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   itemName: {
//     fontSize: 16,
//   },
//   itemPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   mapsButton: {
//     backgroundColor: '#4285F4',
//     padding: 12,
//     borderRadius: 5,
//     marginTop: 15,
//     alignItems: 'center',
//   },
//   mapsButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default StoreResult;     
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store';
import Theme from '@/theme';

const StoreResult: React.FC = () => {
  const { bestStoreResult, loading, error } = useAppSelector(
    (state: RootState) => state.store
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Finding the best store...</Text>
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

  if (!bestStoreResult) {
    return null;
  }

  const { store, totalPrice, distance } = bestStoreResult;

  // عرض القيم كما هي بدون تقريب
  const formattedDistance = distance != null ? `${distance} km` : 'Distance not available';
  const formattedPrice = totalPrice != null ? `$${totalPrice}` : 'Price not available';

  const openMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Best Store Found:</Text>
      <View style={styles.storeInfo}>
        <Text style={styles.storeName}>{store.name}</Text>
        <Text style={styles.storeDetail}>
          Distance: {formattedDistance}
        </Text>
        <Text style={styles.storeDetail}>
          Total Price: {formattedPrice}
        </Text>
      </View>

      <TouchableOpacity style={styles.mapsButton} onPress={openMaps}>
        <Text style={styles.mapsButtonText}>Open in Maps</Text>
      </TouchableOpacity>
    </View>
  );
};

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
