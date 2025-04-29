
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import Theme from '@/theme';
import { getCurrentUserId } from '@/utils/auth';
import { fetchUserCategories } from '@/redux/slices/categoriesSlice'; // Update path if needed
import { RootState } from '@/redux/store';

const SearchScreen: React.FC = () => {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [reportType, setReportType] = useState<'Income' | 'Expense'>('Income');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const { items: categories, loading } = useSelector((state: RootState) => state.categories);

    const categoryIcons: { [key: string]: string } = {
        'Food': 'restaurant',
        'Transport': 'car',
        'Medicine': 'medkit',
        'Groceries': 'cart',
        'Rent': 'home',
        'Gift': 'gift',
        'Saving': 'wallet',
        'Entertainment': 'film'
    };

    const getCategoryColor = (category: string): string => {
        const colorMap: { [key: string]: string } = {
            'Food': '#78D6C6',
            'Transport': '#FF9843',
            'Medicine': '#FF7070',
            'Groceries': '#A9D38E',
            'Rent': '#B5A9D3',
            'Gift': '#FFB6C1',
            'Saving': '#87CEEB',
            'Entertainment': '#FFDB58'
        };
        return colorMap[category] || Theme.colors.primary;
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const formatDate = (date: Date) => {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day} / ${month} / ${year}`;
    };

    const formatResultDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' }).toUpperCase().substring(0, 3);
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes} - ${day}${month} ${year}`;
    };

    const fetchData = async () => {
        try {
            const user_id = await getCurrentUserId();
            const apiBase = "http://192.168.1.3:3000";
            const searchUrl = `${apiBase}/search/${user_id}?category_name=${encodeURIComponent(selectedCategory)}&created_at=${date.toISOString().split('T')[0]}&type=${reportType.toLowerCase()}`;
            const response = await fetch(searchUrl);
            const data = await response.json();

            if (data.length === 0) {
                setErrorMessage('No data found.');
                setSearchResults([]);
            } else {
                setErrorMessage('');
                setSearchResults(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setErrorMessage('An error occurred while fetching data.');
            setSearchResults([]);
        }
    };

    useEffect(() => {
        const loadCategories = async () => {
            const userId = await getCurrentUserId();
            dispatch(fetchUserCategories(userId));
        };
        loadCategories();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Theme.colors.highlight} />
            <Header title="Search" />
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="#999"
            />
            <View style={styles.contentBox}>
                <Text style={styles.label}>Categories</Text>
                <View style={styles.dropdown}>
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                        style={{ height: 50 }}
                        dropdownIconColor="#000"
                    >
                        <Picker.Item label="Select the category" value="" />
                        {categories.map((cat) => (
                            <Picker.Item key={cat.id} label={cat.name} value={cat.name} />
                        ))}
                    </Picker>
                </View>

                <Text style={styles.label}>Date</Text>
                <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
                    <Text>{formatDate(date)}</Text>
                    <Ionicons name="calendar-outline" size={24} color={Theme.colors.primary} />
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}

                <Text style={styles.label}>Report</Text>
                <View style={styles.radioGroup}>
                    <TouchableOpacity style={styles.radioButton} onPress={() => setReportType('Income')}>
                        <View style={[styles.radioOuter, reportType === 'Income' && styles.radioSelected]}>
                            {reportType === 'Income' && <View style={styles.radioInner} />}
                        </View>
                        <Text style={styles.radioLabel}>Income</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.radioButton} onPress={() => setReportType('Expense')}>
                        <View style={[styles.radioOuter, reportType === 'Expense' && styles.radioSelected]}>
                            {reportType === 'Expense' && <View style={styles.radioInner} />}
                        </View>
                        <Text style={styles.radioLabel}>Expense</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.searchButton} onPress={fetchData}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>

                {errorMessage ? (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                ) : (
                    <ScrollView
                        style={styles.resultsContainer}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.resultsContentContainer}
                    >
                        {searchResults.map((item, index) => (
                            <View key={index} style={styles.resultItem}>
                                <View style={styles.resultContent}>
                                    <View style={[styles.iconContainer, { backgroundColor: getCategoryColor(item.category_name) }]}>
                                        <Ionicons
                                            name={categoryIcons[item.category_name] || 'apps'}
                                            size={24}
                                            color="#fff"
                                        />
                                    </View>
                                    <View style={styles.resultTextContainer}>
                                        <Text style={styles.resultTitle}>{item.title}</Text>
                                        <Text style={styles.resultDate}>
                                            {formatResultDate(item.created_at)}
                                        </Text>
                                    </View>
                                    <Text style={[
                                        styles.resultAmount,
                                        reportType === 'Income' ? styles.incomeAmount : styles.expenseAmount
                                    ]}>
                                        {reportType === 'Income' ? '+' : '-'}${parseFloat(item.amount).toFixed(2)}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Theme.colors.highlight },
    contentBox: {
        flex: 1,
        backgroundColor: Theme.colors.background,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    searchInput: {
        width: '85%',
        backgroundColor: Theme.colors.background,
        borderRadius: 30,
        paddingHorizontal: 20,
        height: 40,
        marginBottom: 20,
        marginTop: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    label: {
        alignSelf: 'flex-start',
        marginBottom: 15,
        marginTop: 20,
        marginLeft: 12,
        fontSize: 16,
        fontWeight: '500',
        color: Theme.colors.text,
    },
    dropdown: {
        width: '95%',
        backgroundColor: '#ECECEC',
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 25,
    },
    dateInput: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ECECEC',
        borderRadius: 20,
        paddingHorizontal: 15,
        height: 50,
        marginBottom: 10,
    },
    radioGroup: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginBottom: 25,
        marginTop: 8,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    radioOuter: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
    },
    radioSelected: { borderColor: Theme.colors.primary },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Theme.colors.primary,
    },
    radioLabel: { fontSize: 16, color: Theme.colors.text },
    searchButton: {
        backgroundColor: Theme.colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 30,
        marginTop: 20,
    },
    searchButtonText: {
        color: Theme.colors.textLight,
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorMessage: { color: 'red', marginTop: 20, fontSize: 16 },
    resultsContainer: {
        marginTop: 20,
        width: '100%',
        maxHeight: '50%',
    },
    resultsContentContainer: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    resultItem: {
        marginBottom: 12,
        padding: 15,
        backgroundColor: '#F5F5F5',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    resultContent: { flexDirection: 'row', alignItems: 'center' },
    iconContainer: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    resultTextContainer: { flex: 1 },
    resultTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    resultDate: { fontSize: 12, color: '#666' },
    resultAmount: { fontSize: 16, fontWeight: 'bold' },
    incomeAmount: { color: '#27AE60' },
    expenseAmount: { color: '#E74C3C' },
});

export default SearchScreen;
