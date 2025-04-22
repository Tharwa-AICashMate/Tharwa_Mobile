import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { RootState } from '@/redux/store';
import { removeItem } from '@/redux/slices/grocerySlice';
import { GroceryItem } from '@/types/store';

const GroceryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state: RootState) => state.grocery.items);

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const renderItem = ({ item }: { item: GroceryItem }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item.id)}
      >
        <Text style={styles.removeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Grocery List:</Text>
      {items.length === 0 ? (
        <Text style={styles.emptyText}>Add items to your grocery list</Text>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
  },
  removeButton: {
    padding: 5,
  },
  removeButtonText: {
    color: 'red',
    fontSize: 16,
  },
});

export default GroceryList;