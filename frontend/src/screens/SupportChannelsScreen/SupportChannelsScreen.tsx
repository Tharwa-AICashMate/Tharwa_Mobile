// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   FlatList,
//   TextInput,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { getSupportChannels } from "@/redux/slices/helpCenterSlice";
// import CategoryTabs from "@/componenets/CategoryTab";
// import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";

// const SupportChannelsScreen: React.FC = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch<AppDispatch>();
//   const { supportChannels, isLoading } = useSelector(
//     (state: RootState) => state.helpCenter
//   );
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     dispatch(getSupportChannels());
//   }, [dispatch]);

//   const handleBack = () => {
//     navigation.goBack();
//   };

//   const renderChannelIcon = (channelName: string) => {
//     switch (channelName.toLowerCase()) {
//       case "customer service":
//         return <Ionicons name="headset-outline" size={24} color="#FFC937" />;
//       case "website":
//         return <Ionicons name="globe-outline" size={24} color="#FFC937" />;
//       case "facebook":
//         return <Ionicons name="logo-facebook" size={24} color="#FFC937" />;
//       case "whatsapp":
//         return <Ionicons name="logo-whatsapp" size={24} color="#FFC937" />;
//       case "instagram":
//         return <Ionicons name="logo-instagram" size={24} color="#FFC937" />;
//       default:
//         return <Ionicons name="chatbubble-outline" size={24} color="#FFC937" />;
//     }
//   };

//   const renderItem = ({ item }: { item: any }) => (
//     <TouchableOpacity style={styles.channelItem}>
//       <View style={styles.iconContainer}>{renderChannelIcon(item.name)}</View>
//       <Text style={styles.channelName}>{item.name}</Text>
//       <Ionicons name="chevron-forward" size={20} color="#888" />
//     </TouchableOpacity>
//   );

//   const filteredChannels = searchQuery
//     ? supportChannels.filter((channel) =>
//         channel.name.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : supportChannels;

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Help & FAQs" />
//       <View style={styles.mainContent}>
//         <Text style={styles.searchText}>How Can We Help You?</Text>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={[styles.actionButton]}>
//             <Text style={styles.buttonText} onPress={handleBack}>
//               FAQs
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.actionButton, styles.activeButton]}
//             onPress={() => {}}
//           >
//             <Text style={styles.buttonText}>Contact Us</Text>
//           </TouchableOpacity>
//         </View>
//         <CategoryTabs />
//         <View style={styles.searchInputContainer}>
//           <Ionicons
//             name="search-outline"
//             size={18}
//             color="#888"
//             style={styles.searchIcon}
//           />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search"
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             placeholderTextColor="#888"
//           />
//         </View>

//         {isLoading ? (
//           <Text style={styles.loadingText}>Loading...</Text>
//         ) : (
//           <FlatList
//             data={filteredChannels}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.id}
//             style={styles.channelList}
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#FECD3E",
//     flex: 1,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     backgroundColor: "#FFC937",
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   mainContent: {
//     flex: 1,
//     backgroundColor: "white",
//     padding: 40,
//     borderTopRightRadius: 80,
//     borderTopLeftRadius: 80,
//   },
//   searchContainer: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 20,
//     marginTop: 15,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   searchText: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#333",
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   searchInputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F5F5F5",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     width: "100%",
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     paddingVertical: 8,
//     fontSize: 14,
//     color: "#333",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     marginTop: 15,
//     justifyContent: "center",
//     alignSelf: "center",
//     backgroundColor: "#F5F5F5",
//   },
//   actionButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     minWidth: 100,
//   },
//   activeButton: {
//     backgroundColor: "#FFC937",
//   },
//   inactiveButton: {
//     backgroundColor: "#E0E0E0",
//   },
//   buttonText: {
//     color: "#333",
//     fontWeight: "500",
//     fontSize: 14,
//   },
//   channelList: {
//     flex: 1,
//     marginTop: 15,
//   },
//   channelItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   iconContainer: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: "#FFF9E6",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 15,
//   },
//   channelName: {
//     flex: 1,
//     fontSize: 15,
//     color: "#333",
//   },
//   loadingText: {
//     textAlign: "center",
//     marginTop: 20,
//     color: "#333",
//   },
// });

// export default SupportChannelsScreen;


// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   FlatList,
//   TextInput,
//   Alert,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { getSupportChannels, getFAQs, setCategory } from "@/redux/slices/helpCenterSlice";
// import CategoryTabs from "@/componenets/CategoryTab";
// import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";


// const staticSupportChannels = [
//   {
//     id: "1",
//     name: "Customer Service",
//     icon: "headset",
//     link: "tel:+1234567890",
//     category: "contact",
//   },
//   {
//     id: "2",
//     name: "Website",
//     icon: "globe",
//     link: "https://example.com/support",
//     category: "contact",
//   },
//   {
//     id: "3",
//     name: "Facebook",
//     icon: "facebook",
//     link: "https://facebook.com/example",
//     category: "contact",
//   },
//   {
//     id: "4",
//     name: "WhatsApp",
//     icon: "whatsapp",
//     link: "https://wa.me/1234567890",
//     category: "contact",
//   },
//   {
//     id: "5",
//     name: "Instagram",
//     icon: "instagram",
//     link: "https://instagram.com/example",
//     category: "contact",
//   },
// ];


// const SupportChannelsScreen: React.FC = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch<AppDispatch>();
//   const { supportChannels, faqs, selectedCategory, isLoading, error } = useSelector(
//     (state: RootState) => state.helpCenter
//   );
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState<'faqs' | 'contact'>('contact');

//   // Initial data fetch
//   useEffect(() => {
//     console.log("Fetching support channels...");
//     dispatch(getSupportChannels())
//       .unwrap()
//       .then(data => console.log("Support channels fetched:", data))
//       .catch(err => console.error("Error fetching support channels:", err));
//   }, [dispatch]);

//   const handleFAQsTab = () => {
//     setActiveTab('faqs');
//     console.log("Fetching FAQs for category:", selectedCategory);
//     dispatch(getFAQs(selectedCategory))
//       .unwrap()
//       .then(data => console.log("FAQs fetched:", data))
//       .catch(err => console.error("Error fetching FAQs:", err));
//   };

//   const handleContactTab = () => {
//     setActiveTab('contact');
//     dispatch(getSupportChannels());
//   };

//   const handleBack = () => {
//     navigation.goBack();
//   };

//   const renderChannelIcon = (channelName: string) => {
//     switch (channelName.toLowerCase()) {
//       case "customer service":
//         return <Ionicons name="headset-outline" size={24} color="#FFC937" />;
//       case "website":
//         return <Ionicons name="globe-outline" size={24} color="#FFC937" />;
//       case "facebook":
//         return <Ionicons name="logo-facebook" size={24} color="#FFC937" />;
//       case "whatsapp":
//         return <Ionicons name="logo-whatsapp" size={24} color="#FFC937" />;
//       case "instagram":
//         return <Ionicons name="logo-instagram" size={24} color="#FFC937" />;
//       default:
//         return <Ionicons name="chatbubble-outline" size={24} color="#FFC937" />;
//     }
//   };

//   const renderChannelItem = ({ item }: { item: any }) => (
//     <TouchableOpacity style={styles.channelItem}>
//       <View style={styles.iconContainer}>{renderChannelIcon(item.name)}</View>
//       <Text style={styles.channelName}>{item.name}</Text>
//       <Ionicons name="chevron-forward" size={20} color="#888" />
//     </TouchableOpacity>
//   );

//   const renderFAQItem = ({ item }: { item: any }) => (
//     <TouchableOpacity style={styles.faqItem}>
//       <Text style={styles.faqQuestion}>{item.question}</Text>
//       <Ionicons name="chevron-down" size={20} color="#888" />
//     </TouchableOpacity>
//   );

//   const filteredChannels = searchQuery && activeTab === 'contact'
//     ? supportChannels.filter((channel) =>
//         channel.name.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : supportChannels;

//   const filteredFAQs = searchQuery && activeTab === 'faqs'
//     ? faqs.filter((faq) =>
//         faq.question.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : faqs;

//   const handleCategoryChange = (category: 'general' | 'account' | 'services') => {
//     dispatch(setCategory(category));
//     if (activeTab === 'faqs') {
//       dispatch(getFAQs(category));
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Help & FAQs" />
//       <View style={styles.mainContent}>
//         <Text style={styles.searchText}>How Can We Help You?</Text>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity 
//             style={[
//               styles.actionButton, 
//               activeTab === 'faqs' ? styles.activeButton : styles.inactiveButton
//             ]}
//             onPress={handleFAQsTab}
//           >
//             <Text style={styles.buttonText}>FAQs</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.actionButton, 
//               activeTab === 'contact' ? styles.activeButton : styles.inactiveButton
//             ]}
//             onPress={handleContactTab}
//           >
//             <Text style={styles.buttonText}>Contact Us</Text>
//           </TouchableOpacity>
//         </View>
        
//         {/* Category tabs are only needed for FAQs */}
//         {activeTab === 'faqs' && (
//           <CategoryTabs 
//             selectedCategory={selectedCategory}
//             onSelectCategory={handleCategoryChange}
//           />
//         )}
        
//         <View style={styles.searchInputContainer}>
//           <Ionicons
//             name="search-outline"
//             size={18}
//             color="#888"
//             style={styles.searchIcon}
//           />
//           <TextInput
//             style={styles.searchInput}
//             placeholder={activeTab === 'faqs' ? "Search FAQs" : "Search Support Channels"}
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             placeholderTextColor="#888"
//           />
//         </View>

//         {isLoading ? (
//           <Text style={styles.loadingText}>Loading...</Text>
//         ) : error ? (
//           <View style={styles.errorContainer}>
//             <Text style={styles.errorText}>Error loading data</Text>
//             <TouchableOpacity 
//               style={styles.retryButton} 
//               onPress={() => activeTab === 'faqs' ? dispatch(getFAQs(selectedCategory)) : dispatch(getSupportChannels())}
//             >
//               <Text style={styles.retryButtonText}>Retry</Text>
//             </TouchableOpacity>
//           </View>
//         ) : activeTab === 'contact' ? (
//           <FlatList
//             data={filteredChannels}
//             renderItem={renderChannelItem}
//             keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
//             style={styles.list}
//             ListEmptyComponent={
//               <Text style={styles.emptyText}>No support channels available</Text>
//             }
//           />
//         ) : (
//           <FlatList
//             data={filteredFAQs}
//             renderItem={renderFAQItem}
//             keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
//             style={styles.list}
//             ListEmptyComponent={
//               <Text style={styles.emptyText}>No FAQs available for this category</Text>
//             }
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#FECD3E",
//     flex: 1,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     backgroundColor: "#FFC937",
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   mainContent: {
//     flex: 1,
//     backgroundColor: "white",
//     padding: 40,
//     borderTopRightRadius: 80,
//     borderTopLeftRadius: 80,
//   },
//   searchContainer: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 20,
//     marginTop: 15,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   searchText: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#333",
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   searchInputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F5F5F5",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     width: "100%",
//     marginVertical: 15,
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchInput: {
//     flex: 1,
//     paddingVertical: 8,
//     fontSize: 14,
//     color: "#333",
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     marginTop: 15,
//     justifyContent: "center",
//     alignSelf: "center",
//     backgroundColor: "#F5F5F5",
//     borderRadius: 8,
//     overflow: "hidden",
//   },
//   actionButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     alignItems: "center",
//     justifyContent: "center",
//     minWidth: 100,
//   },
//   activeButton: {
//     backgroundColor: "#FFC937",
//   },
//   inactiveButton: {
//     backgroundColor: "#E0E0E0",
//   },
//   buttonText: {
//     color: "#333",
//     fontWeight: "500",
//     fontSize: 14,
//   },
//   list: {
//     flex: 1,
//     marginTop: 5,
//   },
//   channelItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   faqItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 1,
//   },
//   iconContainer: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: "#FFF9E6",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 15,
//   },
//   channelName: {
//     flex: 1,
//     fontSize: 15,
//     color: "#333",
//   },
//   faqQuestion: {
//     flex: 1,
//     fontSize: 15,
//     color: "#333",
//   },
//   loadingText: {
//     textAlign: "center",
//     marginTop: 20,
//     color: "#333",
//   },
//   errorContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 20,
//   },
//   errorText: {
//     textAlign: "center",
//     color: "red",
//     marginBottom: 10,
//   },
//   retryButton: {
//     backgroundColor: "#FFC937",
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//     borderRadius: 8,
//   },
//   retryButtonText: {
//     color: "#333",
//     fontWeight: "500",
//   },
//   emptyText: {
//     textAlign: "center",
//     marginTop: 20,
//     color: "#666",
//   },
// });

// export default SupportChannelsScreen;


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
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import Theme from "@/theme";

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

const SupportChannelsScreen: React.FC = () => {
  const navigation = useNavigation();
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
        style="light"
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
