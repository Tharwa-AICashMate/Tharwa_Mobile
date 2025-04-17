import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CategoryType } from '@/types/transactionTypes';

interface CategoryIconProps {
  category: CategoryType;
  size?: number;
}

const getCategoryInfo = (category: CategoryType): { icon: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string } => {
  switch (category) {
    case 'salary':
      return { icon: 'cash', color: 'rgba(176, 224, 230, 1)' };
    case 'groceries':
      return { icon: 'cart', color: 'rgba(100, 149, 237, 1)' };
    case 'rent':
      return { icon: 'home', color: 'rgba(32, 32, 99, 1)' };
    case 'transport':
      return { icon: 'car', color: 'rgba(100, 149, 237, 1)' };
    case 'food':
      return { icon: 'food', color: 'rgba(176, 224, 230, 1)' };
    case 'others':
      return { icon: 'dots-horizontal', color: '#A7B0BA' };
    default:
      return { icon: 'help-circle', color: '#A7B0BA' };
  }
};

const CategoryTransaction: React.FC<CategoryIconProps> = ({ category, size = 24 }) => {
  const { icon, color } = getCategoryInfo(category);
  
  return (
    <View style={[styles.iconContainer, { backgroundColor: color }]}>
      <MaterialCommunityIcons name={icon} size={size} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryTransaction;