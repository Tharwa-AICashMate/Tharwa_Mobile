import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store';
import { setSearchRadius } from '@/redux/slices/storeSlice';
import Theme from '@/theme';
import { useTranslation } from "react-i18next";

const radiusOptions = [5, 10, 20, 50, 100];

const SearchRadiusSelector: React.FC = () => {
   const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const dispatch = useAppDispatch();
  const { searchRadius } = useAppSelector((state: RootState) => state.store);

  const handleRadiusChange = (radius: number) => {
    dispatch(setSearchRadius(radius));
  };
  const getTranslatedRadius = (radius: number) => {
    switch (radius) {
      case 5: return t("SmartGrocery.km5");
      case 10: return t("SmartGrocery.km10");
      case 20: return t("SmartGrocery.km20");
      case 50: return t("SmartGrocery.km50");
      case 100: return t("SmartGrocery.km100");
      default: return `${radius} km`;
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t("SmartGrocery.searchScope")}</Text>
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
              {getTranslatedRadius(radius)}
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