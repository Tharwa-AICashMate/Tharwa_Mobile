import Theme from "@/theme";
 import { StyleSheet } from "react-native";
 
 export const styles = StyleSheet.create({
   container: {
     flexDirection: "row",
     flexWrap: "wrap",
     justifyContent: "space-between",
     margin: 16,
     paddingHorizontal: 8,
     paddingVertical: 8,
   },
   tile: {
     width: "50%",
     aspectRatio: 3,
     alignItems: "center",
     justifyContent: "flex-start",
     borderRadius: 12,
     marginBottom: 16,
     flexDirection: "row",
   },
   iconContainer: {
     width: 40,
     height: 40,
     borderRadius: 22,
     padding: 13,
     justifyContent: "center",
     alignItems: "center",
     minWidth: 55,
     minHeight: 55,
   },
   label: {
     fontSize: 14,
     fontWeight: "600",
     color: Theme.colors.text,
   },
 });
