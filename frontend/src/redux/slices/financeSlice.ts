import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiBase } from '@/utils/axiosInstance';

interface FinanceState {
  balance: number;
  income: number;
  expenses: number;
  savings: number;
  loading: boolean;
  error: string | null;
}

const initialState: FinanceState = {
  balance: 0,
  income: 0,
  expenses: 0,
  savings: 0,
  loading: false,
  error: null,
};
// Async Thunks
export const fetchFinanceData = createAsyncThunk(
  'finance/fetchData',
  async (userId: string, thunkAPI) => {
    console.log('----------------',userId)
    try{
     const res = await axios.get(`${apiBase}/finance/${userId}`);
     if (!res.data || typeof res.data !== 'object') {
        return thunkAPI.rejectWithValue('Invalid response from finance API');
      }
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchBalance = createAsyncThunk(
  'finance/fetchBalance',
  async (userId: string, thunkAPI) => {
    try {  
        const response = await fetch(`${apiBase}/api/balances/user/${userId}`);
        //if (!response.ok) throw new Error('Failed to fetch balance');
        const data = await response.json();
        return data.balance_limit || 0;
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
  }
);

// Slice
const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    // Optimistic updates
    addTransaction: (state, action: PayloadAction<{ type: 'income' | 'expense'; amount: number }>) => {
      const { type, amount } = action.payload;
      if (type === 'income') {
        state.income += amount;
      } else {
        state.expenses += amount;
      }
    },
    removeTransaction: (state, action: PayloadAction<{ type: 'income' | 'expense'; amount: number }>) => {
      const { type, amount } = action.payload;
      if (type === 'income') {
        state.income -= amount;
      } else {
        state.expenses -= amount;
      }
    },
    updateTransaction: (state, action: PayloadAction<{ oldType: 'income' | 'expense'; newType: 'income' | 'expense'; oldAmount: number; newAmount: number }>) => {
      const { oldType, newType, oldAmount, newAmount } = action.payload;

      if (oldType === newType) {
        if (oldType === 'income') {
          state.income += newAmount - oldAmount;
        } else {
          state.expenses += newAmount - oldAmount;
        }
      } else {
        if (oldType === 'income') {
          state.income -= oldAmount;
          state.expenses += newAmount;
        } else {
          state.expenses -= oldAmount;
          state.income += newAmount;
        }
      }
    },
    addSavings: (state, action: PayloadAction<number>) => {
      state.savings += action.payload;
    },
    removeSavings: (state, action: PayloadAction<number>) => {
      state.savings -= action.payload;
    },
    updateSavings: (state, action: PayloadAction<{ oldAmount: number; newAmount: number }>) => {
      state.savings += action.payload.newAmount - action.payload.oldAmount;
    },
    updateBalance:(state, action: PayloadAction<number>) =>{
        state.balance = action.payload
    },
    updateIncome:(state, action: PayloadAction<number>) =>{
        state.income = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFinanceData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFinanceData.fulfilled, (state, action) => {
        state.expenses = action.payload.expenses;
        state.income = action.payload.income;
        state.savings = action.payload.savings;
        state.loading = false;
      })
      .addCase(fetchFinanceData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || action.error.message || 'Something went wrong';
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const {
  addTransaction,
  removeTransaction,
  updateTransaction,
  addSavings,
  removeSavings,
  updateSavings,
  updateBalance,
  updateIncome
} = financeSlice.actions;


export default financeSlice.reducer;
