import React from "react";
import {  Text, TouchableOpacity, Pressable } from "react-native";
import styles from "./style";
import Theme from "@/theme";
import { Ionicons } from "@expo/vector-icons";

type CategoryItem = {
    id: string;
  name: string;
  icon: string;
};

type Props = {
  data: CategoryItem[];
  onpress: (item: string) => void;
};

const CategorySection: React.FC<Props> = ({ data, onpress }) => {
  return (
    
        <>
        {data.map((item) => (
          <TouchableOpacity key={item.id} style={styles.categoryCard}>
            <Pressable
              onPress={() => onpress(item.name)}
              style={({ pressed }) => [
                styles.categoryIconContainer,
                {
                  backgroundColor: pressed
                    ? Theme.colors.accentDark
                    : Theme.colors.accentLight,
                },
              ]}
            >
              <Ionicons name={item.icon as any} size={40} color="white" />
            </Pressable>
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        ))}
        </>
    
  );
};
export default CategorySection;