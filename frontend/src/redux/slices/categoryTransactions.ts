import { apiBase } from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Transaction {
  transaction_id: number;
  user_id: string;
  title: string;
  amount: number;
  type: "income" | "expence";
  category_id: number;
  category_name: string;
  created_at: string;
}

interface TransactionState {
  data: Transaction[];
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  createError: string | null;
}

const initialState: TransactionState = {
  data: [],
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
};

export const fetchTransactionsByCategory = createAsyncThunk(
  "transactions/fetchByCategory",
  async (
    { userId, categoryId }: { userId: string; categoryId: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${apiBase}/transactions/${userId}/category/${categoryId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/create",
  async (
    transaction: {
      category_id: number;
      amount: number;
      type: "income" | "expence";
      title: string;
      created_at:Date
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${apiBase}/transactions`,
        transaction
      );
      console.log('---------------------------------',response.data);
      return response.data;
    } catch (error: any) {
      console.log('------------------------',error)
      return rejectWithValue(error.message);
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    clearTransactions: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // 🟦 Fetch
      .addCase(fetchTransactionsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTransactionsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createTransaction.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.createLoading = false;
        state.data.push(action.payload); // add new transaction to state
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload as string;
      });
  },
});
export const { clearTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;
