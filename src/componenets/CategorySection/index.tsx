import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./style";
import Theme from "@/theme";

type Props = {
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

const CategorySection: React.FC<Props> = ({ name, icon }) => {
  return (
    <View style={styles.container}>
      <View style={styles.categoryBox}>
        <MaterialCommunityIcons name={icon}  size={Theme.typography.size.xxl} color={Theme.colors.background} />
      </View>
      <Text style={styles.categoryText}>{name}</Text>
    </View>
  );
};



export default CategorySection;