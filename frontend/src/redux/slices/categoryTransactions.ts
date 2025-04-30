import { DescriptionItem, Transaction } from "@/types/transactionTypes";
import { apiBase } from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addTransaction } from "./financeSlice";

interface TransactionState {
  data: Transaction[];
  loading: boolean;
  error: string | null;
  createLoading: boolean;
  createError: string | null;
}

interface CreateTransactionPayload {
  categoryId: number;
  amount: number;
  type: "income" | "expense";
  title: string;
  created_at: Date;
  details?: DescriptionItem[];
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
    {
      userId,
      categoryId,
      page = 1,
    }: { userId: string; categoryId: number; page?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${apiBase}/transactions/${userId}/category/${categoryId}?page=${page}`
      );
      return {
        transactions: response.data,
        page,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const createTransaction = createAsyncThunk(
  "transactions/create",
  async (transaction: CreateTransactionPayload, { rejectWithValue,dispatch }) => {
    try {
      console.log(transaction);
      const response = await axios.post(`${apiBase}/transactions`, transaction);
      dispatch(
        addTransaction({
          type: transaction.type , 
          amount: transaction.amount,
        })
      );
      console.log("Transaction created:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Create transaction error:", error);
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
    deleteCategoryTransactions: (state, action) => {
      console.log(state.data[0]);
      state.data = state.data.filter(
        (item) => item.transaction_id !== action.payload
      );
    },
    updateCategoryTransactions: (state, action) => {
      console.log(state.data[0]);
      console.log(action.payload);
      state.data = state.data.map((item) =>
        item.transaction_id == action.payload.id ? action.payload.item : item
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        const { transactions, page } = action.payload;

        if (page === 1) {
          state.data = transactions;
        } else {
          const existingIds = new Set(state.data.map((t) => t.transaction_id));
          const newTransactions = transactions.filter(
            (t) => !existingIds.has(t.transaction_id)
          );

          state.data = [...state.data, ...newTransactions];
        }

        console.log(
          `Total transactions after page ${page}: ${state.data.length}`
        );
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
        state.data.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload as string;
      });
  },
});
export const {
  clearTransactions,
  deleteCategoryTransactions,
  updateCategoryTransactions,
} = transactionSlice.actions;
export default transactionSlice.reducer;
