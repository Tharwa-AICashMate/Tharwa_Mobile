import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addTransaction } from "@/redux/slices/expenseSlice";
import { RootStackParamList } from "App";
import Header from "@/componenets/Header";
import styles from "./style";
import Theme from "@/theme";

type AddExpensesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddExpenses"
>;

const AddExpensesScreen = () => {
  const navigation = useNavigation<AddExpensesScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.expenses.categories);

  // Form state
  const [date, setDate] = useState(new Date());
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

  const navigateBack = () => {
    navigation.goBack();
  };

  const saveExpense = () => {
    
    setValidationError("");
    
    if (!category || !amount) {
      setValidationError("Please fill in category and amount fields");
      return;
    }

    const selectedCategory = categories.find((cat) => cat.name === category);

    const newTransaction = {
      category: category,
      amount: parseFloat(amount),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: date,
      icon: selectedCategory?.icon || "cash",
      iconBgColor: Theme.colors.accentLight,
      title: title || category, 
      message: message || "", 
    };

    
    dispatch(addTransaction(newTransaction));
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <Header name="Add Expenses" navigateBack={navigateBack} />

          {/* Form */}
          <ScrollView style={styles.formContainer} contentContainerStyle={{ paddingBottom: 20 }}>
            {/* Validation Error Message */}
            {validationError ? (
              <Text style={{ color: "red", marginBottom: 10, textAlign: "center" }}>
                {validationError}
              </Text>
            ) : null}

            {/* Date */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={showDatePickerModal}
              >
                <Text>
                  {date.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Text>
                <Ionicons name="calendar-outline" size={20} color={Theme.colors.primary} />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
            </View>

            {/* Category */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Category</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => {
                  Keyboard.dismiss();
                  setShowCategoryPicker(!showCategoryPicker);
                }}
              >
                <Text>{category || "Select the category"}</Text>
                <Ionicons name="chevron-down" size={20} color={Theme.colors.textLight} />
              </TouchableOpacity>

              {/* Category Picker */}
              {showCategoryPicker && (
                <View style={styles.categoryPicker}>
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat.id}
                      style={styles.categoryOption}
                      onPress={() => {
                        setCategory(cat.name);
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
                          name={cat.icon as any}
                          size={16}
                          color="white"
                        />
                      </View>
                      <Text>{cat.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Amount */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Amount</Text>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                placeholder="$0.00"
                keyboardType="numeric"
              />
            </View>

            {/* Expense Title */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Expense Title</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Dinner"
              />
            </View>

            {/* Message */}
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.messageInput}
                value={message}
                onChangeText={setMessage}
                placeholder="Enter Message"
                multiline
                numberOfLines={4}
              />
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={saveExpense}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddExpensesScreen;