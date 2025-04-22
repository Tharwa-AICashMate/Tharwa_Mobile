import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addItem } from '@/redux/slices/grocerySlice';
import Theme from '@/theme';

const GroceryInput: React.FC = () => {
  const [itemName, setItemName] = useState('');
  const dispatch = useDispatch();

  const handleAddItem = () => {
    if (itemName.trim()) {
      dispatch(addItem(itemName.trim()));
      setItemName('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter grocery item"
        value={itemName}
        onChangeText={setItemName}
        onSubmitEditing={handleAddItem}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddItem}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GroceryInput;