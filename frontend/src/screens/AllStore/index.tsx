import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Linking,
  Modal,
  Pressable,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import {
  addStore,
  fetchStores,
  removeUserStore,
} from "@/redux/slices/storeThunk";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { Store } from "@/types/settings.types";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import Theme from "@/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "App";
import { getCurrentUserId } from "@/utils/auth";
import {
  resetAddStoreStatus,
  reverseFavourite,
} from "@/redux/slices/storeSlice";
import { useTranslation } from "react-i18next";

const handleOpenMap = (lat: number, lon: number) => {
  const url = Platform.select({
    ios: `maps://?q=${lat},${lon}`,
    android: `geo:${lat},${lon}?q=${lat},${lon}`,
    default: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
  });

  Linking.openURL(url).catch((err) => console.log("Error opening map:", err));
};
const AllStoresPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [addedStore, setAddedStore] = useState<Store | null>(null);

  const { stores, loading } = useAppSelector((state: RootState) => state.store);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStores, setFilteredStores] = useState(stores);
  const [userId, setUserId] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const Id = await getCurrentUserId();
      setUserId(Id);
      dispatch(fetchStores({ userId: Id }));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = stores.filter(
      (store) =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (store.city ?? "").toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStores(filtered);
  }, [searchQuery, stores]);

  const handleStorePress = (store: Store) => {
    //navigation.navigate('StoreDetails', { store });
  };
  const handleAddStore = (store) => {
    if (!userId) {
      console.log("User not authenticated");
      return;
    }

    const { name, lat, lon, city, country } = store;
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
  };
  const dynamicStyles = {
    searchIcon: {
      position: "absolute",
      [isRTL ? "right" : "left"]: 12,
      top: 14,
    },
    viewMap: {
      flexDirection: isRTL ? "row-reverse" : "row",
    },
  };
  const handelToggleFavourites = (item) => {
    dispatch(reverseFavourite(item.id));
    if (item.is_favourite) {
      dispatch(removeUserStore({ storeId: item.id, userId: userId }));
    } else {
      handleAddStore({
        name: item.name,
        lat: item.latitude,
        lon: item.longitude,
        city: item.city,
        country: item.country,
      });
    }
  };
  const { addStoreStatus, newlyAddedStore } = useAppSelector(
    (state: RootState) => state.store
  );
  useEffect(() => {
    if (addStoreStatus === "succeeded" && newlyAddedStore) {
      setAddedStore(newlyAddedStore);
      setShowSuccessModal(true);
      dispatch(resetAddStoreStatus());
    }
  }, [addStoreStatus, newlyAddedStore, dispatch]);
  return (
    <SafeAreaView style={styles.container}>
      <Header title={t("allStoresScreen.allStores")} />

      <View style={styles.content}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showSuccessModal}
          onRequestClose={() => setShowSuccessModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Icon
                name="check-circle"
                size={60}
                color={Theme.colors.primary}
              />
              <Text style={styles.modalTitle}>
                {t("addStoreScreen.thankYou")}
              </Text>
              <Text style={styles.modalText}>
                {t("addStoreScreen.storeAdded", {
                  storeName: addedStore?.name,
                })}
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
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={t("allStoresScreen.searchPlaceholder")}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Icon
            name="search"
            size={20}
            color="#666"
            style={[styles.searchIcon, dynamicStyles.searchIcon]}
          />
        </View>

        <FlatList
          data={filteredStores}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={styles.storeCard}
              //onPress={() => handleStorePress(item)}
            >
              <View>
                <Text style={styles.storeName}>{item.name}</Text>
                <View style={[styles.locationContainer]}>
                  <Icon name="location-on" size={16} color="#4CAF50" />
                  <Text
                    style={[
                      styles.locationText,
                      isRTL && { marginRight: 8, marginLeft: 0 },
                    ]}
                  >
                    {item.city}, {item.country}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.viewMap}
                  onPress={() => handleOpenMap(item.latitude, item.longitude)}
                >
                  <Text>{t("allStoresScreen.viewInMap")}</Text>
                  <Icon
                    name="arrow-forward"
                    size={20}
                    color={Theme.colors.text}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => handelToggleFavourites(item)}>
                <Icon
                  name={item.is_favourite ? "favorite" : "favorite-border"}
                  size={25}
                  color={Theme.colors.highlight}
                />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="storefront" size={60} color="#ccc" />
              <Text style={styles.emptyText}>
                {t("allStoresScreen.emptyListMessage")}
              </Text>
            </View>
          }
        />
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
    flex: 1,
    backgroundColor: Theme.colors.background,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  searchContainer: {
    position: "relative",
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    paddingLeft: 40,
    fontSize: 16,
    elevation: 2,
  },
  viewMap: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  searchIcon: {
    position: "absolute",
    left: 12,
    top: 14,
  },
  storeCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  storeName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 8,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: "#888",
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

export default AllStoresPage;
