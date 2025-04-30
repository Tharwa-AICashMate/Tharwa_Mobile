// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ViewStyle,
// } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import Theme from "@/theme";

// export type CategoryType = {
//   id: string;
//   label: string;
//   type: "income" | "expense" | "savings";
// };

// type FinanceCategoriesProps = {
//   onSelectCategory: (category: CategoryType) => void;
//   selectedCategoryId?: string;
//   style?: ViewStyle;
// };

// const FinanceCategories: React.FC<FinanceCategoriesProps> = ({
//   onSelectCategory,
//   selectedCategoryId,
//   style,
// }) => {
//   const categories: CategoryType[] = [
//     { id: "income", label: "Income", type: "income" },
//     { id: "expense", label: "Expense", type: "expense" },
//     { id: "savings", label: "Savings", type: "savings" },
//   ];

//   return (
//     <View style={[styles.container, style]}>
//       {categories.map((category) => (
//         <TouchableOpacity
//           key={category.id}
//           style={[
//             styles.category,
//             selectedCategoryId === category.id && styles.selectedCategory,
//           ]}
//           onPress={() => onSelectCategory(category)}
//         >
//           <View
//             style={[
//               styles.iconContainer,
//               {
//                 backgroundColor:
//                   category.type === "income"
//                     ? Theme.colors.primary
//                     : category.type === "expense"
//                       ? Theme.colors.accentDark
//                       : Theme.colors.accentLight,
//               },
//             ]}
//           >
//             <MaterialCommunityIcons
//               name={
//                 category.type === "income"
//                   ? "cash-multiple"
//                   : category.type === "expense"
//                     ? "cart-outline"
//                     : "wallet-outline"
//               }
//               size={24}
//               color={Theme.colors.background}
//             />
//           </View>
//           <Text style={styles.label}>{category.label}</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     width: "100%",
//   },
//   category: {
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 8,
//     width: 100,
//     marginVertical: 12,
//     marginHorizontal: 8,
//   },
//   selectedCategory: {
//     transform: [{ translateY: -4 }],
//   },
//   iconContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 8,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: Theme.colors.text,
//   },
// });

// export default FinanceCategories;
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Theme from "@/theme";

export type CategoryType = {
  id: string;
  label: string;
  type: "income" | "expense" | "savings";
};

type FinanceCategorySelectorsProps = {
  onSelectCategory: (category: CategoryType) => void;
  selectedCategoryId?: string;
  style?: ViewStyle;
};

const FinanceCategorySelectors: React.FC<FinanceCategorySelectorsProps> = ({
  onSelectCategory,
  selectedCategoryId,
  style,
}) => {
  const categories: CategoryType[] = [
    { id: "income", label: "Income", type: "income" },
    { id: "expense", label: "Expense", type: "expense" },
    { id: "savings", label: "Savings", type: "savings" },
  ];

  const getIconName = (
    type: CategoryType["type"]
  ): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case "income":
        return "cash-outline"; // Or 'arrow-up-outline', 'wallet-outline'
      case "expense":
        return "cart-outline"; // Or 'arrow-down-outline', 'cart-outline'
      case "savings":
        return "wallet-outline"; // Or 'piggy-bank-outline', 'star-outline'
      default:
        return "help-outline"; // Fallback icon
    }
  };

  return (
    <View style={[styles.container, style]}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.category,
            selectedCategoryId === category.id && styles.selectedCategory,
          ]}
          onPress={() => onSelectCategory(category)}
        >
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor:
                  category.type === "income"
                    ? Theme.colors.primary
                    : category.type === "expense"
                      ? Theme.colors.accentDark
                      : Theme.colors.accentLight,
              },
            ]}
          >
            <Ionicons
              name={getIconName(category.type)}
              size={24}
              color={Theme.colors.background}
            />
          </View>
          <Text style={styles.label}>{category.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    width: "100%",
  },
  category: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    width: 100,
    marginVertical: 12,
    marginHorizontal: 8,
  },
  selectedCategory: {
    transform: [{ translateY: -4 }],
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Theme.colors.text,
  },
});

export default FinanceCategorySelectors;