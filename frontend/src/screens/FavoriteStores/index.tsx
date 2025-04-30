import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Share,
  RefreshControl,
  Platform,
  Linking,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import Icon from "react-native-vector-icons/MaterialIcons";
import { fetchUserStores, removeUserStore } from "@/redux/slices/storeThunk";
import { clearUserStores, setUserStores } from "@/redux/slices/storeSlice";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import Theme from "@/theme";
import axiosInstance from "@/config/axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchCurrentUser } from "@/redux/slices/AuthSlice";
import { getCurrentUserId } from "@/utils/auth";


const handleOpenMap = (lat: number, lon: number) => {
    const url = Platform.select({
      ios: `maps://?q=${lat},${lon}`,
      android: `geo:${lat},${lon}?q=${lat},${lon}`,
      default: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
    });

    Linking.openURL(url).catch((err) =>
      console.error("Error opening map:", err)
    );
  };
const FavoriteStores: React.FC = () => {
  const dispatch = useAppDispatch();
  const [userId, setUserId] = useState("");
  const { userStores, loading } = useAppSelector(
    (state: RootState) => state.store
  );
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      try {
        if (userId) {
          console.log(userId);
          const response = await axiosInstance.get(`/user/stores/${userId}`);
          dispatch(setUserStores(response.data));
        }
      } catch (error) {
        console.error("Error loading stores:", error);
      }
    };

    loadData();
  }, [dispatch, userId]);
  console.log(userStores);

  const handleShare = (store) => {
    Share.share({
      message: `
      Check out this store: ${store.name}
      Location: ${store.city}, ${store.country}
      Map: https://www.google.com/maps?q=${store.latitude},${store.longitude}`,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setUserId(await getCurrentUserId());
    };
    fetchData();
  }, []);

  const handleRefresh = async () => {
    dispatch(clearUserStores());
    setRefreshing(true);
    await dispatch(fetchUserStores(userId));
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Favorite Stores"} />
      <View style={styles.content}>
        <FlatList
          data={userStores}
          refreshControl={
            <RefreshControl
              refreshing={refreshing || loading}
              // onRefresh={handleRefresh}
              colors={[Theme.colors.primary]}
            />
          }
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.storeCard}>
              <View style={styles.storeHeader}>
                <Icon name="store" size={30} color={Theme.colors.primary} />
                <Text style={styles.storeName}>{item.name}</Text>
              </View>

              <View style={styles.locationContainer}>
                <Icon name="location-on" size={16} color="#666" />
                <Text style={styles.locationText}>
                  {item.city}, {item.country}
                </Text>
              </View>

              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  style={styles.viewMap}
                  onPress={() =>
                    handleOpenMap(item.latitude, item.longitude)
                  }
                >
                  <Text>View In Map</Text>
                  <Icon
                    name="arrow-forward"
                    size={20}
                    color={Theme.colors.text}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleShare(item)}
                >
                  <Icon name="share" size={25} color="rgba(32, 32, 99, 1)" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() =>
                    dispatch(
                      removeUserStore({ storeId: item.id, userId: userId })
                    )
                  }
                >
                  <Icon
                    name="favorite"
                    size={25}
                    color={Theme.colors.highlight}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="favorite-border" size={60} color="#ccc" />
              <Text style={styles.emptyText}>No favorite stores yet</Text>
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
    flexGrow: 1,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    padding: 30,
    backgroundColor: Theme.colors.background,
  },
  storeCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  storeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  storeName: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
    color: Theme.colors.text,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    color: "rgb(238, 11, 11)",
  },
  locationText: {
    marginLeft: 8,
    color: Theme.colors.textLight,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
  },
  viewMap: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    padding: 8,
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
});

export default FavoriteStores;
