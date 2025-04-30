import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface CategoryItem {
  id: string;
  label: string;
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
    if (item.id === "Store") {
     navigation.navigate("Profile", { screen:"SettingsStore"}); 
    } else {
      console.log(`Pressed ${item.label}`);
    }
  };

  return (
    <CategoryButton onPress={handlePress}>
      <IconBackground color={item.color}>
        <CategoryIcon name={item.iconName} />
      </IconBackground>
      <CategoryLabel>{item.label}</CategoryLabel>
    </CategoryButton>
  );
};

const FinancialCategories: React.FC = () => {
  const categories: CategoryItem[] = [
    {
      id: "income",
      label: "Income",
      iconName: "cash-outline",
      color: "#81C784",
    },
    {
      id: "expense",
      label: "Expense",
      iconName: "remove-circle-outline",
      color: "#E57373",
    },
    {
      id: "savings",
      label: "Savings",
      iconName: "star-outline",
      color: "#64B5F6",
    },
    {
      id: "Store",
      label: "Store",
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