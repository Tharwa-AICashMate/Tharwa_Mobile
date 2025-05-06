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
  I18nManager,
  Alert,
} from "react-native";
import { clearUserStores, setUserStores } from "@/redux/slices/storeSlice";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { fetchUserCategories } from "@/redux/slices/categoriesSlice";
import { getCurrentUserId } from "@/utils/auth";
import { useTranslation } from "react-i18next";
import Theme from "@/theme";
import styles from "./style";
import axios from "axios";
import { apiBase } from "@/utils/axiosInstance";
import axiosInstance from "@/config/axios";
import { store } from "@/redux/store";
import { fetchBalance, fetchFinanceData } from "@/redux/slices/financeSlice";

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
    store?: string;
  }) => void;
  initialCategory?: string;
  initialAmount?: string;
  initialTitle?: string;
  initialMessage?: string;
  initialDate?: Date;
  initialStore?: string;
  initialDetails?: any;
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
  initialStore = "",
  initialDetails = [{ name: "", unitPrice: "" }],
  resetAfterSubmit = true,
  isIncome = false,
  isSavings = false,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const navigation = useNavigation();
  // Form state
  const [date, setDate] = useState<Date>(initialDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState(initialCategory);
  const [amount, setAmount] = useState(initialAmount);
  const [titleValue, setTitleValue] = useState(initialTitle);
  const [message, setMessage] = useState(initialMessage);
  const [store, setStore] = useState(initialStore);
  const [storeText, setStoreText] = useState("");

  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [descriptionItems, setDescriptionItems] =
    useState<DescriptionItem[]>(initialDetails);
  const [showStorePicker, setShowStorePicker] = useState(false);
  const [stores, setStores] = useState<any[]>([]);
  const [storesLoading, setStoresLoading] = useState(false);





// Add this selector to get the current balance
const { balance, expenses, income, savings } = useAppSelector(
    (state) => state.finance
  );



  // Redux state
  const dispatch = useAppDispatch();
  const { items: categories, loading: categoriesLoading } = useAppSelector(
    (state) => state.categories
  );
  const { items: savingsGoals, loading: savingsLoading } = useAppSelector(
    (state) => state.goals
  );

  // Find income category
  const incomeCategory = categories.find(
    (category) => category.name.toLowerCase() === "income"
  );

  // Determine which categories to show based on form type
  const displayCategories = isSavings ? savingsGoals : categories;
  const isLoading = isSavings
    ? savingsLoading
    : categoriesLoading || storesLoading;

  // Keyboard tracking
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [currentFocusedInput, setCurrentFocusedInput] = useState<string | null>(
    null
  );

  // References
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRefs = useRef<{ [key: string]: any }>({});

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

  // Fetch user stores directly

  useEffect(() => {
    async function fetchAll() {
      const userId = await getCurrentUserId();

      dispatch(fetchBalance(userId));
      
    }

    fetchAll();
  }, [dispatch]);

  

  useEffect(() => {
    const fetchData = async () => {
      setUserId(await getCurrentUserId());
    };
    fetchData();
  }, []);
  const [userId, setUserId] = useState("");
  const { userStores, loading } = useAppSelector((state) => state.store);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (userId) {
          console.log(userId);
          const response = await axiosInstance.get(`/user/stores/${userId}`);
          dispatch(setUserStores(response.data));
        }
      } catch (error) {
        console.log("Error loading stores:", error);
      }
    };

    loadData();
  }, [dispatch, userId]);

  useEffect(() => {
    console.log("stoeId :", store);
    const matchedItem = userStores?.find((item) => item.id == store);
    setStoreText(matchedItem?.name);
  }, [stores, userStores]);

  // Keyboard event listeners
  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        setKeyboardVisible(true);
      }
    );

    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardDidHide",
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
                y: y - 130,
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
    return !isNaN(numberValue) && numberValue > 0;
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
      error = t("transactionForm.dateError");
    }
    setErrors((prev) => ({ ...prev, date: error }));
    return !error;
  };

  const validateCategory = () => {
    if (isIncome) return true;

    let error = "";
    if (!category) {
      error = isSavings
        ? t("transactionForm.savingsGoalError")
        : t("transactionForm.categoryError");
    }
    setErrors((prev) => ({ ...prev, category: error }));
    return !error;
  };

  const validateAmount = () => {
    let error = "";
    if (!amount) {
      error = t("transactionForm.amountError.required");
    } else if (!isValidNumber(amount)) {
      error = t("transactionForm.amountError.validNumber");
    } else if (!isPositiveNumber(amount)) {
      error = t("transactionForm.amountError.positive");
    }
    setErrors((prev) => ({ ...prev, amount: error }));
    return !error;
  };

  const validateTitle = () => {
    let error = "";
    if (titleValue.trim() === "" && titleValue !== "") {
      error = t("transactionForm.titleError");
    }
    setErrors((prev) => ({ ...prev, title: error }));
    return !error;
  };

  const validateDescriptionItems = () => {
    if (isIncome || isSavings) return true;

    const itemErrors: string[] = [];
    let isValid = true;

    descriptionItems.forEach((item, index) => {
      let error = "";

      if (
        (item.name !== "" || item.unitPrice !== "") &&
        (item.name === "" || item.unitPrice === "")
      ) {
        error = t("transactionForm.itemError.bothFields");
      }

      if (item.name !== "" && !isValidItemName(item.name)) {
        error = t("transactionForm.itemError.nameRequired");
      }

      if (item.unitPrice !== "" && !isValidNumber(item.unitPrice)) {
        error = t("transactionForm.itemError.validNumber");
      } else if (item.unitPrice !== "" && !isPositiveNumber(item.unitPrice)) {
        error = t("transactionForm.itemError.positive");
      }

      if (
        item.quantity !== undefined &&
        item.quantity !== "" &&
        !isValidNumber(item.quantity)
      ) {
        error = t("transactionForm.itemError.validNumber");
      } else if (
        item.quantity !== undefined &&
        item.quantity !== "" &&
        !isPositiveNumber(item.quantity)
      ) {
        error = t("transactionForm.itemError.positive");
      }

      itemErrors[index] = error;
      if (error) isValid = false;
    });

    setErrors((prev) => ({ ...prev, descriptionItems: itemErrors }));
    return isValid;
  };

  const validateForm = (): boolean => {
    const isDateValid = validateDate();
    const isCategoryValid = validateCategory();
    const isAmountValid = validateAmount();
    const isTitleValid = validateTitle();
    const isItemsValid = validateDescriptionItems();

    return (
      isDateValid &&
      isCategoryValid &&
      isAmountValid &&
      isTitleValid &&
      isItemsValid
    );
  };

  console.log(descriptionItems);

  const handleSubmit = () => {
    if (isSubmitting) return;
    if (!validateForm()) return;

    // Check if transaction would reduce balance to zero or negative
    const transactionAmount = parseFloat(amount);
    const currentBalance =  balance - expenses - savings + income|| 0;
    
  
    if (!isIncome && !isSavings && transactionAmount >= currentBalance) {
      Alert.alert(
        t("transactionForm.balanceError.title"),
        t("transactionForm.balanceError.message"),
        [{ text: t("common.ok") }]
      );
      return;
    }
    
  
    if (!isIncome && !isSavings) {
      const percentage = (transactionAmount / currentBalance) * 100;
      if (percentage > 50) {
        Alert.alert(
          t("transactionForm.budgetWarning.title"),
          t("transactionForm.budgetWarning.message", { percentage: percentage.toFixed(2) }),
          [
            { text: t("common.cancel"), style: "cancel" },
            { text: t("common.continue"), onPress: () => proceedWithSubmission() }
          ]
        );
        return;
      }
    }
    
    proceedWithSubmission();
  };
  
  const proceedWithSubmission = () => {
    setIsSubmitting(true);
    
    const filteredItems =
      isIncome || isSavings
        ? undefined
        : descriptionItems.filter(
            (item) => item.name.trim() !== "" && item.unitPrice.trim() !== ""
          );

    try {
      onSubmit({
        category: isIncome ? incomeCategory?.name || "income" : category,
        amount,
        title: titleValue,
        message,
        type: isSavings ? "savings" : isIncome ? "income" : "expense",
        created_at: date,
        descriptionItems: filteredItems,
        store: store || undefined,
      });

      if (resetAfterSubmit) {
        setDate(new Date());
        setCategory("");
        setAmount("");
        setTitleValue("");
        setMessage("");
        setStore("");
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
      console.log("Error submitting form:", error);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  // Calculate total from items
  useEffect(() => {
    if (isIncome || !descriptionItems.length) return;
    const calculatedAmount = descriptionItems.reduce((acc, item) => {
      return acc + (Number(item.quantity) || 1) * Number(item.unitPrice);
    }, 0);
  
    setAmount(calculatedAmount ? calculatedAmount.toFixed(2) : '');
  }, [descriptionItems]);

  // Description items functions
  const addDescriptionItem = () => {
    if (isIncome || isSavings) return;
    setDescriptionItems([...descriptionItems, { name: "", unitPrice: "" }]);
    setErrors((prev) => ({
      ...prev,
      descriptionItems: [...prev.descriptionItems, ""],
    }));
  };

  const removeDescriptionItem = (index: number) => {
    if (isIncome || isSavings) return;
    const newItems = [...descriptionItems];
    newItems.splice(index, 1);
    setDescriptionItems(newItems);

    const newErrors = [...errors.descriptionItems];
    newErrors.splice(index, 1);
    setErrors((prev) => ({ ...prev, descriptionItems: newErrors }));
  };

  const updateDescriptionItem = (
    index: number,
    field: keyof DescriptionItem,
    value: string
  ) => {
    if (isIncome || isSavings) return;

    const newItems = [...descriptionItems];

    if (field === "unitPrice" || field === "quantity") {
      if (
        value !== "" &&
        value !== "." &&
        !isValidNumber(value) &&
        !value.endsWith(".")
      ) {
        return;
      }
    }

    newItems[index] = { ...newItems[index], [field]: value };
    setDescriptionItems(newItems);
    validateDescriptionItems();
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
            { paddingBottom: keyboardHeight },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={true}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={() => {
              Keyboard.dismiss();
              setShowCategoryPicker(false);
              setShowStorePicker(false);
              setCurrentFocusedInput(null);
            }}
          >
            <View style={styles.formContainer}>
              {/* Date field */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}>
                  {t("transactionForm.date")}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.input,
                    {
                      flexDirection: isRTL ? "row-reverse" : "row",
                      justifyContent: "space-between",
                    },
                  ]}
                  onPress={showDatePickerModal}
                  ref={(ref) => (inputRefs.current["date"] = ref)}
                >
                  <Text style={{ color: Theme.colors.text }}>
                    {date.toLocaleDateString(i18n.language, {
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
                {errors.date ? (
                  <Text style={styles.errorText}>{errors.date}</Text>
                ) : null}
              </View>

              {/* Category field (hidden for income) */}
              {!isIncome && (
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}>
                    {isSavings
                      ? t("transactionForm.savingsGoal")
                      : t("transactionForm.category")}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.input,
                      {
                        flexDirection: isRTL ? "row-reverse" : "row",
                        justifyContent: "space-between",
                      },
                    ]}
                    onPress={() => {
                      Keyboard.dismiss();
                      setShowCategoryPicker(!showCategoryPicker);
                      setCurrentFocusedInput("category");
                    }}
                    ref={(ref) => (inputRefs.current["category"] = ref)}
                  >
                    <Text style={{ color: Theme.colors.text }}>
                      {category ||
                        t(
                          isSavings
                            ? "transactionForm.savingsGoalPlaceholder"
                            : "transactionForm.categoryPlaceholder"
                        )}
                    </Text>
                    <Ionicons
                      name="chevron-down"
                      size={20}
                      color={Theme.colors.textLight}
                    />
                  </TouchableOpacity>
                  {showCategoryPicker && (
                    <View
                      style={[
                        styles.categoryPicker,
                        styles.categoryPickerScroll,
                      ]}
                    >
                      <ScrollView
                        nestedScrollEnabled={true}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={true}
                      >
                        {displayCategories.map((cat) => (
                          <TouchableOpacity
                            key={cat.id}
                            style={[
                              styles.categoryOption,
                              {
                                flexDirection: isRTL ? "row-reverse" : "row",
                              },
                            ]}
                            onPress={() => {
                              setCategory(cat.name);
                              setShowCategoryPicker(false);
                              setErrors((prev) => ({ ...prev, category: "" }));
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
                            <Text
                              style={[
                                { color: Theme.colors.text },
                                isRTL ? { marginRight: 10 } : { marginLeft: 10 },
                              ]}
                            >
                              {cat.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                  {errors.category ? (
                    <Text style={styles.errorText}>{errors.category}</Text>
                  ) : null}
                </View>
              )}

              {/* Store field (hidden for income and savings) */}
              {!isIncome && !isSavings && (
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}>
                    {t("transactionForm.store")}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.input,
                      {
                        flexDirection: isRTL ? "row-reverse" : "row",
                        justifyContent: "space-between",
                      },
                    ]}
                    onPress={() => {
                      Keyboard.dismiss();
                      setShowStorePicker(!showStorePicker);
                      setCurrentFocusedInput("store");
                    }}
                    ref={(ref) => (inputRefs.current["store"] = ref)}
                  >
                    <Text style={{ color: Theme.colors.text }}>
                      {storeText || t("transactionForm.storePlaceholder")}
                    </Text>
                    <Ionicons
                      name="chevron-down"
                      size={20}
                      color={Theme.colors.textLight}
                    />
                  </TouchableOpacity>
                  {showStorePicker && (
                    <View
                      style={[
                        styles.categoryPicker,
                        styles.categoryPickerScroll,
                      ]}
                    >
                      <ScrollView
                        nestedScrollEnabled={true}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={true}
                      >
                        {/* Display all stores as options */}
                        {userStores.map((storeItem) => (
                          <TouchableOpacity
                            key={storeItem.id}
                            style={[
                              styles.categoryOption,
                              {
                                flexDirection: isRTL ? "row-reverse" : "row",
                              },
                            ]}
                            onPress={() => {
                              setStore(storeItem.id);
                              setStoreText(storeItem.name);
                              setShowStorePicker(false);
                            }}
                          >
                            <Ionicons
                              name="storefront-outline"
                              size={16}
                              color={Theme.colors.text}
                            />
                            <Text
                              style={[
                                { color: Theme.colors.text },
                                isRTL ? { marginRight: 10 } : { marginLeft: 10 },
                              ]}
                            >
                              {storeItem.name}
                            </Text>
                          </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                          style={[
                            styles.categoryOption,
                            {
                              borderTopWidth: 1,
                              borderTopColor: Theme.colors.background,
                              flexDirection: isRTL ? "row-reverse" : "row",
                            },
                          ]}
                          onPress={() => {
                            navigation.navigate("AddStore");
                            setShowStorePicker(false);
                          }}
                        >
                          <Ionicons
                            name="add-circle-outline"
                            size={16}
                            color={Theme.colors.primary}
                          />
                          <Text
                            style={[
                              { color: Theme.colors.primary },
                              isRTL ? { marginRight: 10 } : { marginLeft: 10 },
                            ]}
                          >
                            {t("transactionForm.addStore")}
                          </Text>
                        </TouchableOpacity>
                      </ScrollView>
                    </View>
                  )}
                </View>
              )}
              {/* Amount field */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}>
                  {t("transactionForm.amount")}
                </Text>
                <TextInput
                  ref={(ref) => (inputRefs.current["amount"] = ref)}
                  style={[
                    styles.input,
                    { color: Theme.colors.text, textAlign: isRTL ? "right" : "left" },
                  ]}
                  value={amount}
                  onChangeText={(text) => {
                    if (
                      text === "" ||
                      text === "." ||
                      (isValidNumber(text) && !text.startsWith("-")) ||
                      text.endsWith(".")
                    ) {
                      setAmount(text);
                    }
                  }}
                  onFocus={() => setCurrentFocusedInput("amount")}
                  onBlur={validateAmount}
                  placeholder={t("transactionForm.amountPlaceholder")}
                  placeholderTextColor={Theme.colors.textLight}
                  keyboardType="numeric"
                />
                {errors.amount ? (
                  <Text style={styles.errorText}>{errors.amount}</Text>
                ) : null}
              </View>

              {/* Title field */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}>
                  {isIncome
                    ? t("transactionForm.title.income")
                    : isSavings
                    ? t("transactionForm.title.savings")
                    : t("transactionForm.title.expense")}
                </Text>
                <TextInput
                  ref={(ref) => (inputRefs.current["title"] = ref)}
                  style={[
                    styles.input,
                    { color: Theme.colors.text, textAlign: isRTL ? "right" : "left" },
                  ]}
                  value={titleValue}
                  onChangeText={setTitleValue}
                  onFocus={() => setCurrentFocusedInput("title")}
                  onBlur={validateTitle}
                  placeholder={
                    isIncome
                      ? t("transactionForm.titlePlaceholder.income")
                      : isSavings
                      ? t("transactionForm.titlePlaceholder.savings")
                      : t("transactionForm.titlePlaceholder.expense")
                  }
                  placeholderTextColor={Theme.colors.textLight}
                />
                {errors.title ? (
                  <Text style={styles.errorText}>{errors.title}</Text>
                ) : null}
              </View>

              {/* Description Items (hidden for income and savings) */}
              {!isIncome && !isSavings && (
                <View style={styles.inputGroup}>
                  <Text style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}>
                    {t("transactionForm.items")}
                  </Text>
                  {descriptionItems.map((item, index) => (
                    <View
                      key={index}
                      style={styles.descriptionItemContainer}
                      ref={(ref) => (inputRefs.current[`item-${index}`] = ref)}
                    >
                      <View
                        style={[
                          styles.descriptionItemRow,
                          { flexDirection: isRTL ? "row-reverse" : "row" },
                        ]}
                      >
                        <TextInput
                          style={[
                            styles.descriptionInput,
                            {
                              flex: 2,
                              color: Theme.colors.text,
                              textAlign: isRTL ? "right" : "left",
                            },
                          ]}
                          value={item.name}
                          onChangeText={(text) =>
                            updateDescriptionItem(index, "name", text)
                          }
                          onFocus={() =>
                            setCurrentFocusedInput(`item-${index}`)
                          }
                          onBlur={validateDescriptionItems}
                          placeholder={t("transactionForm.itemNamePlaceholder")}
                          placeholderTextColor={Theme.colors.textLight}
                        />
                        <TextInput
                          style={[
                            styles.descriptionInput,
                            {
                              flex: 1,
                              color: Theme.colors.text,
                              textAlign: isRTL ? "right" : "left",
                            },
                          ]}
                          value={item.unitPrice}
                          onChangeText={(text) => {
                            if (
                              text === "" ||
                              text === "." ||
                              (isValidNumber(text) && !text.startsWith("-")) ||
                              text.endsWith(".")
                            ) {
                              updateDescriptionItem(index, "unitPrice", text);
                            }
                          }}
                          onFocus={() =>
                            setCurrentFocusedInput(`item-${index}`)
                          }
                          onBlur={validateDescriptionItems}
                          placeholder={t("transactionForm.itemPricePlaceholder")}
                          placeholderTextColor={Theme.colors.textLight}
                          keyboardType="numeric"
                        />
                        <TextInput
                          style={[
                            styles.descriptionInput,
                            {
                              flex: 1,
                              color: Theme.colors.text,
                              textAlign: isRTL ? "right" : "left",
                            },
                          ]}
                          value={item.quantity || ""}
                          onChangeText={(text) => {
                            if (
                              text === "" ||
                              text === "." ||
                              (isValidNumber(text) && !text.startsWith("-")) ||
                              text.endsWith(".")
                            ) {
                              updateDescriptionItem(index, "quantity", text);
                            }
                          }}
                          onFocus={() =>
                            setCurrentFocusedInput(`item-${index}`)
                          }
                          onBlur={validateDescriptionItems}
                          placeholder={t("transactionForm.itemQuantityPlaceholder")}
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
                    style={[
                      styles.addItemButton,
                      { flexDirection: isRTL ? "row-reverse" : "row" },
                    ]}
                    onPress={addDescriptionItem}
                  >
                    <Ionicons
                      name="add-circle-outline"
                      size={20}
                      color={Theme.colors.primary}
                    />
                    <Text
                      style={[
                        { color: Theme.colors.primary },
                        isRTL ? { marginRight: 5 } : { marginLeft: 5 },
                      ]}
                    >
                      {t("transactionForm.addItem")}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Note field */}
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { textAlign: isRTL ? "right" : "left" }]}>
                  {t("transactionForm.note")}
                </Text>
                <TextInput
                  ref={(ref) => (inputRefs.current["message"] = ref)}
                  style={[
                    styles.messageInput,
                    {
                      color: Theme.colors.text,
                      textAlign: isRTL ? "right" : "left",
                      writingDirection: isRTL ? "rtl" : "ltr",
                    },
                  ]}
                  value={message}
                  onChangeText={setMessage}
                  onFocus={() => setCurrentFocusedInput("message")}
                  placeholder={t("transactionForm.notePlaceholder")}
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
                  {isSubmitting
                    ? t("transactionForm.saveButton.processing")
                    : t("transactionForm.saveButton.default")}
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