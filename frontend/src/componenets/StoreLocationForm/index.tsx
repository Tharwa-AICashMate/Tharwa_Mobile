import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Platform,
  Alert,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  addStoreByLocation,
  fetchLocationSuggestions,
} from "@/redux/slices/storeThunk";
// import { fetchLocationSuggestions } from "@/redux/slices/storeThunk";

import StoreResultItem from "@/componenets/StoreResultItem";
import { useTranslation } from "react-i18next";
import Theme from "@/theme";
import { Icon } from "react-native-vector-icons/Icon";
import { Store } from "@/types/store";

interface StoreLocationFormProps {
  onSuccess: () => void;
}

const StoreLocationForm: React.FC<StoreLocationFormProps> = ({ onSuccess }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { locationSuggestions } = useAppSelector((state) => state.store);
  const [searchUrl, setSearchUrl] = React.useState("");
  const [loadingLocationSearch, setLoadingLocationSearch] =
    React.useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [addedStore, setAddedStore] = useState<Store | null>(null);
  const [showNameModal, setShowNameModal] = useState(false);
  const [tempStore, setTempStore] = useState<any>(null);
  const [customStoreName, setCustomStoreName] = useState("");
  const handleOpenMap = (lat: number, lon: number) => {
    const url = Platform.select({
      ios: `maps://?q=${lat},${lon}`,
      android: `geo:${lat},${lon}?q=${lat},${lon}`,
      default: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
    });

    Linking.openURL(url).catch((err) => console.log("Error opening map:", err));
  };

  const handleAddStore = (result: any) => {
    setTempStore(result);
    setShowNameModal(true);
  };
  const confirmAddStore = () => {
    if (!customStoreName.trim()) {
      Alert.alert(t("addStoreScreen.enterStoreName"));
      return;
    }

    const userId = "6ff828c1-a284-4aaf-a24f-4387a20dda5e";
    console.log("Payload being sent:", {
      name: customStoreName,
      lat: tempStore.latitude,
      lon: tempStore.longitude,
      city: tempStore.city,
      country: tempStore.country,
      userId: "6ff828c1-a284-4aaf-a24f-4387a20dda5e",
    });
    dispatch(
      addStoreByLocation({
        name: customStoreName,
        latitude: tempStore.latitude,
        longitude: tempStore.longitude,
        city: tempStore.city,
        country: tempStore.country,
        userId: userId,
        // userId:"6ff828c1-a284-4aaf-a24f-4387a20dda5e"
      })
    )
      .unwrap()
      .then(() => {
        console.log("Store added successfully");
        onSuccess();
      });
    console.error("Failed to add store details:", {
      error,
      response: error.response?.data, // إذا كنت تستخدم axios
    });
  };

  const handleSearchByLocation = async () => {
    setLoadingLocationSearch(true);
    try {
      if (!searchUrl.trim()) {
        Alert.alert(t("addStoreScreen.invalidUrl"));
        return;
      }
      await dispatch(fetchLocationSuggestions(searchUrl)).unwrap();
    } catch (error) {
      console.log("Error searching by location:", error);
    } finally {
      setLoadingLocationSearch(false);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showNameModal}
        onRequestClose={() => setShowNameModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {t("addStoreScreen.enterStoreName")}
            </Text>

            <TextInput
              style={styles.nameInput}
              placeholder={t("addStoreScreen.enterStoreName")}
              value={customStoreName}
              onChangeText={setCustomStoreName}
              autoFocus
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowNameModal(false)}
              >
                <Text style={styles.modalButtonText}>
                  {t("addStoreScreen.cancel")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={confirmAddStore}
              >
                <Text style={styles.modalButtonText}>
                  {t("addStoreScreen.ok")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
        <ActivityIndicator size="small" color={Theme.colors.primary} />
      )}

      {locationSuggestions.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>
            {t("addStoreScreen.searchResults")}:
          </Text>
          {locationSuggestions.map((result, index) => (
            <StoreResultItem
              key={index}
              name={result.name}
              address={
                result.address_line2 || `${result.city}, ${result.country}`
              }
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 14,
  },
  resultsContainer: {
    marginTop: 16,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
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
    padding: 25,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  nameInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    backgroundColor: Theme.colors.accentDark,
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "500",
  },
});

export default StoreLocationForm;
