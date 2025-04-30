import React from "react";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Theme from "@/theme";
import { styles } from "./styles";

export type NavigationTile = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  backgroundColor: string;
};

type HomeScreenNavigationProps = {
  onSelectTile: (tile: NavigationTile) => void;
  style?: ViewStyle;
};

const HomeScreenNavigation: React.FC<HomeScreenNavigationProps> = ({
  onSelectTile,
  style,
}) => {
  const tiles: NavigationTile[] = [
    {
      id: "addIncome",
      label: "Add Income",
      icon: "wallet-outline",
      backgroundColor: Theme.colors.accentLight,
    },
    {
      id: "allStores",
      label: "All Stores",
      icon: "business-outline",
      backgroundColor: Theme.colors.accentLight,
    },
    {
      id: "savingGoals",
      label: "Saving Goals",
      icon: "trophy-outline",
      backgroundColor: Theme.colors.accent,
    },
    {
      id: "myStores",
      label: "My Stores",
      icon: "storefront-outline",
      backgroundColor: Theme.colors.accent,
    },
    {
      id: "addExpenses",
      label: "Add Expenses",
      icon: "cash-outline",
      backgroundColor: Theme.colors.accentDark,
    },
    {
      id: "findStores",
      label: "Find Stores",
      icon: "search-outline",
      backgroundColor: Theme.colors.accentDark,
    },
  ];

  return (
    <View style={[styles.container, style]}>
      {tiles.map((tile) => (
        <TouchableOpacity
          key={tile.id}
          style={[
            styles.tile,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingHorizontal: 12,
            },
          ]}
          onPress={() => onSelectTile(tile)}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: tile.backgroundColor },
            ]}
          >
            <Ionicons
              name={tile.icon}
              size={24}
              color={Theme.colors.background}
            />
          </View>
          <Text style={[styles.label, { marginLeft: 8, textAlign: "left" }]}>
            {tile.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HomeScreenNavigation;
