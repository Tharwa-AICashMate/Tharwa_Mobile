

import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { ShoppingBag, CreditCard } from 'lucide-react-native';
import Header from '@/componenets/HeaderIconsWithTitle/HeadericonsWithTitle';
import Theme from '@/theme';

type Transaction = {
  id: string;
  category: string;
  icon: React.ReactNode;
  date: string;
  title: string;
  subCategory?: string;
  amount: string;
  type: 'expense' | 'income';
};

type Category = {
  name: string;
  color: string;
  percentage: number;
};

const CalendarScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'spends' | 'categories'>('spends');
  const [selectedMonth, setSelectedMonth] = useState('April');
  const [selectedYear, setSelectedYear] = useState('2023');
  
  // Sample transactions data
  const transactions: Transaction[] = [
    {
      id: '1',
      category: 'Groceries',
      icon: <ShoppingBag size={24} color={Theme.colors.textLight} />,
      date: 'April 24',
      title: 'Groceries',
      subCategory: 'Pantry',
      amount: '$100.00',
      type: 'income',
    },
    {
      id: '2',
      category: 'Others',
      icon: <CreditCard size={24} color={Theme.colors.textLight} />,
      date: 'April 24',
      title: 'Others',
      subCategory: 'Payments',
      amount: '$120.00',
      type: 'income',
    },
  ];

  // Sample categories data
  const categories: Category[] = [
    { name: 'Groceries', color: '#1E2761', percentage: 10 },
    { name: 'Others', color: '#4D77FF', percentage: 79 },
    { name: 'Miscellaneous', color: '#96BAFF', percentage: 11 },
  ];

  // Format data for pie chart
  const chartData = categories.map((category) => ({
    name: category.name,
    population: category.percentage,
    color: category.color,
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  const renderTransactionItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={[styles.iconContainer, { backgroundColor: item.category === 'Groceries' ? '#4D77FF' : '#96BAFF' }]}>
        {item.icon}
      </View>
      <View style={styles.transactionDetails}>
        <View style={styles.transactionHeader}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={[
            styles.transactionAmount,
            { color: item.type === 'expense' ? Theme.colors.background : Theme.colors.primary }
          ]}>
            {item.amount}
          </Text>
        </View>
        <View style={styles.transactionSubDetails}>
          <Text style={styles.transactionDate}>17:00 - {item.date}</Text>
          <Text style={styles.transactionSubCategory}>{item.subCategory}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView>
    <View style={styles.container}>
      <StatusBar backgroundColor={Theme.colors.highlight} barStyle="light-content" />
      <Header title="Calendar" />
      
      <View style={styles.contentBox}>
        <View style={styles.calendarContainer}>
          <View style={styles.monthSelector}>
            <TouchableOpacity style={styles.monthButton}>
              <Text style={styles.monthText}>{selectedMonth}</Text>
              <Text style={styles.arrowDown}>▼</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.yearButton}>
              <Text style={styles.yearText}>{selectedYear}</Text>
              <Text style={styles.arrowDown}>▼</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.daysHeader}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <Text key={day} style={styles.dayText}>{day}</Text>
            ))}
          </View>
          
          <ScrollView style={styles.calendarGrid}>
            <View style={styles.daysGrid}>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <TouchableOpacity key={day} style={styles.dayCell}>
                  <Text style={styles.dayCellText}>{day}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[
              styles.tabButton,
              activeTab === 'spends' ? styles.activeTabButton : styles.inactiveTabButton
            ]}
            onPress={() => setActiveTab('spends')}
          >
            <Text style={activeTab === 'spends' ? styles.activeTabText : styles.inactiveTabText}>
              Spends
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tabButton,
              activeTab === 'categories' ? styles.activeTabButton : styles.inactiveTabButton
            ]}
            onPress={() => setActiveTab('categories')}
          >
            <Text style={activeTab === 'categories' ? styles.activeTabText : styles.inactiveTabText}>
              Categories
            </Text>
          </TouchableOpacity>
        </View>
        
        {activeTab === 'spends' ? (
          <FlatList
            data={transactions}
            renderItem={renderTransactionItem}
            keyExtractor={(item) => item.id}
            style={styles.transactionsList}
            contentContainerStyle={styles.transactionsContent}
          />
        ) : (
          <View style={styles.categoriesContainer}>
            <View style={styles.chartContainer}>
              <PieChart
                data={chartData}
                width={300}
                height={180}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="0"
                absolute
              />
            </View>
            <View style={styles.legendContainer}>
              {categories.map((category, index) => (
                <View key={index} style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: category.color }]} />
                  <Text style={styles.legendText}>{category.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
    </ScrollView>
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
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  calendarContainer: {
    marginBottom: 20,
    marginTop:10,
    paddingHorizontal: 10,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  monthButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.primary,
    marginRight: 5,
  },
  yearButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yearText: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.primary,
    marginRight: 5,
  },
  arrowDown: {
    fontSize: 10,
    color: Theme.colors.primary,
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  dayText: {
    flex: 1,
    textAlign: 'center',
    color: Theme.colors.text,
    fontSize: 12,
  },
  calendarGrid: {
    height: 250,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayCell: {
    width: '14%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  dayCellText: {
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeTabButton: {
    backgroundColor: Theme.colors.highlight,
  },
  inactiveTabButton: {
    backgroundColor: '#E8E8E8',
  },
  activeTabText: {
    color: Theme.colors.text,
    fontWeight: '600',
  },
  inactiveTabText: {
    color: Theme.colors.text,
  },
  transactionsList: {
    flex: 1,
    height:220,
  },
  transactionsContent: {
    paddingHorizontal: 5,
  },
  transactionItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  transactionSubDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionDate: {
    fontSize: 12,
    color: '#888',
  },
  transactionSubCategory: {
    fontSize: 12,
    color: '#888',
  },
  categoriesContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 40,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendColor: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: Theme.colors.text,
  },
});

export default CalendarScreen;