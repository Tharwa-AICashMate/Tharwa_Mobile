import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { getFAQs } from '../store/slices/helpCenterSlice';
import AccordionItem from '../componenets/AccordionItem';
import CategoryTabs from '../componenets/CategoryTab';
import { SafeAreaView } from 'react-native-safe-area-context';

const HelpCenterScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { faqs, selectedCategory, isLoading } = useSelector((state: RootState) => state.helpCenter);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(getFAQs(selectedCategory));
  }, [dispatch, selectedCategory]);

  const handleContactUsPress = () => {
    navigation.navigate('SupportChannels');
  };
  const handleBack = () => {
    navigation.goBack();
  };
  const filteredFAQs = searchQuery
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} >
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
        <CategoryTabs />
        <View style={styles.searchInputContainer}>
            <Ionicons name="search-outline" size={18} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#888"
            />
          </View>
        <ScrollView style={styles.faqList}>
          {isLoading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : (
            filteredFAQs.map((faq) => <AccordionItem key={faq.id} item={faq} />)
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FECD3E',
    flex:1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    backgroundColor: 'white',
    padding: 40,
    borderTopRightRadius:80,
    borderTopLeftRadius:80,

  },
  searchText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 15,
    textAlign:'center',
  },
  searchInputContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '100%',
   
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#F5F5F5',
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  activeButton: {
    backgroundColor: '#FFC937',
  },
 
  buttonText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 14,
  },
  faqList: {
    flex: 1,
    marginTop: 15,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
  },
});

export default HelpCenterScreen;