// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   StatusBar,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { getFAQs } from "../../redux/slices/helpCenterSlice";
// import AccordionItem from "../../componenets/AccordionItem";
// import CategoryTabs from "../../componenets/CategoryTab";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
// import Theme from "@/theme";

// const HelpCenterScreen: React.FC = () => {
//   const navigation = useNavigation();
//   const dispatch = useDispatch<AppDispatch>();
//   const { faqs, selectedCategory, isLoading } = useSelector(
//     (state: RootState) => state.helpCenter
//   );
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     dispatch(getFAQs(selectedCategory));
//   }, [dispatch, selectedCategory]);

//   const handleContactUsPress = () => {
//     navigation.navigate("SupportChannelsScreen");
//   };
//   const handleBack = () => {
//     navigation.goBack();
//   };
//   const filteredFAQs = searchQuery
//     ? faqs.filter((faq) =>
//         faq.question.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : faqs;

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar
//         style="light"
//         backgroundColor={Theme.colors.highlight}
//         translucent={false}
//       />
//       <Header title="Help & FAQs" />
//       <View style={styles.mainContent}>
//         <Text style={styles.searchText}>How Can We Help You?</Text>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={[styles.actionButton, styles.activeButton]}>
//             <Text style={styles.buttonText}>FAQ</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.actionButton]}
//             onPress={handleContactUsPress}
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
//         <ScrollView style={styles.faqList}>
//           {isLoading ? (
//             <Text style={styles.loadingText}>Loading...</Text>
//           ) : (
//             filteredFAQs.map((faq) => <AccordionItem key={faq.id} item={faq} />)
//           )}
//         </ScrollView>
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
//   searchText: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#333",
//     marginBottom: 15,
//     textAlign: "center",
//   },
//   searchInputContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
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

//   buttonText: {
//     color: "#333",
//     fontWeight: "500",
//     fontSize: 14,
//   },
//   faqList: {
//     flex: 1,
//     marginTop: 15,
//   },
//   loadingText: {
//     textAlign: "center",
//     marginTop: 20,
//     color: "#333",
//   },
// });

// export default HelpCenterScreen;


import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AccordionItem from "../../componenets/AccordionItem";
import CategoryTabs from "../../componenets/CategoryTab";
import { SafeAreaView } from "react-native-safe-area-context";
import Theme from "../../theme";
import Header from "../../componenets/HeaderIconsWithTitle/HeadericonsWithTitle";

const staticFAQs = [
  {
    id: "1",
    question: "How do I start investing?",
    answer:
      "To begin investing, create an account, add funds to your wallet, and choose from various investment options available on our platform.",
    category: "general",
  },
  {
    id: "2",
    question: "How much does it cost to use Finvesto?",
    answer:
      "Our platform is free to use. We only charge minimal fees on transactions and successful investments.",
    category: "general",
  },
  {
    id: "3",
    question: "How to contact support?",
    answer:
      "You can reach our support team through the 'Contact Us' button in the Help Center, or via any of our support channels.",
    category: "general",
  },
  {
    id: "4",
    question: "How can I reset my password if I forget it?",
    answer:
      "Click on 'Forgot Password' on the login screen and follow the instructions sent to your registered email.",
    category: "account",
  },
  {
    id: "5",
    question: "How do I update my contact information?",
    answer:
      "Go to 'Profile', select 'Edit Profile', update your information, and save changes.",
    category: "account",
  },
  {
    id: "6",
    question: "How can I update my settings within the application?",
    answer:
      "Navigate to 'Settings' from your profile page to manage notifications, security, and other preferences.",
    category: "account",
  },
  {
    id: "7",
    question: "How can I delete my account?",
    answer:
      "Go to 'Settings', select 'Account', and click on 'Delete Account'. Follow the confirmation steps to complete the process.",
    category: "account",
  },
  {
    id: "8",
    question: "How do I access my expense history?",
    answer:
      "Go to 'Transactions' in the main menu to view your complete expense history and filter by date or category.",
    category: "services",
  },
  {
    id: "9",
    question: "Can I use the app offline?",
    answer:
      "Some features are available offline, but you'll need an internet connection for real-time updates and transactions.",
    category: "services",
  },
];

const HelpCenterScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("general");

  const filteredFAQs = useMemo(() => {
    return staticFAQs
      .filter((faq) => faq.category === selectedCategory)
      .filter((faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [searchQuery, selectedCategory]);

  const handleContactUsPress = () => {
    navigation.navigate("SupportChannelsScreen");
  };

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
          <TouchableOpacity style={[styles.actionButton, styles.activeButton]}>
            <Text style={styles.buttonText}>FAQ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton]}
            onPress={handleContactUsPress}
          >
            <Text style={styles.buttonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        <CategoryTabs
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

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

        <ScrollView style={styles.faqList}>
          {filteredFAQs.map((faq) => (
            <AccordionItem key={faq.id} item={faq} />
          ))}
        </ScrollView>
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
    justifyContent: "center",
    alignItems: "center",
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
  faqList: {
    flex: 1,
    marginTop: 15,
  },
});

export default HelpCenterScreen;
