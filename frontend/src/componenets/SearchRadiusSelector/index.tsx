import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store';
import { setSearchRadius } from '@/redux/slices/storeSlice';
import Theme from '@/theme';

const radiusOptions = [5, 10, 20, 50, 100];

const SearchRadiusSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchRadius } = useAppSelector((state: RootState) => state.store);

  const handleRadiusChange = (radius: number) => {
    dispatch(setSearchRadius(radius));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Search scope:</Text>
      <View style={styles.optionsContainer}>
        {radiusOptions.map((radius) => (
          <TouchableOpacity
            key={radius}
            style={[
              styles.optionButton,
              searchRadius === radius && styles.selectedOption,
            ]}
            onPress={() => handleRadiusChange(radius)}
          >
            <Text
              style={[
                styles.optionText,
                searchRadius === radius && styles.selectedOptionText,
              ]}
            >
              {radius} km
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  optionButton: {
    paddingHorizontal: 5,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedOption: {
    backgroundColor: Theme.colors.primary,
    borderColor: '#1976D2',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  selectedOptionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SearchRadiusSelector;