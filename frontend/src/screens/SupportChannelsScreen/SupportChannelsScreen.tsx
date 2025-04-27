import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/types"; // Import the navigation types
import { StackNavigationProp } from "@react-navigation/stack";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import Theme from "@/theme";
import { Linking } from "react-native";

const staticSupportChannels = [
  {
    id: "1",
    name: "Customer Service",
    icon: "headset",
    link: "tel:+1234567890",
    category: "contact",
  },
  {
    id: "2",
    name: "Website",
    icon: "globe",
    link: "https://example.com/support",
    category: "contact",
  },
  {
    id: "3",
    name: "Facebook",
    icon: "facebook",
    link: "https://facebook.com/example",
    category: "contact",
  },
  {
    id: "4",
    name: "WhatsApp",
    icon: "whatsapp",
    link: "https://wa.me/1234567890",
    category: "contact",
  },
  {
    id: "5",
    name: "Instagram",
    icon: "instagram",
    link: "https://instagram.com/example",
    category: "contact",
  },
];
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
const SupportChannelsScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'contact'>('contact'); // Only the 'contact' tab remains

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
  const handleFAQtUsPress = () => {
    navigation.navigate("HelpCenterScreen");
  };

  const renderChannelItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.channelItem} onPress={() => Linking.openURL(item.link)}>
      <View style={styles.iconContainer}>{renderChannelIcon(item.name)}</View>
      <Text style={styles.channelName}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={20} color="#888" />
    </TouchableOpacity>
  );

  const filteredChannels = searchQuery
    ? staticSupportChannels.filter((channel) =>
        channel.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : staticSupportChannels;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.highlight}
        translucent={false}
      />
      <Header title="Help & FAQs" />
      <View style={styles.mainContent}>
        <Text style={styles.searchText}>How Can We Help You?</Text>
        <View style={styles.buttonContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            onPress={handleFAQtUsPress}
            style={[styles.actionButton]}
          >
            <Text style={styles.buttonText}
            >FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // style={[styles.actionButton]}
            // onPress={handleContactUsPress}
            style={[styles.actionButton, styles.activeButton]}
          >
            <Text style={styles.buttonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
        </View>

        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search-outline"
            size={18}
            color="#888"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Support Channels"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#888"
          />
        </View>

        <FlatList
          data={filteredChannels}
          renderItem={renderChannelItem}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          style={styles.list}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No support channels available</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FECD3E",
    flex: 1,
  },
  mainContent: {
    flex: 1,
    backgroundColor: "white",
    padding: 40,
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
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
    marginVertical: 15,
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
  inactiveButton: {
    backgroundColor: "#E0E0E0",
  },
  buttonText: {
    color: "#333",
    fontWeight: "500",
    fontSize: 14,
  },
  list: {
    flex: 1,
    marginTop: 5,
  },
  channelItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
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
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
});

export default SupportChannelsScreen;
