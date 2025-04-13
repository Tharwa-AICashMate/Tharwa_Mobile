import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./style";
import Theme from "@/theme";
function Header({
  name,
  navigateBack,
}: {
  name: string;
  navigateBack: () => void;
}) {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={navigateBack}>
        <Ionicons name="arrow-back" size={24} color= {Theme.colors.text} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{name}</Text>
      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={24} color={Theme.colors.text}  />
      </TouchableOpacity>
    </View>
  );
}

export default Header;
