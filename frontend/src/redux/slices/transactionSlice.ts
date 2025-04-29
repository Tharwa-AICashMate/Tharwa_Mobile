import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  Transaction,
  TransactionSummary,
  TransactionsByMonth,
} from "@/types/transactionTypes";
import * as api from "@/api/transactionApi";
import {
  groupTransactionsByMonth,
  calculateTransactionSummary,
} from "../../utils/helpers";
import { deleteCategoryTransactions } from "./categoryTransactions";

interface TransactionState {
  transactions: Transaction[];
  transactionsByMonth: TransactionsByMonth;
  summary: TransactionSummary;
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  transactionsByMonth: {},
  summary: {
    totalBalance: 0,
    income: 0,
    expense: 0,
  },
  loading: false,
  error: null,
};

export const fetchTransactionsAsync = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    return await api.fetchTransactions();
  }
);

export const addTransactionAsync = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction: Omit<Transaction, "id">) => {
    return await api.addTransaction(transaction);
  }
);

export const deleteTransactionsAsync = createAsyncThunk(
  "transactions/deleteTransactions",
  async (transactionId:string, thunkAPI) => {
    await api.deleteTransactions(transactionId);
     thunkAPI.dispatch(deleteCategoryTransactions(Number(transactionId)))
    return transactionId;
  }
);

export const editTransactionsAsync = createAsyncThunk(
  "transactions/editTransactions",
  async () => {
    return await api.editTransactions();
  }
);
const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionsAsync.fulfilled, (state, action) => {
        state.loading = false;
        const validTransactions = action.payload as Transaction[];
        state.transactions = validTransactions;
        state.transactionsByMonth = groupTransactionsByMonth(validTransactions);
        state.summary = calculateTransactionSummary(validTransactions);
      })
      .addCase(fetchTransactionsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch transactions";
      })
      .addCase(
        addTransactionAsync.fulfilled,
        (state, action: PayloadAction<Transaction>) => {
          state.transactions.push(action.payload);
          state.transactionsByMonth = groupTransactionsByMonth(
            state.transactions
          );
          state.summary = calculateTransactionSummary(state.transactions);
        }
      )
      .addCase(deleteTransactionsAsync.fulfilled ,(state,action) =>{
        console.log(Number(action.payload),state.transactions[0])
        state.transactions = state.transactions.filter(item => item.transaction_id !== Number(action.payload))
        state.transactionsByMonth = groupTransactionsByMonth(state.transactions);
        console.log('new---------------',state.transactions);
      });
  },
});

export default transactionSlice.reducer;
