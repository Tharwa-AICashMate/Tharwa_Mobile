import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Linking,
  Platform,
} from "react-native";
import StoreForm from "@/componenets/StoreForm";
import { Store } from "@/types/store";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import Theme from "@/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addStoreByLocation, fetchLocationSuggestions } from "@/redux/slices/storeThunk";
import StoreResultItem from "@/componenets/StoreResultItem";
const AddStorePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { locationSuggestions } = useAppSelector((state) => state.store);
  const [addMethod, setAddMethod] = useState<"name" | "location">("name");
  const [searchUrl, setSearchUrl] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]); 
  const [loadingLocationSearch, setLoadingLocationSearch] = useState(false);

  const handleOpenMap = (lat: number, lon: number) => {
    const url = Platform.select({
      ios: `maps://?q=${lat},${lon}`,
      android: `geo:${lat},${lon}?q=${lat},${lon}`,
      default: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
    });
  
    Linking.openURL(url).catch((err) => console.log("Error opening map:", err));
  };

  const handleAddStore = (result: any) => {
    const userId = "6ff828c1-a284-4aaf-a24f-4387a20dda5e"; 
  
    dispatch(
      addStoreByLocation({
        name: result.name,
        lat: result.latitude,
        lon: result.longitude,
        city: result.city,
        country: result.country,
        userId: userId
      })
    ).unwrap()
      .then(() => {
        console.log("Store added successfully");
      })
      .catch((error) => {
        console.error("Failed to add store:", error);
      });
  };
  const handleSearchByNameSuccess = (newStore: Store) => {
    // console.log("Store added by name successfully:", newStore);
  };
  const handleSearchByLocation = async () => {
    setLoadingLocationSearch(true);
    try {
      if (!searchUrl.trim()) {
        throw new Error("Please enter a valid Google Maps URL");
      }
      await dispatch(fetchLocationSuggestions(searchUrl)).unwrap();
    } catch (error) {
      console.error("Error searching by location:", error);
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

  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <SafeAreaView style={styles.container}>
      <Header title={t("addStoreScreen.addStore")} />

      <View style={styles.content}>
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
              <Text style={styles.buttonText}>{t("addStoreScreen.byName")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAddMethod("location")}
              style={[
                styles.actionButton,
                addMethod === "location" && styles.activeButton,
              ]}
            >
              <Text style={styles.buttonText}>{t("addStoreScreen.byLocation")}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {addMethod === "name" ? (
          <View style={styles.searchByNameContainer}>
            <StoreForm onSuccess={handleSearchByNameSuccess} />
          </View>
        ) : (
          <View style={styles.searchByLocationContainer}>
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
            {searchResults.length > 0 && (
              <View>
                <Text>{t("addStoreScreen.searchResults")}:</Text>
                {searchResults.map((result, index) => (
                    <StoreResultItem
                    key={index}
                    name={result.name}
                    address={result.address_line2 || `${result.city}, ${result.country}`}
                    lat={result.lat}
                    lon={result.lon}
                    onAddPress={() => handleAddStore(result)}
                    onMapPress={(lat, lon) => handleOpenMap(lat, lon)}
                    isRTL={i18n.language === "ar"}
                  />
                ))}
              </View>
            )}
          </View>
        )}
      </View>
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
    marginTop: 20,
    paddingHorizontal: 20,
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
  }, resultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  resultsContainer: {
    marginTop: 16,
    paddingHorizontal: 20,
  }
});

export default AddStorePage;
