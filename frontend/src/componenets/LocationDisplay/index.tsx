import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setUserLocation } from "@/redux/slices/storeSlice";
import { getCurrentLocation } from "@/utils/locationutils";
import Theme from "@/theme";
import { useTranslation } from "react-i18next";

const LocationDisplay: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const dispatch = useDispatch();
  const { userLocation, locationDetected } = useSelector(
    (state: RootState) => state.store
  );

  const detectLocation = async () => {
    try {
      const location = await getCurrentLocation();
      const roundedLocation = {
        latitude: parseFloat(location.latitude.toFixed(6)),
        longitude: parseFloat(location.longitude.toFixed(6)),
      };
      dispatch(setUserLocation(location));
    } catch (error) {
      console.log("Error getting location:", error);
      // Handle location error
    }
  };

  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t("SmartGrocery.yourLocation")}</Text>
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>
         {t("SmartGrocery.latitude")} {userLocation?.latitude}
        </Text>
        <Text style={styles.locationText}>
        {t("SmartGrocery.longitude")} {userLocation?.longitude}
        </Text>
        {!locationDetected && (
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={detectLocation}
          >
            <Text style={styles.refreshButtonText}>{t("SmartGrocery.retry")}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: Theme.colors.background,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "87%",
    margin :"auto",
    height: 80,
    borderRadius: 20,
    marginLeft: "8%",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#444",
  },
  refreshButton: {
    marginLeft: "8%",
    padding: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  refreshButtonText: {
    color: "#333",
  },
});

export default LocationDisplay;
