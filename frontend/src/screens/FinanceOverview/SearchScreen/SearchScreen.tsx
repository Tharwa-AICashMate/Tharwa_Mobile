import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import Theme from '@/theme';
import { getCurrentUserId } from '@/utils/auth';
import { fetchUserCategories } from '@/redux/slices/categoriesSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { apiBase } from '@/utils/axiosInstance';

const SearchScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [reportType, setReportType] = useState<'Income' | 'Expense'>('Income');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [searchText, setSearchText] = useState<string>('');
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

    const handleDateChange = (event: any, selectedDate?: Date, type: 'start' | 'end') => {
        if (selectedDate) {
            if (type === 'start') {
                setStartDate(selectedDate);
                if (Platform.OS === 'ios') {
                    setShowStartDatePicker(false); 
                }
                if (Platform.OS === 'android') {
                    setShowStartDatePicker(false); 
                }
            } else {
                setEndDate(selectedDate);
                if (Platform.OS === 'ios') {
                    setShowEndDatePicker(false); 
                }
                if (Platform.OS === 'android') {
                    setShowEndDatePicker(false); 
                }
            }
        }
    };
    
    const formatDate = (date: Date) => {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
        const year = date.getFullYear();
        return `${day < 10 ? '0' + day : day} / ${month} / ${year}`;
    };
    const fetchData = async () => {
        try {
            const user_id = await getCurrentUserId();
    
            const params = new URLSearchParams();
            params.append('start_date', startDate.toISOString().split('T')[0]);
            params.append('end_date', endDate.toISOString().split('T')[0]);
            params.append('type', reportType.toLowerCase());
            params.append('title', searchText.toLowerCase());
    
            if ( selectedCategory === "All") {
                params.delete('category_name'); 
            } else {
                params.append('category_name', selectedCategory);
            }
    
            const searchUrl = `${apiBase}/search/${user_id}?${params.toString()}`;
    
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
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Theme.colors.highlight} />
            <Header title="Search" />
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="#999"
                value={searchText}
                onChangeText={(e) => setSearchText(e)}
            />
            <ScrollView>
            <View style={styles.contentBox}>
                <Text style={styles.label}>Categories</Text>
                <View style={styles.dropdown}>
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                        style={{ height: 50 }}
                        dropdownIconColor="#000"
                    >
                       
                        <Picker.Item label="All" value="All" /> 
                        {categories.map((cat) => (
                            <Picker.Item key={cat.id} label={cat.name} value={cat.name} />
                        ))}
                    </Picker>
                </View>

                <Text style={styles.label}>Start Date</Text>
                <TouchableOpacity style={styles.dateInput} onPress={handleShowStartDatePicker}>
                    <Text>{formatDate(startDate)}</Text>
                    <Ionicons name="calendar-outline" size={24} color={Theme.colors.primary} />
                </TouchableOpacity>
                {showStartDatePicker && (
                    <DateTimePicker
                        value={startDate}
                        mode="date"
                        display="default"
                        onChange={(event, date) => handleDateChange(event, date, 'start')}
                    />
                )}

                <Text style={styles.label}>End Date</Text>
                <TouchableOpacity style={styles.dateInput} onPress={handleShowEndDatePicker}>
                    <Text>{formatDate(endDate)}</Text>
                    <Ionicons name="calendar-outline" size={24} color={Theme.colors.primary} />
                </TouchableOpacity>
                {showEndDatePicker && (
                    <DateTimePicker
                        value={endDate}
                        mode="date"
                        display="default"
                        onChange={(event, date) => handleDateChange(event, date, 'end')}
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
                        {searchResults?.map((item, index) => (
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
                                        <Text style={styles.resultDate}>{item.created_at}</Text>
                                    </View>
                                    <Text style={[styles.resultAmount, reportType === 'Income' ? styles.incomeAmount : styles.expenseAmount]}>
                                        {reportType === 'Income' ? '+' : '-'}${parseFloat(item.amount).toFixed(2)}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                )}
            </View>

            </ScrollView>

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
        justifyContent: 'center',
        alignItems: 'center',
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
        marginLeft: 10,
    },
    searchButton: {
        width: '90%',
        height: 45,
        borderRadius: 30,
        backgroundColor: Theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom:8
    },
    searchButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: Theme.colors.textLight,
    },
    errorMessage: {
        color: 'red',
        fontSize: 16,
        marginTop: 20,
    },
    resultsContainer: { marginTop: 10, flex: 1, width: '100%' },
    resultsContentContainer: { paddingBottom: 10 },
    resultItem: {
        backgroundColor: Theme.colors.secondery,
        borderRadius: 20,
        marginVertical: 10,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    resultContent: { flexDirection: 'row', alignItems: 'center', width: '80%' },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    resultTextContainer: { width: '80%' },
    resultTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: Theme.colors.text,
    },
    resultDate: {
        fontSize: 12,
        fontWeight: '400',
        color: Theme.colors.text,
    },
    resultAmount: {
        fontSize: 16,
        fontWeight: '600',
    },
    incomeAmount: { color: Theme.colors.accentLight },
    expenseAmount: { color: Theme.colors.accentDark},
});

export default SearchScreen;

