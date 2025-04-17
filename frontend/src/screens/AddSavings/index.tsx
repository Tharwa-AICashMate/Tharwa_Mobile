import React from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addDeposit } from "@/redux/slices/savingSlice";
import { RootStackParamList } from "App";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import TransactionForm from "@/componenets/TransactionForm";
import Theme from "@/theme";

type AddSavingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddSavings"
>;

const AddSavingsScreen = () => {
  const navigation = useNavigation<AddSavingsScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const savingsCategories = useAppSelector((state) => state.savings.categories);

  const handleSubmit = (data: {
    date: Date;
    category: string;
    amount: string;
    title: string;
    message: string;
  }) => {
    const amountValue = parseFloat(data.amount);
    if (isNaN(amountValue)) return;

    const newDeposit = {
      id: Date.now().toString(),
      amount: amountValue,
      date: data.date.toLocaleDateString("en-US", { month: "long", day: "numeric" }),
      time: data.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      note: data.title || `Deposit to ${data.category}`,
    };

    dispatch(
      addDeposit({
        category: data.category,
        deposit: newDeposit,
      })
    );

    navigation.navigate("SavingDetails", {
      categoryName: data.category,
    });
  };

  
  const categories = Object.keys(savingsCategories).map((name) => ({
    id: name,
    name,
    icon: getIconForCategory(name),
    color: getColorForCategory(name),
  }));

  function getIconForCategory(category: string): string {
    switch (category) {
      case "Travel": return "airplane";
      case "New House": return "home";
      case "Car": return "car";
      case "Wedding": return "heart";
      default: return "wallet";
    }
  }

  function getColorForCategory(category: string): string {
    switch (category) {
      case "Travel": return "#FF9F1C";
      case "New House": return "#2EC4B6";
      case "Car": return "#E71D36";
      case "Wedding": return "#FF70A6";
      default: return "#007AFF";
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 , backgroundColor:Theme.colors.primary}}>
      <Header title="Add to Savings"  />
      <TransactionForm
        title="Savings"
        buttonText="Add to Savings"
        categories={categories}
        onSubmit={handleSubmit}
      />
    </SafeAreaView>
  );
};

export default AddSavingsScreen;