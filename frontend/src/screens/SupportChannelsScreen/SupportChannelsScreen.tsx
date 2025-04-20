import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getSupportChannels } from "@/redux/slices/helpCenterSlice";
import CategoryTabs from "@/componenets/CategoryTab";

const SupportChannelsScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { supportChannels, isLoading } = useSelector(
    (state: RootState) => state.helpCenter
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getSupportChannels());
  }, [dispatch]);

  const handleBack = () => {
    navigation.goBack();
  };

  const renderChannelIcon = (channelName: string) => {
    switch (channelName.toLowerCase()) {
      case "customer service":
        return <Ionicons name="headset-outline" size={24} color="#FFC937" />;
      case "website":
        return <Ionicons name="globe-outline" size={24} color="#FFC937" />;
      case "facebook":
        return <Ionicons name="logo-facebook" size={24} color="#FFC937" />;
      case "whatsapp":
        return <Ionicons name="logo-whatsapp" size={24} color="#FFC937" />;
      case "instagram":
        return <Ionicons name="logo-instagram" size={24} color="#FFC937" />;
      default:
        return <Ionicons name="chatbubble-outline" size={24} color="#FFC937" />;
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.channelItem}>
      <View style={styles.iconContainer}>{renderChannelIcon(item.name)}</View>
      <Text style={styles.channelName}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={20} color="#888" />
    </TouchableOpacity>
  );

  const filteredChannels = searchQuery
    ? supportChannels.filter((channel) =>
        channel.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : supportChannels;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & FAQs</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContent}>
        <Text style={styles.searchText}>How Can We Help You?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.actionButton]}>
            <Text style={styles.buttonText} onPress={handleBack}>
              FAQ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.activeButton]}
            onPress={() => {}}
          >
            <Text style={styles.buttonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
        <CategoryTabs />
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search-outline"
            size={18}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#888"
          />
        </View>

        {isLoading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <FlatList
            data={filteredChannels}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.channelList}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FECD3E",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#FFC937",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  mainContent: {
    flex: 1,
    backgroundColor: "white",
    padding: 40,
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
  },
  searchContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginTop: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 10,
    width: "100%",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#F5F5F5",
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
  inactiveButton: {
    backgroundColor: "#E0E0E0",
  },
  buttonText: {
    color: "#333",
    fontWeight: "500",
    fontSize: 14,
  },
  channelList: {
    flex: 1,
    marginTop: 15,
  },
  channelItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFF9E6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  channelName: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    color: "#333",
  },
});

export default SupportChannelsScreen;
