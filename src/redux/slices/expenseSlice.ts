import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BudgetSummary, Category, ExpenseState, Transaction } from '@/types/index';

// Initial data
const initialState: ExpenseState = {
  budget: {
    totalExpenses: 7783.00,
    totalIncome: -1187.40,
    budgetLimit: 20000.00,
    percentageUsed: 30
  },
  transactions: [
    {
      id: '1',
      category: 'Food',
      amount: 26.00,
      time: '18:27',
      date: new Date(2025, 3, 30), 
      icon: 'restaurant',
      iconBgColor: '#8CD7D9'
    },
    {
      id: '2',
      category: 'Food',
      amount: 18.35,
      time: '18:00',
      date: new Date(2025, 3, 24),
      icon: 'pizza',
      iconBgColor: '#4D77FF'
    },
    {
      id: '3',
      category: 'Food',
      amount: 15.40,
      time: '12:30',
      date: new Date(2025, 3, 15), // April 15, 2025
      icon: 'fast-food',
      iconBgColor: '#8CD7D9'
    },
    {
      id: '4',
      category: 'Food',
      amount: 12.13,
      time: '9:30',
      date: new Date(2025, 2, 8), // April 8, 2025
      icon: 'cafe',
      iconBgColor: '#4D77FF'
    },
    {
      id: '5',
      category: 'Food',
      amount: 27.20,
      time: '20:50',
      date: new Date(2025, 4, 31), // March 31, 2025
      icon: 'restaurant',
      iconBgColor: '#8CD7D9'
    },
    {
      id: '6',
      category: 'Transport',
      amount: 35.50,
      time: '14:20',
      date: new Date(2025, 4, 28),
      icon: 'bus',
      iconBgColor: '#4D77FF'
    },
    {
      id: '7',
      category: 'Medicine',
      amount: 42.75,
      time: '10:15',
      date: new Date(2025, 5, 22),
      icon: 'medical',
      iconBgColor: '#8CD7D9'
    }
  ],
categories: [
    { id: '1', name: 'Food', icon: 'restaurant-outline'},
    { id: '2', name: 'Transport', icon: 'bus-outline' },
    { id: '3', name: 'Medicine', icon: 'medical-outline' },
    { id: '4', name: 'Groceries', icon: 'basket-outline' },
    { id: '5', name: 'Rent', icon: 'key-outline' },
    { id: '6', name: 'Gifts', icon: 'gift-outline' },
    { id: '7', name: 'Savings', icon: 'cash-outline' },
    { id: '8', name: 'Entertainment', icon: 'film-outline' },
  ]
};
const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Omit<Transaction, 'id'>>) => {
      const newTransaction = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.transactions = [newTransaction, ...state.transactions];
      
      
    },
    updateBudget: (state, action: PayloadAction<Partial<BudgetSummary>>) => {
      state.budget = { ...state.budget, ...action.payload };
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex(cat => cat.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    addCategory: (state, action: PayloadAction<Omit<Category, 'id'>>) => {
      const newCategory = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.categories.push(newCategory);
    }
  }
});

export const { addTransaction, updateBudget, updateCategory, addCategory } = expenseSlice.actions;
export default expenseSlice.reducer;