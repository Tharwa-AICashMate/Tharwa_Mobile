import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { PieChart } from 'react-native-chart-kit';

import Header from "@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle";
import Theme from "@/theme";
import { getCurrentUserId } from "@/utils/auth";
import { fetchUserCategories } from "@/redux/slices/categoriesSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { apiBase } from "@/utils/axiosInstance";
import { useTranslation } from "react-i18next";
import { I18nManager } from "react-native";
import i18next from "i18next";

const SearchScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [reportType, setReportType] = useState<"Income" | "Expense">("Income");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const { items: categories, loading } = useSelector(
    (state: RootState) => state.categories
  );
  const isRTL = i18next.language === "ar" || I18nManager.isRTL;

  // Calculate category percentages for pie chart based on filtered transactions
  const categoryTotals = categoryData.reduce((acc, item) => {
    const category = item.category_name;
    const amount = parseFloat(item.amount);
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {} as { [key: string]: number });

  const totalAmount = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

  const chartData = Object.keys(categoryTotals).map((category, index) => {
    const percentage = totalAmount > 0 ? (categoryTotals[category] / totalAmount) * 100 : 0;
    const colors = ['#1E2761', '#4D77FF', '#96BAFF', '#78D6C6', '#FF9843', '#FF7070', '#A9D38E', '#B5A9D3', '#FFB6C1', '#87CEEB', '#FFDB58'];
    return {
      name: category,
      population: percentage,
      color: colors[index % colors.length],
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    };
  });

  const styles = StyleSheet.create({
    baseContainer: {
      flex: 1,
    },
    container: { flex: 1, backgroundColor: Theme.colors.highlight },
    contentBox: {
      flex: 1,
      direction: isRTL ? "rtl" : "ltr",
      backgroundColor: Theme.colors.background,
      borderTopLeftRadius: 60,
      borderTopRightRadius: 60,
      alignItems: "center",
      paddingVertical: 20,
      paddingHorizontal: 20,
    },
    searchInput: {
      width: "85%",
      backgroundColor: Theme.colors.background,
      borderRadius: 30,
      paddingHorizontal: 20,
      height: 40,
      marginBottom: 20,
      marginTop: 1,
      marginLeft: "auto",
      marginRight: "auto",
      fontSize: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    label: {
      alignSelf: "flex-start",
      marginBottom: 15,
      marginTop: 20,
      marginLeft: isRTL ? 0 : 12,
      marginRight: isRTL ? 12 : 0,
      fontSize: 16,
      fontWeight: "500",
      color: Theme.colors.text,
    },
    dropdown: {
      width: "95%",
      backgroundColor: "#ECECEC",
      borderRadius: 20,
      paddingHorizontal: 10,
      marginBottom: 25,
    },
    dateInput: {
      width: "95%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#ECECEC",
      borderRadius: 20,
      paddingHorizontal: 15,
      height: 50,
      marginBottom: 10,
    },
    radioGroup: {
      flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      alignSelf: "flex-start",
      marginBottom: 25,
      marginTop: 8,
    },
    radioButton: {
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 10,
    },
    radioOuter: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: Theme.colors.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    radioSelected: { borderColor: Theme.colors.primary },
    radioInner: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: Theme.colors.primary,
    },
    radioLabel: {
      fontSize: 14,
      color: Theme.colors.text,
      marginLeft: isRTL ? 0 : 10,
      marginRight: isRTL ? 10 : 0,
    },
    searchButton: {
      width: "90%",
      height: 45,
      borderRadius: 30,
      backgroundColor: Theme.colors.primary,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
      marginBottom: 8,
    },
    searchButtonText: {
      fontSize: 18,
      fontWeight: "500",
      color: Theme.colors.textLight,
    },
    errorMessage: {
      color: "red",
      fontSize: 16,
      marginTop: 20,
    },
    resultsContainer: { marginTop: 10, flex: 1, width: "100%" },
    resultsContentContainer: { paddingBottom: 10 },
    resultItem: {
      backgroundColor: Theme.colors.secondery,
      borderRadius: 20,
      marginVertical: 10,
      padding: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
    },
    resultContent: { flexDirection: "row", alignItems: "center", width: "80%" },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      marginRight: isRTL ? 0 : 10,
      marginLeft: isRTL ? 10 : 0,
    },
    resultTextContainer: { width: "80%" },
    resultTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: Theme.colors.text,
    },
    resultDate: {
      fontSize: 12,
      fontWeight: "400",
      color: Theme.colors.text,
    },
    resultAmount: {
      fontSize: 16,
      fontWeight: "600",
    },
    incomeAmount: { color: Theme.colors.accentDark },
    expenseAmount: { color: Theme.colors.accentDark },
    categoriesContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      width: '100%',
    },
    chartContainer: {
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'center', 
    },
    legendContainer: {
      marginLeft: 1, 
      flex: 1, 
      paddingHorizontal: 0, 
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8, 
    },
    legendColor: {
      width: 15,
      height: 15,
      borderRadius: 7.5,
      marginRight: isRTL ? 0 : 5,
      marginLeft: isRTL ? 5 : 0,
    },
    legendText: {
      fontSize: 12, 
      color: Theme.colors.text,
    },
  });

  const categoryIcons: { [key: string]: string } = {
    Food: "restaurant",
    Transport: "car",
    Medicine: "medkit",
    Groceries: "cart",
    Rent: "home",
    Gift: "gift",
    Saving: "wallet",
    Entertainment: "film",
  };

  const getCategoryColor = (category: string): string => {
    const colorMap: { [key: string]: string } = {
      Food: "#78D6C6",
      Transport: "#FF9843",
      Medicine: "#FF7070",
      Groceries: "#A9D38E",
      Rent: "#B5A9D3",
      Gift: "#FFB6C1",
      Saving: "#87CEEB",
      Entertainment: "#FFDB58",
    };
    return colorMap[category] || Theme.colors.primary;
  };

  const handleDateChange = (
    event: any,
    selectedDate?: Date,
    type: "start" | "end"
  ) => {
    if (selectedDate) {
      if (type === "start") {
        setStartDate(selectedDate);
        if (Platform.OS === "ios") {
          setShowStartDatePicker(false);
        }
        if (Platform.OS === "android") {
          setShowStartDatePicker(false);
        }
      } else {
        setEndDate(selectedDate);
        if (Platform.OS === "ios") {
          setShowEndDatePicker(false);
        }
        if (Platform.OS === "android") {
          setShowEndDatePicker(false);
        }
      }
    }
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day} / ${month} / ${year}`;
  };

  const fetchData = async () => {
    try {
      const user_id = await getCurrentUserId();

      const params = new URLSearchParams();
      params.append("start_date", startDate.toISOString().split("T")[0]);
      params.append("end_date", endDate.toISOString().split("T")[0]);
      params.append("type", reportType.toLowerCase());
      params.append("title", searchText.toLowerCase());

      if (selectedCategory === "All") {
        params.delete("category_name");
      } else {
        params.append("category_name", selectedCategory);
      }

      const searchUrl = `${apiBase}/search/${user_id}?${params.toString()}`;

      const response = await fetch(searchUrl);
      const data = await response.json();

      if (data.length === 0) {
        setErrorMessage(t("searchScreen.noData"));
        setSearchResults([]);
      } else {
        setErrorMessage("");
        setSearchResults(data);
      }

      // Fetch all categories data for pie chart
      await fetchAllCategoriesData();
    } catch (error) {
      console.log("Error fetching data:", error);
      setErrorMessage(t("searchScreen.error"));
      setSearchResults([]);
      setCategoryData([]);
    }
  };

  const fetchAllCategoriesData = async () => {
    try {
      const user_id = await getCurrentUserId();

      const params = new URLSearchParams();
      params.append("start_date", startDate.toISOString().split("T")[0]);
      params.append("end_date", endDate.toISOString().split("T")[0]);
      params.append("type", reportType.toLowerCase());

      const searchUrl = `${apiBase}/search/${user_id}?${params.toString()}`;

      const response = await fetch(searchUrl);
      const data = await response.json();

      setCategoryData(data);
    } catch (error) {
      console.log("Error fetching all categories data:", error);
      setCategoryData([]);
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      const userId = await getCurrentUserId();
      dispatch(fetchUserCategories(userId));
    };
    loadCategories();
  }, []);

  // Toggle the date picker visibility and close the other one
  const handleShowStartDatePicker = () => {
    if (showEndDatePicker) setShowEndDatePicker(false);
    setShowStartDatePicker(true);
  };

  const handleShowEndDatePicker = () => {
    if (showStartDatePicker) setShowStartDatePicker(false);
    setShowEndDatePicker(true);
  };

  return (
    <View style={styles.baseContainer}>
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Theme.colors.highlight}
        />
        <Header title={t("searchScreen.searchTitle")} />
        <TextInput
          style={styles.searchInput}
          placeholder={t("searchScreen.searchPlaceholder")}
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={(e) => setSearchText(e)}
        />
        <ScrollView>
          <View style={styles.contentBox}>
            <Text style={styles.label}>{t("searchScreen.categories")}</Text>
            <View style={styles.dropdown}>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                style={{ height: 50 }}
                dropdownIconColor="#000"
              >
                <Picker.Item label={t("searchScreen.all")} value="All" />
                {categories.map((cat) => (
                  <Picker.Item key={cat.id} label={cat.name} value={cat.name} />
                ))}
              </Picker>
            </View>

            <Text style={styles.label}>{t("searchScreen.startDate")}</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={handleShowStartDatePicker}
            >
              <Text>{formatDate(startDate)}</Text>
              <Ionicons
                name="calendar-outline"
                size={24}
                color={Theme.colors.primary}
              />
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={(event, date) =>
                  handleDateChange(event, date, "start")
                }
              />
            )}

            <Text style={styles.label}>{t("searchScreen.endDate")}</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={handleShowEndDatePicker}
            >
              <Text>{formatDate(endDate)}</Text>
              <Ionicons
                name="calendar-outline"
                size={24}
                color={Theme.colors.primary}
              />
            </TouchableOpacity>
            {showEndDatePicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={(event, date) => handleDateChange(event, date, "end")}
              />
            )}

            <Text style={styles.label}>{t("searchScreen.report")}</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setReportType("Income")}
              >
                <View
                  style={[
                    styles.radioOuter,
                    reportType === "Income" && styles.radioSelected,
                  ]}
                >
                  {reportType === "Income" && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioLabel}>
                  {t("searchScreen.income")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setReportType("Expense")}
              >
                <View
                  style={[
                    styles.radioOuter,
                    reportType === "Expense" && styles.radioSelected,
                  ]}
                >
                  {reportType === "Expense" && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioLabel}>
                  {t("searchScreen.expense")}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.searchButton} onPress={fetchData}>
              <Text style={styles.searchButtonText}>
                {t("searchScreen.searchButton")}
              </Text>
            </TouchableOpacity>

            {errorMessage ? (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            ) : (
              <ScrollView
                style={styles.resultsContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.resultsContentContainer}
              >
                {searchResults?.map((item, index) => (
                  <View key={index} style={styles.resultItem}>
                    <View style={styles.resultContent}>
                      <View
                        style={[
                          styles.iconContainer,
                          {
                            backgroundColor: getCategoryColor(item.category_name),
                          },
                        ]}
                      >
                        <Ionicons
                          name={categoryIcons[item.category_name] || "apps"}
                          size={24}
                          color="#fff"
                        />
                      </View>
                      <View style={styles.resultTextContainer}>
                        <Text style={styles.resultTitle}>{item.title}</Text>
                        <Text style={styles.resultDate}>
                          {new Date(item.created_at).toLocaleString("en", {
                            day: "numeric",
                            month: "long",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.resultAmount,
                          item.type === "income"
                            ? styles.incomeAmount
                            : styles.expenseAmount,
                        ]}
                      >
                        {item.type === "income" ? "+" : "-"}
                        {parseFloat(item.amount).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                ))}
                {searchResults.length > 0 && (
                  <View style={styles.categoriesContainer}>
                    <View style={[styles.chartContainer, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                      <PieChart
                        data={chartData}
                        width={180}
                        height={180}
                        chartConfig={{
                          backgroundColor: '#ffffff',
                          backgroundGradientFrom: '#ffffff',
                          backgroundGradientTo: '#ffffff',
                          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="40"
                        hasLegend={false}
                      />
                      <View style={[styles.legendContainer, { marginLeft: 10, flex: 1 }]}>
                        {chartData.map((category, index) => (
                          <View key={index} style={styles.legendItem}>
                            <View style={[styles.legendColor, { backgroundColor: category.color }]} />
                            <Text style={styles.legendText} numberOfLines={1} ellipsizeMode="tail">
                              {category.name}: {category.population.toFixed(2)}%
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>
                )}
              </ScrollView>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SearchScreen;
