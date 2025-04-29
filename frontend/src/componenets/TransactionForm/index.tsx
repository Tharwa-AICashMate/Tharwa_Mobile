import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import Theme from "@/theme";
import styles from "./style";
import { Keyboard } from "react-native";

interface Category {
  id?: number;
  name: string;
  icon: string;
  user_id: string;
  created_at?: Date;
}

interface TransactionFormProps {
  title: string;
  buttonText: string;
  categories: Category[];
  onSubmit: (data: {
    category: string;
    amount: string;
    title: string;
    type:"expence";
    message: string;
    created_at:Date
  }) => void;
  initialCategory?: string;
  initialAmount?: string;
  initialTitle?: string;
  initialMessage?: string;
  initialDate?: Date;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  title,
  buttonText,
  categories,
  onSubmit,
  initialCategory = "",
  initialAmount = "",
  initialTitle = "",
  initialMessage = "",
  initialDate = new Date(),
}) => {
  // Form state
  const [date, setDate] = useState<Date>(initialDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState(initialCategory);
  const [amount, setAmount] = useState(initialAmount);
  const [titleValue, setTitleValue] = useState(initialTitle);
  const [message, setMessage] = useState(initialMessage);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [validationError, setValidationError] = useState("");
  let pressed = false;
  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handleSubmit = () => {
    if(pressed) return;
    setValidationError("");

    if (!category || !amount) {
      setValidationError("Please fill in category and amount fields");
      return;
    }
    pressed = true;


    onSubmit({
      category,
      amount,
      title: titleValue,
      message,
      type:"expence",
      created_at:date
    });
  };


  const formatDateForWebInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
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
            keyboardShouldPersistTaps="handled">
            {/* Validation Error Message */}
            {validationError ? (
              <Text
                style={{ color: "red", marginBottom: 10, textAlign: "center" }}
              >
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
                  <option value="">Select the category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
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
                      {category || "Select the category"}
                    </Text>
                    <Ionicons
                      name="chevron-down"
                      size={20}
                      color={Theme.colors.textLight}
                    />
                  </TouchableOpacity>
                  {showCategoryPicker && (
                    <View style={[styles.categoryPicker, { maxHeight: 350 }]}>
                      <ScrollView>
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
                                { backgroundColor:  Theme.colors.accentLight },
                              ]}
                            >
                              <Ionicons
                                name={cat.icon as any}
                                size={16}
                                color="white"
                              />
                            </View>
                            <Text style={{ color: Theme.colors.text }}>
                              {cat.name}
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
              <Text style={styles.label}>{title} Title</Text>
              <TextInput
                style={[styles.input, { color: Theme.colors.text }]}
                value={titleValue}
                onChangeText={setTitleValue}
                placeholder={title === "Expense" ? "Dinner" : "Bonus deposit"}
                placeholderTextColor={Theme.colors.textLight}
              />
            </View>

            {/* Message */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Note (Optional)</Text>
              <TextInput
                style={[
                  styles.messageInput,
                  { color: Theme.colors.text }
                ]}
                value={message}
                onChangeText={setMessage}
                placeholder="Enter any additional notes"
                placeholderTextColor={Theme.colors.textLight}
                multiline
              />
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
              <Text style={styles.saveButtonText}>{buttonText}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default TransactionForm;