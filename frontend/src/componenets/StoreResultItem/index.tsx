import React from "react";
 import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
 import EvilIcons from "@expo/vector-icons/EvilIcons";
 import Theme from "@/theme";
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
  return (
    
  //   <TouchableOpacity
  //   style={styles.suggestionItem}
  //   onPress={() => handleAddStore(item)}
  // >
  //   <View style={styles.suggestionContent}>
  //     <View style={styles.textContainer}>
  //       <Text style={styles.storeName}>{item.properties.name}</Text>
  //       {item.properties.address_line2 && (
  //         <Text style={styles.addressText}>
  //           {item.properties.address_line2}
  //         </Text>
  //       )}
  //       <View
  //         style={[
  //           styles.buttonsContainer,
  //           dynamicStyles.buttonsContainer,
  //         ]}
  //       >
  //         <TouchableOpacity
  //           style={[styles.actionButton, styles.addButton]}
  //           onPress={() => handleAddStore(item)}
  //         >
  //           <Text style={styles.buttonText}>
  //             {t("addStoreScreen.addStoreButton")}
  //           </Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={[styles.actionButton, styles.mapButton]}
  //           onPress={() =>
  //             handleOpenMap(
  //               item.properties.lat,
  //               item.properties.lon
  //             )
  //           }
  //         >
  //           <Text style={styles.buttontext}>
  //             {t("addStoreScreen.viewInMap")}{" "}
  //             <EvilIcons
  //               name="arrow-right"
  //               size={24}
  //               color="rgba(32, 32, 99, 1)"
  //             />{" "}
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   </View>
  // </TouchableOpacity>
  <View style={styles.container}>
       <View style={styles.textContainer}>
         <Text style={styles.storeName}>{name}</Text>
         {address && <Text style={styles.addressText}>{address}</Text>}
         
         <View style={[styles.buttonsContainer, { flexDirection: isRTL ? "row-reverse" : "row" }]}>
           <TouchableOpacity
             style={[styles.button, styles.addButton]}
             onPress={onAddPress}
           >
             <Text style={styles.buttonText}>Add Store</Text>
           </TouchableOpacity>
           
           <TouchableOpacity
             style={[styles.button, styles.mapButton]}
             onPress={() => onMapPress(lat, lon)}
           >
             <Text style={styles.mapButtonText}>
               View in Map{" "}
               <EvilIcons
                 name="arrow-right"
                 size={24}
                 color={Theme.colors.accentDark}
               />
             </Text>
           </TouchableOpacity>
         </View>
       </View>
     </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Theme.colors.secondary,
    borderRadius: 8,
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: "500",
    color: Theme.colors.text,
  },
  addressText: {
    color: "#666",
    fontSize: 14,
    marginTop: 4,
  },
  buttonsContainer: {
    marginTop: 10,
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 150,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: Theme.colors.primary,
    color:Theme.colors.accentDark
  },
  mapButton: {
    backgroundColor: Theme.colors.background,
    
  },
  buttonText: {
    color:Theme.colors.accentDark,
    fontSize: 14,
    fontWeight: "500",
  },
  mapButtonText: {
    color:Theme.colors.accentDark,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default StoreResultItem;