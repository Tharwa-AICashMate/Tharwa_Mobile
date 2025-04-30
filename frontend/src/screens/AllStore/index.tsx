
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store';
import { fetchStores } from '@/redux/slices/storeThunk';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Store } from '@/types/settings.types';
import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import Theme from '@/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

const AllStoresPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { stores, loading } = useAppSelector((state: RootState) => state.store);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStores, setFilteredStores] = useState(stores);

  useEffect(() => {
    dispatch(fetchStores());
  }, []);

  useEffect(() => {
    const filtered = stores.filter(store =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (store.city ?? '').toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredStores(filtered);
  }, [searchQuery, stores]);

  const handleStorePress = (store: Store) => {
    navigation.navigate('StoreDetails', { store });
  };

  return (
    <SafeAreaView  style={styles.container}>
              <Header title='All Stores' />

      <View style={styles.content}>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search stores..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
      </View>

      <FlatList
        data={filteredStores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.storeCard}
            onPress={() => handleStorePress(item)}
          >
            <Text style={styles.storeName}>{item.name}</Text>
            <View style={styles.locationContainer}>
              <Icon name="location-on" size={16} color="#4CAF50" />
              <Text style={styles.locationText}>{item.city}, {item.country}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="storefront" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No stores found</Text>
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
    position: 'relative',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    paddingLeft: 40,
    fontSize: 16,
    elevation: 2,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 14,
  },
  storeCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 8,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default AllStoresPage;