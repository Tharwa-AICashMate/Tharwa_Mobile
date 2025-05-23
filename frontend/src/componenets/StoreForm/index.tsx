import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Pressable,
  Platform,
  PermissionsAndroid,
  Linking,
  ActivityIndicator,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { resetAddStoreStatus } from "@/redux/slices/storeSlice";
import { addStore } from "@/redux/slices/storeThunk";
import axios from "axios";
import { RootState } from "@/redux/store";
import { Store } from "@/types/store";
import Geolocation from "react-native-geolocation-service";
import Icon from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Theme from "@/theme";
import * as Location from "expo-location";
import { useTranslation } from "react-i18next";
import StoreResultItem from "@/componenets/StoreResultItem";
import { LocationSearchResult } from "@/types/store";
import { getCurrentUserId } from "@/utils/auth";

interface StoreFormProps {
  onSuccess: (newStore: Store) => void;
  searchMethod: "name";
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
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const dynamicStyles = {
    buttonsContainer: {
      flexDirection: isRTL ? "row-reverse" : ("row" as const),
    },
    input: {
      textAlign: (isRTL ? "right" : "left") as "right" | "left",
    },
    searchButton: {
      marginLeft: isRTL ? 0 : 200,
      marginRight: isRTL ? 200 : 0,
    },
  };

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<GeoapifySuggestion[]>([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [addedStore, setAddedStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleOpenMap = (lat: number, lon: number) => {
    const url = Platform.select({
      ios: `maps://?q=${lat},${lon}`,
      android: `geo:${lat},${lon}?q=${lat},${lon}`,
      default: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
    });

    Linking.openURL(url).catch((err) => console.log("Error opening map:", err));
  };
  console.log(userLocation);
  const dispatch = useAppDispatch();
  const [userId,setUserID] = useState<string>()
  const { addStoreStatus, addStoreError, newlyAddedStore } = useAppSelector(
    (state: RootState) => state.store
  );

  useEffect(() => {
    if (addStoreStatus === "succeeded" && newlyAddedStore) {
      setAddedStore(newlyAddedStore);
      setShowSuccessModal(true);
      onSuccess(newlyAddedStore);
      dispatch(resetAddStoreStatus());
    }
  }, [addStoreStatus, newlyAddedStore, onSuccess, dispatch]);

  useEffect(()=>{
      if(!userId)
      getCurrentUserId().then(res => {
        setUserID(res);
      })
    },[userId])
  useEffect(() => {
    const getLocation = async () => {
      if (Platform.OS === "web") {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setUserLocation({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              });
            },
            (error) => {
              console.log(error);
              setLocationError("Could not get your location");
            }
          );
        } else {
          setLocationError("Geolocation is not supported by your browser");
        }
      } else {
        // Handle mobile geolocation
        const requestLocationPermission = async () => {
          if (Platform.OS === "android") {
            try {
              // Request permission
              const { status } =
                await Location.requestForegroundPermissionsAsync();

              if (status === "granted") {
                // Get current location
                const location = await Location.getCurrentPositionAsync({
                  accuracy: Location.Accuracy.High,
                });

                setUserLocation({
                  lat: location.coords.latitude,
                  lon: location.coords.longitude,
                });
              } else {
                setLocationError("Location permission denied");
              }
            } catch (error) {
              console.warn(error);
              setLocationError("Failed to request location permission");
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
      let apiUrl = `https://api.geoapify.com/v2/places?categories=commercial,catering,building.commercial&limit=10&apiKey=96ecf8f42d3846bd8af23d2cbe7b4e67`;

      if (searchQuery.trim()) {
        apiUrl += `&name=${encodeURIComponent(searchQuery.trim())}`;
      }

      if (userLocation) {
        apiUrl += `&filter=circle:${userLocation.lon},${userLocation.lat},5000&bias=proximity:${userLocation.lon},${userLocation.lat}`;
      }
      console.log(apiUrl);
      setLoading(true);
      const response = await axios.get(apiUrl);
      setSuggestions(response.data.features);
    } catch (error) {
      console.log("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStore = (suggestion: GeoapifySuggestion) => {
    if (!userId) {
      console.log("User not authenticated");
      return;
    }

    const { name, lat, lon, city, country } = suggestion.properties;
    dispatch(
      addStore({
        name,
        latitude: lat,
        longitude: lon,
        city: city || "Unknown",
        country: country || "Unknown",
        userId: userId,
      })
    );
    setSuggestions([]);
    setSearchQuery("");
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
            <Text style={styles.modalTitle}>
              {t("addStoreScreen.thankYou")}
            </Text>
            <Text style={styles.modalText}>
              {t("addStoreScreen.storeAdded", { storeName: addedStore?.name })}
            </Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setShowSuccessModal(false)}
            >
              <Text style={styles.modalButtonText}>
                {t("addStoreScreen.ok")}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {locationError && (
        <Text style={styles.warningText}>
          {t("addStoreScreen.locationNote")}
        </Text>
      )}

      <View style={styles.searchSection}>
        <TextInput
          style={[styles.input, dynamicStyles.input]}
          placeholder={t("addStoreScreen.enterStoreName")}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={[styles.searchButton]} onPress={handleSearch}>
          <Text style={styles.buttonText}>{t("addStoreScreen.search")}</Text>
        </TouchableOpacity>
      </View>

      {suggestions.length > 0 ? (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>
            {t("addStoreScreen.searchResults")}
          </Text>
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <StoreResultItem
                name={item.properties.name}
                address={item.properties.address_line2}
                lat={item.properties.lat}
                lon={item.properties.lon}
                onAddPress={() => handleAddStore(item)}
                onMapPress={(lat, lon) => handleOpenMap(lat, lon)}
                isRTL={isRTL}
              />
            )}
          />
        </View>
      ) : loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFC107" />
        </View>
      ) : (
        <Text style={[styles.hintText, {direction:isRTL?'rtl':'ltr'}]}>
          {searchQuery
            ? t("addStoreScreen.noStoresFound")
            : t("addStoreScreen.enterStoreNameToSearch")}
        </Text>
      )}

      {addStoreStatus === "loading" && (
        <Text style={styles.loadingText}>
          {t("addStoreScreen.addingStore")}
        </Text>
      )}
      {addStoreStatus === "failed" && (
        <Text style={styles.errorText}>{addStoreError}</Text>
      )}
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
    fontWeight: "bold",
    marginBottom: 16,
  },
  warningText: {
    color: "orange",
    marginBottom: 12,
  },
  searchSection: {
    flexDirection: "column",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.secondery,
    borderRadius: 10,
    padding: 5,
    marginRight: 8,
    marginBottom: 15,
    fontSize: 16,
    height: 50,
    alignItems: "center",
    color: Theme.colors.text,
  },
  searchButton: {
    backgroundColor: Theme.colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    minHeight: 50,
  },
  buttonText: {
    color: "#333",
    fontWeight: "500",
    fontSize: 14,
  },
  suggestionsContainer: {
    marginTop: 16,
    flex: 1,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  suggestionItem: {
    padding: 16,
    backgroundColor: Theme.colors.secondery,
    borderRadius: 8,
    marginBottom: 12,
  },
  suggestionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  buttonsContainer: {
    justifyContent: "space-around",
    marginTop: 10,
  },
  actionButton: {
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  addButton: {
    width: 150,
    backgroundColor: Theme.colors.primary,
    textAlign: "center",
  },
  mapButton: {
    width: 150,
    backgroundColor: Theme.colors.secondery,
  },
  buttontext: {
    color: "rgba(32, 32, 99, 1)",
    fontSize: 14,
    fontWeight: "500",
  },
  storeName: {
    fontSize: 16,
    fontWeight: "500",
  },
  addressText: {
    color: "#666",
    fontSize: 14,
    marginTop: 4,
  },
  hintText: {
    color: "#888",
    textAlign: "center",
    marginTop: 16,
    fontStyle: "italic",
  },
  loadingText: {
    color: "#007bff",
    marginTop: 8,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginTop: 8,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 15,
    color: "#333",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#555",
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    padding: 12,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default StoreForm;
