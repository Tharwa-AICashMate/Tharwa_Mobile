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
        <Ionicons name="arrow-back" size={24} color={Theme.colors.text} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{name}</Text>
      <TouchableOpacity>
        <Ionicons name="notifications-outline" size={24} color={Theme.colors.text} />
      </TouchableOpacity>
    </View>
  );
}

type HeaderTabsProps = {
  tabs: { id: string; title: string }[];
  activeTab: string;
  onTabPress: (tabId: string) => void;
};

const HeaderTabs: React.FC<HeaderTabsProps> = ({ tabs, activeTab, onTabPress }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {tabs.map(tab => (
        <Text
          key={tab.id}
          style={{
            margin: 10,
            fontWeight: activeTab === tab.id ? 'bold' : 'normal',
          }}
          onPress={() => onTabPress(tab.id)}
        >
          {tab.title}
        </Text>
      ))}
    </View>
  );
};

export default Header;
