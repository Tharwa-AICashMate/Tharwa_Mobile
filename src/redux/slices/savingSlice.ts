import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SavingDeposit {
  id: string;
  amount: number;
  date: string;
  time: string;
}

interface SavingCategory {
  goal: number;
  deposits: SavingDeposit[];
}

interface SavingsState {
  categories: {
    [key: string]: SavingCategory;
  };
}

const calculateSaved = (deposits: SavingDeposit[]): number => {
  return deposits.reduce((total, deposit) => total + deposit.amount, 0);
};

const initialState: SavingsState = {
  categories: {
    'Travel': {
      goal: 350000,
      deposits: [
        { id: 't1', amount: 1500.00, date: 'April 12', time: '10:30' },
        { id: 't2', amount: 750.25, date: 'April 3', time: '14:15' },
        { id: 't3', amount: 1200.50, date: 'March 27', time: '09:45' },
        { id: 't4', amount: 300.75, date: 'March 15', time: '18:20' },
        { id: 't5', amount: 425.00, date: 'February 28', time: '11:10' },
        { id: 't6', amount: 600.00, date: 'February 14', time: '16:05' },
        { id: 't7', amount: 800.00, date: 'January 30', time: '12:40' }
      ]
    },
    'New House': {
      goal: 569200,
      deposits: [
        { id: 'h1', amount: 1477.77, date: 'April 9', time: '15:55' },
        { id: 'h2', amount: 11500.00, date: 'April 1', time: '09:30' },
        { id: 'h3', amount: 2200.50, date: 'March 24', time: '16:45' },
        { id: 'h4', amount: 1050.75, date: 'March 17', time: '11:20' },
        { id: 'h5', amount: 750.00, date: 'February 25', time: '14:10' },
        { id: 'h6', amount: 1225.00, date: 'February 10', time: '17:05' },
        { id: 'h7', amount: 900.00, date: 'January 27', time: '10:40' },
        { id: 'h8', amount: 102.67, date: 'January 15', time: '20:25' },
        { id: 'h9', amount: 45.04, date: 'January 02', time: '15:55' }
      ]
    },
    'Car': {
      goal: 45000,
      deposits: [
        { id: 'c1', amount: 2500.00, date: 'April 14', time: '13:45' },
        { id: 'c2', amount: 1750.50, date: 'March 31', time: '09:15' },
        { id: 'c3', amount: 3000.75, date: 'March 20', time: '16:40' },
        { id: 'c4', amount: 1200.00, date: 'February 27', time: '11:30' },
        { id: 'c5', amount: 2100.50, date: 'February 13', time: '14:25' },
        { id: 'c6', amount: 1800.00, date: 'January 29', time: '17:10' }
      ]
    },
    'Wedding': {
      goal: 35000,
      deposits: [
        { id: 'w1', amount: 1200.00, date: 'April 13', time: '10:20' },
        { id: 'w2', amount: 900.50, date: 'April 2', time: '15:35' },
        { id: 'w3', amount: 1500.25, date: 'March 25', time: '12:15' },
        { id: 'w4', amount: 800.00, date: 'March 16', time: '17:40' },
        { id: 'w5', amount: 1100.75, date: 'February 26', time: '09:55' },
        { id: 'w6', amount: 750.00, date: 'February 12', time: '14:30' },
        { id: 'w7', amount: 1350.00, date: 'January 28', time: '11:25' },
        { id: 'w8', amount: 900.00, date: 'January 14', time: '16:10' }
      ]
    }
  }
};

const savingsSlice = createSlice({
  name: 'savings',
  initialState,
  reducers: {
    addDeposit: (state, action: PayloadAction<{
      category: string;
      deposit: SavingDeposit
    }>) => {
      const { category, deposit } = action.payload;
     
      if (state.categories[category]) {
        state.categories[category].deposits.unshift(deposit);
      }
    },
    updateGoal: (state, action: PayloadAction<{
      category: string;
      goal: number
    }>) => {
      const { category, goal } = action.payload;
     
      if (state.categories[category]) {
        state.categories[category].goal = goal;
      }
    }
  }
});

export const selectSavedAmount = (state: { savings: SavingsState }, category: string): number => {
  const categoryData = state.savings.categories[category];
  if (!categoryData) return 0;
  
  return calculateSaved(categoryData.deposits);
};

export const { addDeposit, updateGoal } = savingsSlice.actions;
export default savingsSlice.reducer;