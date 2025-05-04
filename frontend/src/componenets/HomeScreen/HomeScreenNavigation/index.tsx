import React from "react";
import { View, Text, TouchableOpacity, ViewStyle, I18nManager } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Theme from "@/theme";
import { styles } from "./styles";
import { useTranslation } from "react-i18next";

export type NavigationTile = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  screen: string;
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
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar'; // More reliable than I18nManager.isRTL

  const tiles: NavigationTile[] = [
    {
      id: "addIncome",
      label: t("home.navigation.addIncome"),
      icon: isRTL ? "wallet" : "wallet-outline", // Use filled icon for RTL if needed
      backgroundColor: Theme.colors.accentLight,
      screen: "AddIncome",
    },
    {
      id: "allStores",
      label: t("home.navigation.allStores"),
      icon: "business-outline",
      backgroundColor: Theme.colors.accentLight,
      screen: "AllStores",
    },
    {
      id: "savingGoals",
      label: t("home.navigation.savingGoals"),
      icon: isRTL ? "trophy" : "trophy-outline",
      backgroundColor: Theme.colors.accent,
      screen: "Savings",
    },
    {
      id: "myStores",
      label: t("home.navigation.myStores"),
      icon: "storefront-outline",
      backgroundColor: Theme.colors.accent,
      screen: "FavoriteStores",
    },
    {
      id: "addExpenses",
      label: t("home.navigation.addExpenses"),
      icon: isRTL ? "cash" : "cash-outline",
      backgroundColor: Theme.colors.accentDark,
      screen: "AddExpensesScreen",
    },
    {
      id: "addStores",
      label: t("home.navigation.addStores"),
      icon: isRTL ? "add-circle" : "add-outline",
      backgroundColor: Theme.colors.accentDark,
      screen: "AddStore",
    },
  ];

  return (
    <View style={[styles.container, style,{flexDirection:isRTL?'row-reverse':'row'}]}>
      {tiles.map((tile) => (
        <TouchableOpacity
          key={tile.id}
          style={[
            styles.tile,
            {
              flexDirection: isRTL ? "row-reverse" : "row",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingStart: isRTL ? 12 : 16, 
              paddingEnd: isRTL ? 16 : 12,
            },
          ]}
          onPress={() => onSelectTile(tile)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.iconContainer,
              { 
                backgroundColor: tile.backgroundColor,
                marginEnd: isRTL ? 0 : 8,
                marginStart: isRTL ? 8 : 0,
              }
            ]}
          >
            <Ionicons
              name={tile.icon}
              size={24}
              color={Theme.colors.background}
            />
          </View>
          <Text
            style={[
              styles.label,
              { 
                textAlign: isRTL ? "right" : "left",
                writingDirection: isRTL ? "rtl" : "ltr",
              }
            ]}
            numberOfLines={2} 
            adjustsFontSizeToFit 
          >
            {tile.label}
          </Text>
          
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default HomeScreenNavigation;
