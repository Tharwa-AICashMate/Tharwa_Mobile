import Theme from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  categoriesContainer: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 40,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  categoryCard: {
    width: "30%",
    alignItems: "center",
    marginBottom: 20,
    margin:5
  },
  categoryIconContainer: {
    width: 80,
    height: 70,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: Theme.colors.text,
    fontWeight: "500",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },

});
export default styles;