
import React from "react";

import { SafeAreaView } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

import { RootStackParamList } from "App";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import TransactionForm from "@/componenets/TransactionForm";
import Theme from "@/theme";
import { createDeposit } from "@/redux/slices/depositSlice";

type AddSavingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddSavings"
>;
type editRouteProp = RouteProp<RootStackParamList, "AddIncome">;

const AddSavingsScreen = () => {
  const navigation = useNavigation<AddSavingsScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { items: savingsGoals } = useAppSelector((state) => state.goals);
  const route = useRoute<editRouteProp>();

  const data = route.params;
  const savingCategory= data?.savingCategory;
  const handleSubmit = (data: {
    category: string;
    amount: string;
    title: string;
    message: string;
    created_at: Date;
    type: "expense" | "income" | "savings";
  }) => {
    const selectedGoal = savingsGoals.find((goal) => goal.name === data.category);
    if (!selectedGoal) {
      console.error("Savings goal not found");
      return;
    }

    const amountValue = parseFloat(data.amount);
    if (isNaN(amountValue)) return;

    const newDeposit = {
      goal_id: selectedGoal.id as number,
      amount: amountValue,
      message: data.message,
      title: data.title || `Deposit to ${data.category}`,
      created_at: data.created_at
    };

    dispatch(createDeposit(newDeposit));

    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.primary }}>
      <Header title="Add to Savings" />
      <TransactionForm
        title="Savings"
        buttonText="Add to Savings"
        onSubmit={handleSubmit}
        initialCategory={savingCategory}
        initialAmount=""
        initialTitle=""
        initialMessage=""
        initialDate={new Date()}
        resetAfterSubmit={true}
        isSavings={true}
      />
    </SafeAreaView>
  );
};

export default AddSavingsScreen;