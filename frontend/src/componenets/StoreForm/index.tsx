import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal, Pressable, Platform, PermissionsAndroid, Linking } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { resetAddStoreStatus } from '@/redux/slices/storeSlice';
import { addStore } from '@/redux/slices/storeThunk';
import axios from 'axios';
import { RootState } from '@/redux/store';
import { Store } from '@/types/store';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Theme from '@/theme';

interface StoreFormProps {
  onSuccess: (newStore: Store) => void;
}

interface GeoapifySuggestion {
  properties: {
    name: string;
    lat: number;
    lon: number;
    city?: string;
    country?: string;
    address_line2?: string;
  };
}

const StoreForm: React.FC<StoreFormProps> = ({ onSuccess }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<GeoapifySuggestion[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [addedStore, setAddedStore] = useState<Store | null>(null);
  const handleOpenMap = (lat: number, lon: number) => {
    const url = Platform.select({
      ios: `maps://?q=${lat},${lon}`,
      android: `geo:${lat},${lon}?q=${lat},${lon}`,
      default: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
    });

    Linking.openURL(url).catch(err => 
      console.error('Error opening map:', err)
    );
  };
  
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { addStoreStatus, addStoreError, newlyAddedStore } = useAppSelector((state: RootState) => state.store);

  useEffect(() => {
    if (addStoreStatus === 'succeeded' && newlyAddedStore) {
      setAddedStore(newlyAddedStore);
      setShowSuccessModal(true);
      onSuccess(newlyAddedStore);
      dispatch(resetAddStoreStatus());
    }
  }, [addStoreStatus, newlyAddedStore, onSuccess, dispatch]);



useEffect(() => {
  const getLocation = async () => {
    if (Platform.OS === 'web') {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            });
          },
          (error) => {
            console.error(error);
            setLocationError('Could not get your location');
          }
        );
      } else {
        setLocationError('Geolocation is not supported by your browser');
      }
    } else {
      // Handle mobile geolocation
      const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              Geolocation.getCurrentPosition(
                (position) => {
                  setUserLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                  });
                },
                (error) => {
                  console.error(error);
                  setLocationError('Could not get your location');
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
              );
            }
          } catch (err) {
            console.warn(err);
          }
        }
      };
      requestLocationPermission();
    }
  };

  getLocation();
}, []);

  const handleSearch = async () => {
    try {
      let apiUrl = `https://api.geoapify.com/v2/places?categories=commercial.supermarket&limit=10&apiKey=96ecf8f42d3846bd8af23d2cbe7b4e67`;
      
      if (searchQuery.trim()) {
        apiUrl += `&name=${encodeURIComponent(searchQuery.trim())}`;
      }
      
      if (userLocation) {
        apiUrl += `&bias=proximity:${userLocation.lon},${userLocation.lat}`;
      }

      const response = await axios.get(apiUrl);
      setSuggestions(response.data.features);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleAddStore = (suggestion: GeoapifySuggestion) => {
    if (!user?.id) {
      console.error('User not authenticated');
      return;
    }

    const { name, lat, lon, city, country } = suggestion.properties;
    dispatch(addStore({
      name,
      latitude: lat,
      longitude: lon,
      city: city || 'Unknown',
      country: country || 'Unknown',
      userId: user.id,
    }));
    setSuggestions([]);
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSuccessModal}
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="check-circle" size={60} color={Theme.colors.primary} />
            <Text style={styles.modalTitle}>Thank You!</Text>
            <Text style={styles.modalText}>
              Store {addedStore?.name} has been added to your favorites!
            </Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setShowSuccessModal(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {locationError && (
        <Text style={styles.warningText}>
          Note: {locationError}. Search results may not be location-specific.
        </Text>
      )}

      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          placeholder="Search for stores by name..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      
      {suggestions.length > 0 ? (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Search Results:</Text>
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.suggestionItem}
                onPress={() => handleAddStore(item)}
              >
                <View style={styles.suggestionContent}>
                  <View style={styles.textContainer}>
                    <Text style={styles.storeName}>{item.properties.name}</Text>
                    {item.properties.address_line2 && (
                      <Text style={styles.addressText}>{item.properties.address_line2}</Text>
                    )}
                    <View style={styles.buttonsContainer}>
                    <TouchableOpacity 
                      style={[styles.actionButton, styles.addButton]}
                      onPress={() => handleAddStore(item)}
                    >
                      <Text style={styles.buttonText}>Add Store</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.actionButton, styles.mapButton]}
                      onPress={() => handleOpenMap(
                        item.properties.lat, 
                        item.properties.lon
                      )}
                    >
                      <Text style={styles.buttontext}>View in Map <EvilIcons name="arrow-right" size={24} color="rgba(32, 32, 99, 1)" /> </Text>
                    </TouchableOpacity>
                  </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <Text style={styles.hintText}>
          {searchQuery 
            ? 'No stores found. Try a different search term.' 
            : 'Enter a store name to search or allow location access for nearby stores.'}
        </Text>
      )}
      
      {addStoreStatus === 'loading' && <Text style={styles.loadingText}>Adding store...</Text>}
      {addStoreStatus === 'failed' && <Text style={styles.errorText}>{addStoreError}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  warningText: {
    color: 'orange',
    marginBottom: 12,
  },
  searchSection: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Theme.colors.secondery,
    borderRadius: 10,
    padding: 5,
    marginRight: 8,
    marginBottom: 15,
    fontSize: 16,
    alignItems: 'center',
    color:Theme.colors.text,
  },
  searchButton: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 16,
    marginLeft: 200,
    borderRadius: 10,
    paddingVertical:5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  suggestionsContainer: {
    marginTop: 16,
    flex: 1,
    paddingHorizontal: 16,
    borderRadius: 10,
   
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  suggestionItem: {
    padding: 16,
    backgroundColor: Theme.colors.secondery,
    borderRadius: 8,
    marginBottom: 12,
    
  },
  suggestionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: "space-around",
    marginTop: 10,
 
  },
  actionButton: {
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  addButton: {
    width: 150,
    backgroundColor: Theme.colors.primary,
    textAlign: 'center',
 
  },
  mapButton: {
    width: 150,
    backgroundColor: Theme.colors.secondery,
  },
  buttontext: {
    color: 'rgba(32, 32, 99, 1)',
    fontSize: 14,
    fontWeight: '500',
  
  },
  storeName: {
    fontSize: 16,
    fontWeight: '500',
  },
  addressText: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
  hintText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
  loadingText: {
    color: '#007bff',
    marginTop: 8,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 8,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StoreForm;
