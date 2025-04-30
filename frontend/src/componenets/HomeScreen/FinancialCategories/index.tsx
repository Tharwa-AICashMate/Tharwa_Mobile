import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// 1. Define your root stack param types
type RootStackParamList = {
  AddIncome: undefined;
  AddExpensesScreen: undefined;
  Savings: undefined;
  // Add other screens here as needed
};

// 2. Create navigation prop type for this component
type FinancialCategoriesNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AddIncome' | 'AddExpensesScreen' | 'Savings'
>;

interface CategoryItem {
  id: string;
  displayLabel: string; 
  screenName: keyof RootStackParamList; 
  iconName: keyof typeof Ionicons.glyphMap;
  color: string;
}

const CategoryButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

const IconBackground = styled.View`
  background-color: ${({ color }: { color: string }) => color};
  width: 50px;
  height: 50px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const CategoryLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const CategoryIcon = styled(Ionicons)`
  font-size: 24px;
  color: #fff;
`;

const CategoryListItem: React.FC<{ item: CategoryItem }> = ({ item }) => {
  const navigation = useNavigation();

  const handlePress = () => {
   
      navigation.navigate(item.screenName)
      console.log(`Pressed ${item.displayLabel}`);
    
  };

  return (
    <CategoryButton onPress={handlePress}>
      <IconBackground color={item.color}>
        <CategoryIcon name={item.iconName} />
      </IconBackground>
      <CategoryLabel>{item.displayLabel}</CategoryLabel>
    </CategoryButton>
  );
};

const FinancialCategories: React.FC = () => {
  const categories: CategoryItem[] = [
    {
      id: "income",
      displayLabel: "Income",
      screenName: "AddIncome",
      iconName: "cash-outline",
      color: "#81C784",
    },
    {
      id: "expense",
      displayLabel: "Expense",
      screenName: "AddExpensesScreen",
      iconName: "remove-circle-outline",
      color: "#E57373",
    },
    {
      id: "savings",
      displayLabel: "Savings",
      screenName: "Savings",
      iconName: "star-outline",
      color: "#64B5F6",
    },
    {
      id: "stores",
      displayLabel: "Store",
      screenName: "stores",
      iconName: "storefront-outline",
      color: "#64B5F6",
    }
  ];

  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => <CategoryListItem item={item} />}
      keyExtractor={(item) => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default FinancialCategories;
