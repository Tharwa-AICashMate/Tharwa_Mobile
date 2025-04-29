import React, { useCallback, useEffect, useState } from "react";
import { View, SafeAreaView } from "react-native";
import { useNavigation, useFocusEffect, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import TransactionForm from "@/componenets/TransactionForm";
import Theme from "@/theme";
import { createTransaction } from "@/redux/slices/categoryTransactions";
import { getCurrentUserId } from "@/utils/auth";
import { RootStackParamList } from "App";
import { editTransactionsAsync } from "@/redux/slices/transactionSlice";
import { fetchUserCategories } from "@/redux/slices/categoriesSlice";

type AddExpensesScreenNavigationProp = NativeStackNavigationProp<{
  CategoryDetail: { categoryName: string; categoryId: number; UserId: string; Icon: string };
  AddExpensesScreen: undefined;
}>;
type editRouteProp = RouteProp<RootStackParamList, 'AddExpensesScreen'>;

const AddExpensesScreen = () => {
  const navigation = useNavigation<AddExpensesScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { items: categories } = useAppSelector((state) => state.categories);
  const route = useRoute<editRouteProp>();
  
  //const [userId, setUserId] = useState<string | null>(null);
  const userId = useAppSelector(state => state.auth.user?.id);
  const data = route.params;
  const transaction = data?.transaction;
  // useFocusEffect(
  //   useCallback(() => {
  //     const fetchUserId = async () => {
  //       try {
  //         const id = await getCurrentUserId();
  //         setUserId(id);
  //       } catch (error) {
  //         console.error("Failed to get user ID:", error);
  //       }
  //     };

  //     fetchUserId();
  //   }, [])
  // );

  useEffect(()=>{
    if(!categories.length && userId)
      dispatch(fetchUserCategories(userId))

  },[userId])

  const handleSubmit = (data: {
    category: string;
    amount: string;
    title: string;
    type: "expence";
    message: string;
    created_at:Date;
  }) => {
    const selectedCategory = categories.find((cat) => cat.name === data.category);
   
    if (!selectedCategory || !userId) {
      console.error("Category or user not found");
      return;
    }

    const newTransaction = {
      category_id: Number(selectedCategory.id),
      amount: parseFloat(data.amount),
      type: data.type,
      title: data.title || data.category,
      created_at:data.created_at
    };
    if(transaction?.transaction_id){
      dispatch(editTransactionsAsync({...newTransaction,id:transaction.transaction_id})).then((res) =>{
        if(res.meta.requestStatus === "fulfilled"){
          navigation.goBack()
        }
      })
    }
    else
      dispatch(createTransaction(newTransaction)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigation.replace("CategoryDetail", {
            categoryName: selectedCategory.name,
            categoryId: selectedCategory.id as number,
            UserId: userId,
            Icon: selectedCategory.icon,
          });
        }
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.primary }}>
      <Header title="Add Expenses" />
      <View style={{ flex: 1, backgroundColor: Theme.colors.background }}>
        {transaction ?
        <TransactionForm
          title="Expense"
          buttonText="Save"
          categories={categories}
          onSubmit={handleSubmit}
          initialCategory={transaction?.category_name}
          initialAmount={transaction?.amount.toString()}
          initialTitle={transaction?.title}
          initialMessage={transaction?.description}
          initialDate={new Date(transaction?.created_at) }
        />:<TransactionForm
        title="Expense"
        buttonText="Save"
        categories={categories}
        onSubmit={handleSubmit}
         />}
      </View>
    </SafeAreaView>
  );
};

export default AddExpensesScreen;
