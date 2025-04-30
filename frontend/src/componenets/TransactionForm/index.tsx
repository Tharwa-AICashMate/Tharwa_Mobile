import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchUserCategories } from "@/redux/slices/categoriesSlice";
import { getCurrentUserId } from "@/utils/auth";
import Theme from "@/theme";
import styles from "./style";

interface Category {
  id?: number;
  name: string;
  icon: string;
  user_id: string;
  created_at?: Date;
}

interface SavingsGoal {
  id?: number;
  name: string;
  icon: string;
  target_amount?: number;
  user_id: string;
  created_at?: Date;
}

interface DescriptionItem {
  name: string;
  unitPrice: string;
  quantity?: string;
}

interface TransactionFormProps {
  title: string;
  buttonText: string;
  onSubmit: (data: {
    category: string;
    amount: string;
    title: string;
    type: "expense" | "income" | "savings";
    message: string;
    created_at: Date;
    descriptionItems?: DescriptionItem[];
  }) => void;
  initialCategory?: string;
  initialAmount?: string;
  initialTitle?: string;
  initialMessage?: string;
  initialDate?: Date;
  resetAfterSubmit?: boolean;
  isIncome?: boolean;
  isSavings?: boolean;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  title,
  buttonText,
  onSubmit,
  initialCategory = "",
  initialAmount = "",
  initialTitle = "",
  initialMessage = "",
  initialDate = new Date(),
  resetAfterSubmit = true,
  isIncome = false,
  isSavings = false,
}) => {
  // Form state
  const [date, setDate] = useState<Date>(initialDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState(initialCategory);
  const [amount, setAmount] = useState(initialAmount);
  const [titleValue, setTitleValue] = useState(initialTitle);
  const [message, setMessage] = useState(initialMessage);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [descriptionItems, setDescriptionItems] = useState<DescriptionItem[]>([
    { name: "", unitPrice: "" },
  ]);
  
  // Redux state
  const dispatch = useAppDispatch();
  const { items: categories, loading: categoriesLoading } = useAppSelector((state) => state.categories);
  const { items: savingsGoals, loading: savingsLoading } = useAppSelector((state) => state.goals);
  
  // Find income category
  const incomeCategory = categories.find(category => 
    category.name.toLowerCase() === "income"
  );

  // Determine which categories to show based on form type
  const displayCategories = isSavings ? savingsGoals : categories;
  const isLoading = isSavings ? savingsLoading : categoriesLoading;

  // Keyboard tracking
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [currentFocusedInput, setCurrentFocusedInput] = useState<string | null>(null);
  
  // References
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRefs = useRef<{[key: string]: any}>({});

  // Error states
  const [errors, setErrors] = useState({
    date: "",
    category: "",
    amount: "",
    title: "",
    descriptionItems: [] as string[],
  });

  // Button press state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories when screen focuses
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        try {
          const userId = await getCurrentUserId();
          if (isActive && userId) {
            if (!isSavings) {
              await dispatch(fetchUserCategories(userId));
            }
          
          }
        } catch (error) {
          console.error("Failed to fetch categories:", error);
        }
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, [dispatch, isSavings])
  );

  // Keyboard event listeners
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        setKeyboardVisible(true);
      }
    );
    
    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  // Scroll to focused input
  useEffect(() => {
    if (currentFocusedInput && scrollViewRef.current && keyboardVisible) {
      setTimeout(() => {
        if (inputRefs.current[currentFocusedInput]) {
          inputRefs.current[currentFocusedInput].measureLayout(
            scrollViewRef.current,
            (_x: number, y: number) => {
              scrollViewRef.current?.scrollTo({
                y: y - 100,
                animated: true,
              });
            },
            () => {}
          );
        }
      }, 100);
    }
  }, [currentFocusedInput, keyboardVisible]);

  // Date handling
  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
    validateDate(currentDate);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
    Keyboard.dismiss();
    setCurrentFocusedInput(null);
  };

  // Validation functions
  const isValidNumber = (value: string): boolean => {
    if (value === "") return true;
    const numberRegex = /^-?\d*\.?\d+$/;
    return numberRegex.test(value);
  };

  const isPositiveNumber = (value: string): boolean => {
    if (value === "") return true;
    const numberValue = parseFloat(value);
    return !isNaN(numberValue) && numberValue >= 0;
  };

  const isValidItemName = (value: string): boolean => {
    return value.trim() !== "";
  };

  const isDateInFuture = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateToCheck = new Date(date);
    dateToCheck.setHours(0, 0, 0, 0);
    return dateToCheck > today;
  };

  // Field validation
  const validateDate = (dateToValidate: Date = date) => {
    let error = "";
    if (isDateInFuture(dateToValidate)) {
      error = "Date cannot be in the future";
    }
    setErrors(prev => ({ ...prev, date: error }));
    return !error;
  };

  const validateCategory = () => {
    if (isIncome) return true;
    
    let error = "";
    if (!category) {
      error = `Please select a ${isSavings ? "savings goal" : "category"}`;
    }
    setErrors(prev => ({ ...prev, category: error }));
    return !error;
  };

  const validateAmount = () => {
    let error = "";
    if (!amount) {
      error = "Amount is required";
    } else if (!isValidNumber(amount)) {
      error = "Amount must be a valid number";
    } else if (!isPositiveNumber(amount)) {
      error = "Amount must be a positive number";
    }
    setErrors(prev => ({ ...prev, amount: error }));
    return !error;
  };

  const validateTitle = () => {
    let error = "";
    if (titleValue.trim() === "" && titleValue !== "") {
      error = "Title cannot be just whitespace";
    }
    setErrors(prev => ({ ...prev, title: error }));
    return !error;
  };

  const validateDescriptionItems = () => {
    if (isIncome || isSavings) return true;
    
    const itemErrors: string[] = [];
    let isValid = true;

    descriptionItems.forEach((item, index) => {
      let error = "";
      
      if ((item.name !== "" || item.unitPrice !== "") && 
          (item.name === "" || item.unitPrice === "")) {
        error = "Please fill both name and price";
      }
      
      if (item.name !== "" && !isValidItemName(item.name)) {
        error = "Item name is required";
      }
      
      if (item.unitPrice !== "" && !isValidNumber(item.unitPrice)) {
        error = "Price must be a valid number";
      } else if (item.unitPrice !== "" && !isPositiveNumber(item.unitPrice)) {
        error = "Price must be positive";
      }
      
      if (item.quantity !== undefined && item.quantity !== "" && !isValidNumber(item.quantity)) {
        error = "Quantity must be a valid number";
      } else if (item.quantity !== undefined && item.quantity !== "" && !isPositiveNumber(item.quantity)) {
        error = "Quantity must be positive";
      }
      
      itemErrors[index] = error;
      if (error) isValid = false;
    });

    setErrors(prev => ({ ...prev, descriptionItems: itemErrors }));
    return isValid;
  };

  const validateForm = (): boolean => {
    const isDateValid = validateDate();
    const isCategoryValid = validateCategory();
    const isAmountValid = validateAmount();
    const isTitleValid = validateTitle();
    const isItemsValid = validateDescriptionItems();

    return isDateValid && isCategoryValid && isAmountValid && isTitleValid && isItemsValid;
  };

  const handleSubmit = () => {
    if (isSubmitting) return;
    if (!validateForm()) return;

    setIsSubmitting(true);

    const filteredItems = isIncome || isSavings ? undefined : descriptionItems.filter(
      item => item.name.trim() !== "" && item.unitPrice.trim() !== ""
    );

    try {
      onSubmit({
        category: isIncome ? (incomeCategory?.name || "income") : category,
        amount,
        title: titleValue,
        message,
        type: isSavings ? "savings" : (isIncome ? "income" : "expense"),
        created_at: date,
        descriptionItems: filteredItems,
      });

      if (resetAfterSubmit) {
        setDate(new Date());
        setCategory("");
        setAmount("");
        setTitleValue("");
        setMessage("");
        setDescriptionItems([{ name: "", unitPrice: "" }]);
        setErrors({
          date: "",
          category: "",
          amount: "",
          title: "",
          descriptionItems: [""],
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  // Description items functions
  const addDescriptionItem = () => {
    if (isIncome || isSavings) return;
    setDescriptionItems([...descriptionItems, { name: "", unitPrice: "" }]);
    setErrors(prev => ({
      ...prev,
      descriptionItems: [...prev.descriptionItems, ""]
    }));
  };

  const removeDescriptionItem = (index: number) => {
    if (isIncome || isSavings) return;
    const newItems = [...descriptionItems];
    newItems.splice(index, 1);
    setDescriptionItems(newItems);
    
    const newErrors = [...errors.descriptionItems];
    newErrors.splice(index, 1);
    setErrors(prev => ({ ...prev, descriptionItems: newErrors }));
  };

  const updateDescriptionItem = (
    index: number,
    field: keyof DescriptionItem,
    value: string
  ) => {
    if (isIncome || isSavings) return;
    
    const newItems = [...descriptionItems];
    
    if (field === "unitPrice" || field === "quantity") {
      if (value !== "" && value !== "." && !isValidNumber(value) && !value.endsWith(".")) {
        return;
      }
    }
    
    newItems[index] = { ...newItems[index], [field]: value };
    setDescriptionItems(newItems);
    validateDescriptionItems();
  };

  const formatDateForWebInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={[
            styles.scrollContainer,
            { paddingBottom: Platform.OS !== "web" ? keyboardHeight + 100 : 100 }
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={true}
        >
          <Pressable 
            style={{ flex: 1 }} 
            onPress={() => {
              Keyboard.dismiss();
              setShowCategoryPicker(false);
              setCurrentFocusedInput(null);
            }}
          >
            <View style={styles.formContainer}>
              {/* Date field */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Date</Text>
                {Platform.OS === "web" ? (
                  <input
                    type="date"
                    value={formatDateForWebInput(date)}
                    onChange={(e) => {
                      const selectedDate = new Date(e.target.value);
                      setDate(selectedDate);
                      validateDate(selectedDate);
                    }}
                    style={styles.dateSelect}
                    max={formatDateForWebInput(new Date())}
                  />
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.input}
                      onPress={showDatePickerModal}
                      ref={ref => inputRefs.current['date'] = ref}
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
                        maximumDate={new Date()}
                      />
                    )}
                  </>
                )}
                {errors.date ? (
                  <Text style={styles.errorText}>{errors.date}</Text>
                ) : null}
              </View>

              {/* Category field (hidden for income) */}
              {!isIncome && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>{isSavings ? "Savings Goal" : "Category"}</Text>
                  {Platform.OS === "web" ? (
                    <select
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value);
                        validateCategory();
                      }}
                      style={styles.webSelect}
                      onFocus={() => setCurrentFocusedInput('category')}
                    >
                      <option value="">{`Select the ${isSavings ? "savings goal" : "category"}`}</option>
                      {displayCategories.map((cat) => (
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
                          setCurrentFocusedInput('category');
                        }}
                        ref={ref => inputRefs.current['category'] = ref}
                      >
                        <Text style={{ color: Theme.colors.text }}>
                          {category || `Select the ${isSavings ? "savings goal" : "category"}`}
                        </Text>
                        <Ionicons
                          name="chevron-down"
                          size={20}
                          color={Theme.colors.textLight}
                        />
                      </TouchableOpacity>
                      {showCategoryPicker && (
                        <View style={[styles.categoryPicker, styles.categoryPickerScroll]}>
                          <ScrollView
                            nestedScrollEnabled={true}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={true}
                          >
                            {displayCategories.map((cat) => (
                              <TouchableOpacity
                                key={cat.id}
                                style={styles.categoryOption}
                                onPress={() => {
                                  setCategory(cat.name);
                                  setShowCategoryPicker(false);
                                  validateCategory();
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
                  {errors.category ? (
                    <Text style={styles.errorText}>{errors.category}</Text>
                  ) : null}
                </View>
              )}

              {/* Amount field */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                  ref={ref => inputRefs.current['amount'] = ref}
                  style={[styles.input, { color: Theme.colors.text }]}
                  value={amount}
                  onChangeText={(text) => {
                    if (text === "" || text === "." || (isValidNumber(text) && !text.startsWith("-")) || text.endsWith(".")) {
                      setAmount(text);
                    }
                  }}
                  onFocus={() => setCurrentFocusedInput('amount')}
                  onBlur={validateAmount}
                  placeholder="$0.00"
                  placeholderTextColor={Theme.colors.textLight}
                  keyboardType="numeric"
                />
                {errors.amount ? (
                  <Text style={styles.errorText}>{errors.amount}</Text>
                ) : null}
              </View>

              {/* Title field */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{title} Title</Text>
                <TextInput
                  ref={ref => inputRefs.current['title'] = ref}
                  style={[styles.input, { color: Theme.colors.text }]}
                  value={titleValue}
                  onChangeText={setTitleValue}
                  onFocus={() => setCurrentFocusedInput('title')}
                  onBlur={validateTitle}
                  placeholder={isIncome ? "Salary" : (isSavings ? "Monthly deposit" : "Dinner")}
                  placeholderTextColor={Theme.colors.textLight}
                />
                {errors.title ? (
                  <Text style={styles.errorText}>{errors.title}</Text>
                ) : null}
              </View>

              {/* Description Items (hidden for income and savings) */}
              {!isIncome && !isSavings && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Items (Optional)</Text>
                  {descriptionItems.map((item, index) => (
                    <View 
                      key={index} 
                      style={styles.descriptionItemContainer}
                      ref={ref => inputRefs.current[`item-${index}`] = ref}
                    >
                      <View style={styles.descriptionItemRow}>
                        <TextInput
                          style={[
                            styles.descriptionInput,
                            { flex: 2, color: Theme.colors.text },
                          ]}
                          value={item.name}
                          onChangeText={(text) =>
                            updateDescriptionItem(index, "name", text)
                          }
                          onFocus={() => setCurrentFocusedInput(`item-${index}`)}
                          onBlur={validateDescriptionItems}
                          placeholder="Item name"
                          placeholderTextColor={Theme.colors.textLight}
                        />
                        <TextInput
                          style={[
                            styles.descriptionInput,
                            { flex: 1, color: Theme.colors.text },
                          ]}
                          value={item.unitPrice}
                          onChangeText={(text) => {
                            if (text === "" || text === "." || (isValidNumber(text) && !text.startsWith("-")) || text.endsWith(".")) {
                              updateDescriptionItem(index, "unitPrice", text);
                            }
                          }}
                          onFocus={() => setCurrentFocusedInput(`item-${index}`)}
                          onBlur={validateDescriptionItems}
                          placeholder="Price"
                          placeholderTextColor={Theme.colors.textLight}
                          keyboardType="numeric"
                        />
                        <TextInput
                          style={[
                            styles.descriptionInput,
                            { flex: 1, color: Theme.colors.text },
                          ]}
                          value={item.quantity || ""}
                          onChangeText={(text) => {
                            if (text === "" || text === "." || (isValidNumber(text) && !text.startsWith("-")) || text.endsWith(".")) {
                              updateDescriptionItem(index, "quantity", text);
                            }
                          }}
                          onFocus={() => setCurrentFocusedInput(`item-${index}`)}
                          onBlur={validateDescriptionItems}
                          placeholder="Qty"
                          placeholderTextColor={Theme.colors.textLight}
                          keyboardType="numeric"
                        />
                        {descriptionItems.length > 1 && (
                          <TouchableOpacity
                            style={styles.removeItemButton}
                            onPress={() => removeDescriptionItem(index)}
                          >
                            <Ionicons
                              name="trash-outline"
                              size={18}
                              color={Theme.colors.text}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                      {errors.descriptionItems[index] ? (
                        <Text style={styles.errorText}>
                          {errors.descriptionItems[index]}
                        </Text>
                      ) : null}
                    </View>
                  ))}
                  <TouchableOpacity
                    style={styles.addItemButton}
                    onPress={addDescriptionItem}
                  >
                    <Ionicons
                      name="add-circle-outline"
                      size={20}
                      color={Theme.colors.primary}
                    />
                    <Text style={{ color: Theme.colors.primary, marginLeft: 5 }}>
                      Add Item
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Note field */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Note (Optional)</Text>
                <TextInput
                  ref={ref => inputRefs.current['message'] = ref}
                  style={[styles.messageInput, { color: Theme.colors.text }]}
                  value={message}
                  onChangeText={setMessage}
                  onFocus={() => setCurrentFocusedInput('message')}
                  placeholder="Enter any additional notes"
                  placeholderTextColor={Theme.colors.textLight}
                  multiline
                />
              </View>

              {/* Save Button */}
              <TouchableOpacity 
                style={styles.saveButton} 
                onPress={handleSubmit}
                disabled={isSubmitting || isLoading}
              >
                <Text style={styles.saveButtonText}>
                  {isSubmitting ? "Processing..." : buttonText}
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TransactionForm;