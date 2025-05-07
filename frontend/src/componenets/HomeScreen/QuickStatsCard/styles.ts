import Theme from "@/theme";
 import { StyleSheet } from "react-native";
 
 export const styles = StyleSheet.create({
   card: {
     backgroundColor: Theme.colors.primary,
     borderRadius: 12,
     padding: 12,
     width: "95%",
     shadowColor: "#000",
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.1,
     shadowRadius: 6,
     elevation: 3,
     marginTop: 16,
   },
   title: {
     fontSize: 16,
     fontWeight: "600",
     marginBottom: 12,
     color: Theme.colors.textDark,
   },
   statsContainer: {
     flexDirection: "row",
   },
   stat: {
     flex: 1,
     flexDirection: "row",
     alignItems: "flex-start",
   },
   iconContainer: {
     width: 36,
     height: 36,
     borderRadius: 18,
     backgroundColor: Theme.colors.secondery,
     justifyContent: "center",
     alignItems: "center",
     marginRight: 10,
   },
   statContent: {
     flex: 1,
   },
   label: {
     fontSize: 12,
     color: Theme.colors.text,
     marginBottom: 2,
   },
   amount: {
     fontSize: 16,
     fontWeight: "700",
     color: Theme.colors.textDark,
     marginBottom: 2,
   },
   description: {
     fontSize: 12,
     color: Theme.colors.text,
   },
   divider: {
     width: 1,
     backgroundColor: Theme.colors.textLight,
     marginHorizontal: 12,
   },
 });
