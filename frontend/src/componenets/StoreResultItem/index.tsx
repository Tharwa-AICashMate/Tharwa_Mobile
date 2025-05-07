import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Theme from "@/theme";
import { useTranslation } from "react-i18next";

interface StoreResultItemProps {
  name: string;
  address?: string;
  lat: number;
  lon: number;
  onAddPress: () => void;
  onMapPress: (lat: number, lon: number) => void;
  isRTL?: boolean;
}

const StoreResultItem: React.FC<StoreResultItemProps> = ({
  name,
  address,
  lat,
  lon,
  onAddPress,
  onMapPress,
  isRTL = false,
}) => {
  const {t} = useTranslation()
  
  return (
    <View
      style={styles.suggestionItem}
    >
      <View style={styles.suggestionContent}>
        <View style={styles.textContainer}>
          <Text style={styles.storeName}>{name}</Text>
          {address && (
            <Text style={styles.addressText}>
              {address}
            </Text>
          )}
          <View
            style={[styles.buttonsContainer , {flexDirection:isRTL?"row":"row-reverse"}]}
          >
            <TouchableOpacity
              style={[styles.actionButton, styles.addButton]}
              onPress={onAddPress}
            >
              <Text style={styles.buttonText}>
                {t("addStoreScreen.addStoreButton")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.mapButton]}
              onPress={() =>
                onMapPress(lat, lon)
              }
            >
              <Text style={styles.buttontext}>
                {t("addStoreScreen.viewInMap")}{" "}
              </Text>
                <EvilIcons
                  name="arrow-right"
                  size={24}
                  color="rgba(32, 32, 99, 1)"
                  style={{flex:1}}
                />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
    //  <View style={styles.container}>
    //    <View style={styles.textContainer}>
    //      <Text style={styles.storeName}>{name}</Text>
    //      {address && <Text style={styles.addressText}>{address}</Text>}

    //      <View style={[styles.buttonsContainer, { flexDirection: isRTL ? "row-reverse" : "row" }]}>
    //        <TouchableOpacity
    //          style={[styles.button, styles.addButton]}
    //          onPress={onAddPress}
    //        >
    //          <Text style={styles.buttonText}>Add Store</Text>
    //        </TouchableOpacity>

    //        <TouchableOpacity
    //          style={[styles.button, styles.mapButton]}
    //          onPress={() => onMapPress(lat, lon)}
    //        >
    //          <Text style={styles.mapButtonText}>
    //            View in Map{" "}
    //            <EvilIcons
    //              name="arrow-right"
    //              size={24}
    //              color={Theme.colors.accentDark}
    //            />
    //          </Text>
    //        </TouchableOpacity>
    //      </View>
    //    </View>
    //  </View>
  );
};

 const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  warningText: {
    color: "orange",
    marginBottom: 12,
  },
  searchSection: {
    flexDirection: "column",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.secondery,
    borderRadius: 10,
    padding: 5,
    marginRight: 8,
    marginBottom: 15,
    fontSize: 16,
    height: 50,
    alignItems: "center",
    color: Theme.colors.text,
  },
  searchButton: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 16,
    borderRadius: 10,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  suggestionsContainer: {
    marginTop: 16,
    flex: 1,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  suggestionItem: {
    padding: 16,
    backgroundColor: "#fafafa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    borderRadius: 8,
    marginBottom: 12,
  },
  suggestionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  buttonsContainer: {
    gap:20,
    justifyContent: "space-around",
    alignItems:"center",
    marginTop: 10,
    height:50
  },
  actionButton: {
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  addButton: {
    paddingVertical:10,
    backgroundColor: Theme.colors.primary,
    textAlign: "center",
    flex:1
  },
  mapButton: {
    flex:1,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'center',
  },
  buttontext: {
    color: "rgba(32, 32, 99, 1)",
    fontSize: 14,
    fontWeight: "500",
  },
  storeName: {
    fontSize: 16,
    fontWeight: "500",
  },
  addressText: {
    color: "#666",
    fontSize: 14,
    marginTop: 4,
  },
  hintText: {
    color: "#888",
    textAlign: "center",
    marginTop: 16,
    fontStyle: "italic",
  },
  loadingText: {
    color: "#007bff",
    marginTop: 8,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginTop: 8,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 15,
    color: "#333",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#555",
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    padding: 12,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

// export default StoreForm;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: Theme.colors.secondery,
//     borderRadius: 8,
//     marginBottom: 12,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   storeName: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: Theme.colors.text,
//   },
//   addressText: {
//     color: "#666",
//     fontSize: 14,
//     marginTop: 4,
//   },
//   buttonsContainer: {
//     marginTop: 10,
//     justifyContent: "space-between",
//   },
//   button: {
//     borderRadius: 6,
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     minWidth: 150,
//     alignItems: "center",
//   },
//   addButton: {
//     backgroundColor: Theme.colors.primary,
//     color: Theme.colors.accentDark,
//   },
//   mapButton: {
//     backgroundColor: Theme.colors.background,
//   },
//   buttonText: {
//     color: Theme.colors.accentDark,
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   mapButtonText: {
//     color: Theme.colors.accentDark,
//     fontSize: 14,
//     fontWeight: "500",
//   },
// });

export default StoreResultItem;
