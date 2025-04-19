import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFonts, Inter_500Medium } from "@expo-google-fonts/inter";

interface FilterTabsProps {
  onTabChange: (tab: "daily" | "weekly" | "monthly") => void;
  initialTab?: "daily" | "weekly" | "monthly";
}

const FilterTabs: React.FC<FilterTabsProps> = ({
  onTabChange,
  initialTab = "monthly",
}) => {
  const [activeTab, setActiveTab] = useState<"daily" | "weekly" | "monthly">(
    initialTab
  );
  const [fontsLoaded] = useFonts({
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null; // Or a loading indicator
  }

  const handleTabPress = (tab: "daily" | "weekly" | "monthly") => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === "daily" && styles.activeTab]}
        onPress={() => handleTabPress("daily")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "daily" && styles.activeTabText,
          ]}
        >
          Daily
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === "weekly" && styles.activeTab]}
        onPress={() => handleTabPress("weekly")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "weekly" && styles.activeTabText,
          ]}
        >
          Weekly
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === "monthly" && styles.activeTab]}
        onPress={() => handleTabPress("monthly")}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "monthly" && styles.activeTabText,
          ]}
        >
          Monthly
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderRadius: 20,
    padding: 5,
    marginVertical: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    color: "#757575",
  },
  activeTab: {
    backgroundColor: "#FFDA63",
  },
  activeTabText: {
    color: "#000",
  },
});

export default FilterTabs;
