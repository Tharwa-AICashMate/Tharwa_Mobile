// import React from "react";
// import { SafeAreaView } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";

// import { RootStackParamList } from "App";
// import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
// import TransactionForm from "@/componenets/TransactionForm";
// import Theme from "@/theme";
// import { create } from "axios";
// import { createDeposit } from "@/redux/slices/depositSlice";

// type AddSavingsScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   "AddSavings"
// >;

// const AddSavingsScreen = () => {
//   const navigation = useNavigation<AddSavingsScreenNavigationProp>();
//   const dispatch = useAppDispatch();
//   const { items: savingsGoals } = useAppSelector((state) => state.goals);

  

//   const handleSubmit = (data: {
//     date: Date;
//     category: string;
//     amount: string;
//     title: string;
//     message: string;
//   }) => {

//     const selectedGoal = savingsGoals.find((cat) => cat.name === data.category);
//   if (!selectedGoal ) {
//     console.error("Category or user not found");
//     return;
//   }
//     const amountValue = parseFloat(data.amount);
//     if (isNaN(amountValue)) return;

//     const newDeposit = {

//       goal_id: selectedGoal.id as string,
//       amount: amountValue,
//       message: data.title || `Deposit to ${data.category}`,
//       title: data.title,
//       // id: Date.now().toString(),
//       // amount: amountValue,
//       // date: data.date.toLocaleDateString("en-US", { month: "long", day: "numeric" }),
//       // time: data.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//       // note: data.title || `Deposit to ${data.category}`,
//     };

//     dispatch(
//       createDeposit(newDeposit)
//     );

//     navigation.navigate("SavingDetails", {
//       categoryName: data.category,
//       goalID: selectedGoal.id,
      
//       Icon: selectedGoal.icon,
//     });
//   };

  
//   // const categories = Object.keys(savingsCategories).map((name) => ({
//   //   id: name,
//   //   name,
//   //   icon: getIconForCategory(name),
//   //   color: getColorForCategory(name),
//   // }));

//   // function getIconForCategory(category: string): string {
//   //   switch (category) {
//   //     case "Travel": return "airplane";
//   //     case "New House": return "home";
//   //     case "Car": return "car";
//   //     case "Wedding": return "heart";
//   //     default: return "wallet";
//   //   }
//   // }

//   // function getColorForCategory(category: string): string {
//   //   switch (category) {
//   //     case "Travel": return "#FF9F1C";
//   //     case "New House": return "#2EC4B6";
//   //     case "Car": return "#E71D36";
//   //     case "Wedding": return "#FF70A6";
//   //     default: return "#007AFF";
//   //   }
//   // }

//   return (
//     <SafeAreaView style={{ flex: 1 , backgroundColor:Theme.colors.primary}}>
//       <Header title="Add to Savings"  />
//       <TransactionForm
//         title="Savings"
//         buttonText="Add to Savings"
//         categories={savingsGoals}
//         onSubmit={handleSubmit}
//       />
//     </SafeAreaView>
//   );
// };

// export default AddSavingsScreen;
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Keyboard } from "react-native";

import { RootStackParamList } from "App";
import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import Theme from "@/theme";
import { createDeposit } from "@/redux/slices/depositSlice";
import styles from "@/componenets/TransactionForm/style";


type AddSavingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddSavings"
>;

const AddSavingsScreen = () => {
  const navigation = useNavigation<AddSavingsScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { items: savingsGoals } = useAppSelector((state) => state.goals);

  // Form state
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handleSubmit = () => {
    setValidationError("");

    if (!category || !amount) {
      setValidationError("Please fill in category and amount fields");
      return;
    }

    const selectedGoal = savingsGoals.find((cat) => cat.name === category);
    if (!selectedGoal) {
      console.error("Savings goal not found");
      return;
    }

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue)) return;

    const newDeposit = {
      goal_id: selectedGoal.id || 12,
      amount: amountValue,
      message: title || `Deposit to ${category}`,
      title: title || `Deposit to ${category}`,
      
    };

    dispatch(createDeposit(newDeposit));

    navigation.navigate("SavingDetails", {
      categoryName: category,
      goalID: selectedGoal.id as number,
      Icon: selectedGoal.icon as string,
      Target: selectedGoal.target_amount,

      
    });
  };

  const formatDateForWebInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.colors.primary }}>
      <Header title="Add to Savings" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, minHeight: '100%' }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
          <View style={styles.formContainer}>
            <ScrollView
              contentContainerStyle={{ paddingBottom: 20 }}
              keyboardDismissMode="interactive"
              keyboardShouldPersistTaps="handled"
            >
              {/* Validation Error Message */}
              {validationError ? (
                <Text style={{ color: "red", marginBottom: 10, textAlign: "center" }}>
                  {validationError}
                </Text>
              ) : null}

              {/* Date */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Date</Text>

                {Platform.OS === "web" ? (
                  <input
                    type="date"
                    value={formatDateForWebInput(date)}
                    onChange={(e) => {
                      const selectedDate = new Date(e.target.value);
                      setDate(selectedDate);
                    }}
                    style={styles.dateSelect}
                  />
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.input}
                      onPress={showDatePickerModal}
                    >
                      <Text style={{ color: Theme.colors.text }}>
                        {date.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Text>
                      <Ionicons
                        name="calendar-outline"
                        size={20}
                        color={Theme.colors.text}
                      />
                    </TouchableOpacity>

                    {showDatePicker && (
                      <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                      />
                    )}
                  </>
                )}
              </View>

              {/* Category */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Category</Text>

                {Platform.OS === "web" ? (
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={styles.webSelect}
                  >
                    <option value="">Select the savings goal</option>
                    {savingsGoals.map((goal) => (
                      <option key={goal.id} value={goal.name}>
                        {goal.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.input}
                      onPress={() => {
                        Keyboard.dismiss();
                        setShowCategoryPicker(!showCategoryPicker);
                      }}
                    >
                      <Text style={{ color: Theme.colors.text }}>
                        {category || "Select the savings goal"}
                      </Text>
                      <Ionicons
                        name="chevron-down"
                        size={20}
                        color={Theme.colors.textLight}
                      />
                    </TouchableOpacity>
                    {showCategoryPicker && (
                      <View style={styles.categoryPicker}>
                        <ScrollView>
                          {savingsGoals.map((goal) => (
                            <TouchableOpacity
                              key={goal.id}
                              style={styles.categoryOption}
                              onPress={() => {
                                setCategory(goal.name);
                                setShowCategoryPicker(false);
                              }}
                            >
                              <View
                                style={[
                                  styles.categoryIcon,
                                  { backgroundColor: Theme.colors.accentLight },
                                ]}
                              >
                                <Ionicons
                                  name={goal.icon as any}
                                  size={16}
                                  color="white"
                                />
                              </View>
                              <Text style={{ color: Theme.colors.text }}>
                                {goal.name}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    )}
                  </>
                )}
              </View>

              {/* Amount */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                  style={[styles.input, { color: Theme.colors.text }]}
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="$0.00"
                  placeholderTextColor={Theme.colors.textLight}
                  keyboardType="numeric"
                />
              </View>

              {/* Title */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Savings Title</Text>
                <TextInput
                  style={[styles.input, { color: Theme.colors.text }]}
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Bonus deposit"
                  placeholderTextColor={Theme.colors.textLight}
                />
              </View>

              {/* Message */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Note (Optional)</Text>
                <TextInput
                  style={[styles.messageInput, { color: Theme.colors.text }]}
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Enter any additional notes"
                  placeholderTextColor={Theme.colors.textLight}
                  multiline
                />
              </View>

              {/* Save Button */}
              <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                <Text style={styles.saveButtonText}>Add to Savings</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddSavingsScreen;