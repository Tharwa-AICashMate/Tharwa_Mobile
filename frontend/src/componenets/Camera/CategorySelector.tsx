import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {modalStyles} from './style';
import { Category } from '@/types/category';
import { useTranslation } from 'react-i18next';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category) => void;
  onAddNewCategory: () => void;
  loading: boolean;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddNewCategory,
  loading
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  return (
    <>
      <View style={modalStyles.sectionTitleRow}>
        <View style={modalStyles.sectionTitle}>
          <Ionicons name="list-outline" size={20} color="#555" />
          <Text style={modalStyles.sectionTitleText}>{t("categories.selectCategory")}</Text>
        </View>
        <TouchableOpacity 
          style={modalStyles.addCategoryButton}
          onPress={onAddNewCategory}
        >
          <Ionicons name="add-circle-outline" size={20} color="#4CAF50" />
          <Text style={modalStyles.addCategoryText}>{t("categories.add")}</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={modalStyles.loadingContainer}>
          <ActivityIndicator size="small" color="#4CAF50" />
          <Text style={modalStyles.loadingText}>{t("categories.noCategoriesFound")}</Text>
        </View>
      ) : categories.length === 0 ? (
        <View style={modalStyles.emptyContainer}>
          <Text style={modalStyles.emptyText}>{t("categories.noCategoriesFound")}</Text>
          <TouchableOpacity 
            style={modalStyles.createFirstCategoryButton}
            onPress={onAddNewCategory}
          >
            <Text style={modalStyles.createFirstCategoryText}>{t("categories.firstCategory")}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={[modalStyles.categoriesContainer, isRTL && { direction: 'rtl' }]}
          contentContainerStyle={modalStyles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                modalStyles.categoryItem,
                selectedCategory?.id === category.id && modalStyles.selectedCategory
              ]}
              onPress={() => onSelectCategory(category)}
            >
              <Ionicons 
                name={category.icon as any} 
                size={24} 
                color={selectedCategory?.id === category.id ? "#fff" : "#666"} 
              />
              <Text 
                style={[
                  modalStyles.categoryText,
                  selectedCategory?.id === category.id && modalStyles.selectedCategoryText
                ]}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {category.name}
              </Text>
              {selectedCategory?.id === category.id && (
                <View style={modalStyles.checkmarkIcon}>
                  <Ionicons name="checkmark-circle" size={16} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default CategorySelector;