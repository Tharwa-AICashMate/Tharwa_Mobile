

import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import Theme from '@/theme';
import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [reportType, setReportType] = useState<'Income' | 'Expense'>('Income');

    const categories = ['Food', 'Transport', 'Medicine', 'Groceries', 'Rent', 'Gift', 'Saving', 'Entertainment']; // تقدر تخصصها حسب الداتا بتاعتك

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const formatDate = (date: Date) => {
        return `${date.getDate()} / ${date.toLocaleString('default', { month: 'short' }).toUpperCase()}/${date.getFullYear()}`;
    };

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
                {/* Categories Dropdown */}

                <Text style={styles.label}>Categories</Text>
                <View style={styles.dropdown}>
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                        style={{ height: 50 }}
                        dropdownIconColor="#000"
                    >
                        <Picker.Item label="Select the category" value="" />
                        {categories.map((category) => (
                            <Picker.Item key={category} label={category} value={category} />
                        ))}
                    </Picker>
                </View>

                {/* Date Picker */}
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

                {/* Report Type */}
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

                {/* Search Button */}
                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.highlight,

    },
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
        margin:"auto",
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
    radioSelected: {
        borderColor: Theme.colors.primary,
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Theme.colors.primary,
    },
    radioLabel: {
        fontSize: 16,
        color: Theme.colors.text,
    },
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
});

export default SearchScreen;
