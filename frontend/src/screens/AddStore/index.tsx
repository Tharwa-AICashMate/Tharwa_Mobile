import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Linking,
  Platform,
  Alert,
} from "react-native";
import StoreForm from "@/componenets/StoreForm";
import { Store } from "@/types/store";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import Theme from "@/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  addStoreByLocation,
  fetchLocationSuggestions,
} from "@/redux/slices/storeThunk";
import StoreResultItem from "@/componenets/StoreResultItem";
import StoreLocationForm from "@/componenets/StoreLocationForm";
import { ScrollView } from "react-native-gesture-handler";
import StoreModal from "@/componenets/StoreModal";
import { getCurrentUserId } from "@/utils/auth";

const AddStorePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { locationSuggestions } = useAppSelector((state) => state.store);
  const [addMethod, setAddMethod] = useState<"name" | "location">("name");
  const [searchUrl, setSearchUrl] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loadingLocationSearch, setLoadingLocationSearch] = useState(false);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [userId,setUserID] = useState<string>()
  
  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  
  console.log(userId);
  const handleOpenMap = (lat: number, lon: number) => {
    const url = Platform.select({
      ios: `maps://?q=${lat},${lon}`,
      android: `geo:${lat},${lon}?q=${lat},${lon}`,
      default: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
    });

    Linking.openURL(url).catch((err) => console.log("Error opening map:", err));
  };

  useEffect(()=>{
    if(!userId)
    getCurrentUserId().then(res => {
      setUserID(res);
    })
  },[userId])

  // Modified to prepare store data for modal
  const handleAddStoreClick = (result) => {
    setSelectedStore({
      name: result.name,
      city: result.city,
      country: result.country,
      latitude: result.latitude,
      longitude: result.longitude,
    });
    setModalVisible(true);
  };

  // This gets called when the modal is submitted
  const handleAddStore = (storeData) => {
    console.log(storeData,selectedStore)
    setSearchResults([])
    dispatch(
      addStoreByLocation({
        name: storeData.name,
        latitude: selectedStore.latitude,
        longitude: selectedStore.longitude,
        city: storeData.city,
        country: storeData.country,
        userId: userId,
      })
    )
      .unwrap()
      .then(() => {
        console.log("Store added successfully");
      })
      .catch((error) => {
        console.error("Failed to add store:", error);
        Alert.alert(t("common.error"), t("addStoreScreen.failedToAddStore"));
      });
  };

  const handleSearchByLocation = async () => {
    setLoadingLocationSearch(true);
    try {
      if (!searchUrl.trim()) {
        Alert.alert("Please enter a valid Google Maps URL");
      }
      await dispatch(fetchLocationSuggestions(searchUrl)).unwrap();
    } catch (error) {
      console.log("Error searching by location:", error);

      // Add an error state to display to the user
    } finally {
      setLoadingLocationSearch(false);
    }
  };
  
  useEffect(() => {
    setSearchResults(locationSuggestions);
  }, [locationSuggestions]);
  
  const extractAndSearchLocation = async (url: string) => {
    console.log("Searching for location:", url);
    return [];
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title={t("addStoreScreen.addStore")} />
      <View style={styles.content}>
        {/* <StoreForm onSuccess={handleSuccess} /> */}
        <View>
          <Text style={styles.searchText}>
            {t("addStoreScreen.howToAddStore")}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setAddMethod("name")}
              style={[
                styles.actionButton,
                addMethod === "name" && styles.activeButton,
              ]}
            >
              <Text style={styles.buttonText}>
                {t("addStoreScreen.byName")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAddMethod("location")}
              style={[
                styles.actionButton,
                addMethod === "location" && styles.activeButton,
              ]}
            >
              <Text style={styles.buttonText}>
                {t("addStoreScreen.byLocation")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {addMethod === "name" ? (
            <StoreForm onSuccess={()=>{}} />
        ) : (
          <View style={[styles.searchByLocationContainer, {direction:isRTL?'rtl':'ltr'}]}>
            <TextInput
              placeholder={t("addStoreScreen.pasteGoogleMapsURL")}
              value={searchUrl}
              onChangeText={setSearchUrl}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearchByLocation}
              disabled={loadingLocationSearch}
            >
              <Text style={styles.buttonText}>
                {loadingLocationSearch
                  ? t("addStoreScreen.searching")
                  : t("addStoreScreen.search")}
              </Text>
            </TouchableOpacity>

            {loadingLocationSearch && (
              <Text>{t("addStoreScreen.searchingForNearbyStores")}</Text>
            )}
            {searchResults.locations?.length > 0 && (
              <ScrollView style={styles.suggestionsContainer}>
                <Text style={styles.suggestionsTitle}>{t("addStoreScreen.searchResults")}:</Text>
                {searchResults.locations?.map((result, index) => (
                  <StoreResultItem
                    key={index}
                    name={result.name}
                    address={
                      result.address_line2 ||
                      `${result.city}, ${result.country}`
                    }
                    lat={result.latitude}
                    lon={result.longitude}
                    onAddPress={() => handleAddStoreClick(result)}
                    onMapPress={(lat, lon) => handleOpenMap(result.latitude, result.longitude)}
                    isRTL={i18n.language === "ar"}
                  />
                ))}
              </ScrollView>
            )}
          </View>
        )}
      </View>
      
      {/* Store Modal */}
      {selectedStore && (
        <StoreModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleAddStore}
          initialData={{
            name: selectedStore.name,
            city: selectedStore.city,
            country: selectedStore.country,
          }}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
  },
  content: {
    flexGrow: 1,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    paddingTop: 40,
    backgroundColor: Theme.colors.background,
  },
  searchText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  suggestionsContainer: {
    marginTop: 16,
    flex: 1,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 0,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    overflow: "hidden",
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  activeButton: {
    backgroundColor: "#FFC937",
  },
  buttonText: {
    color: "#333",
    fontWeight: "500",
    fontSize: 14,
  },
  searchByNameContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  searchByLocationContainer: {
    padding: 16,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "white",
  },
  searchButton: {
    backgroundColor: Theme.colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  resultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  resultsContainer: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
});

export default AddStorePage;