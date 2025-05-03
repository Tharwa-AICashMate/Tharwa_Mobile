import React  from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { AppDispatch, RootState } from "../../redux/store";

import SettingsItem from "../../componenets/SettingsItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import Theme from "@/theme";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";

const { height, width } = Dimensions.get("window");

type SettingsScreenNavigationProp = any;

const SettingsStore: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const userStores = useAppSelector((state: RootState) =>
    state.store.stores.filter((store) => store.added_by === state.auth.user?.id)
  );
  const handleBack = () => {
    navigation.goBack();
  };
 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.highlight}
        translucent={false}
      />
      <Header title="Settings Stores" />

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <SettingsItem
            title=" All Stores"
           
            icon={<Ionicons name="storefront-outline" size={20} color="#FECD3E" />}
            onPress={() => navigation.navigate("AllStores")}
          />
          <SettingsItem
            title=" Favorite Stores"
            icon={<Ionicons name="heart-outline" size={20} color="#FECD3E" />}
            onPress={() => navigation.navigate("FavoriteStores")}
          />
          <SettingsItem
            title=" Add Store"
            icon={<Ionicons name="add-circle-outline" size={20} color="#FECD3E" />}
            onPress={() => navigation.navigate("AddStore")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FECD3E",
  },
  header: {
    padding: 16,
    backgroundColor: "#FECD3E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: "white",
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    height: height,
    width: width,
    alignSelf: "center",
    padding: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default SettingsStore;
