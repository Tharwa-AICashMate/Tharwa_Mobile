import React from "react";
import { Alert, SafeAreaView } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootStackParamList } from "App";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import TransactionForm from "@/componenets/TransactionForm";
import Theme from "@/theme";
import { createDeposit } from "@/redux/slices/depositSlice";
import { useTranslation } from "react-i18next";

type AddSavingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddSavings"
>;
type editRouteProp = RouteProp<RootStackParamList, "AddIncome">;

const AddSavingsScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<AddSavingsScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { items: savingsGoals } = useAppSelector((state) => state.goals);
  const route = useRoute<editRouteProp>();

  const { categoryName, goalID, Target, currentAmount } = route.params;
  const selectedCategory= categoryName;

  // const data = route.params;
  // const savingCategory= data?.savingCategory;
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
      Alert.alert(t("errors.goalNotFound"), t("errors.goalNotFoundMessage"));
      return;
    }

    const amountValue = parseFloat(data.amount);
    if (isNaN(amountValue)) {
      Alert.alert(t("errors.invalidAmount"), t("errors.enterValidAmount"));
      return;
    }

    const remainingAmount = Target - currentAmount;
    if (amountValue > remainingAmount) {
      Alert.alert(
        t("errors.exceedsTarget"),
        t("errors.depositExceedsTargetMessage")
      );
      return;
    }

    const newDeposit = {
      goal_id: selectedGoal.id as number,
      amount: amountValue,
      message: data.message,
      title: data.title || `Deposit to ${data.category}`,
      created_at: data.created_at
    };

    dispatch(createDeposit(newDeposit));

    // Show success alert after deposit is created
    Alert.alert(
      t("savingsSuccess.title"),
      t("savingsSuccess.message", { 
        amount: amountValue.toFixed(2), 
        goal: data.category 
      }),
      [
        { 
          text: t("common.ok"), 
          onPress: () => navigation.goBack()
        }
      ]
    );
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.primary}}>
      <Header title={t("savingsScreen.addToSavings")} />
      <TransactionForm
        title={t("savingsScreen.savings")}
        buttonText={t("savingsScreen.addToSavings")}
        onSubmit={handleSubmit}
        initialCategory={selectedCategory}
        initialAmount=""
        initialTitle={`${selectedCategory} deposite`}
        initialMessage=""
        initialDate={new Date()}
        resetAfterSubmit={true}
        isSavings={true}
      />
    </SafeAreaView>
  );
};

export default AddSavingsScreen;