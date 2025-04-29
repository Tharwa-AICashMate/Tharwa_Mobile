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
import {
  deleteCategoryTransactions,
  updateCategoryTransactions,
} from "./categoryTransactions";
import {
  addTransaction,
  removeTransaction,
  updateTransaction,
} from "./financeSlice";

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
  async ({ page = 1 }: { page?: number }) => {
    const response = await api.fetchTransactions(page);
    return {
      transactions: response,
      page,
    };
  }
);

export const addTransactionAsync = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction: Omit<Transaction, "id">, { dispatch }) => {
    dispatch(
      addTransaction({
        type: transaction.type,
        amount: transaction.amount,
      })
    );
    return await api.addTransaction(transaction);
  }
);

export const deleteTransactionsAsync = createAsyncThunk(
  "transactions/deleteTransactions",
  async (transactionId: string, thunkAPI) => {
    await api.deleteTransactions(transactionId);
    const state = thunkAPI.getState();
    const transactions = state.transactions.items || state.transactionsByCategory.data;
    const transaction = transactions.find(
      (t: Transaction) => t.transaction_id == transactionId
    );
    thunkAPI.dispatch(
      removeTransaction({
        type: transaction.type,
        amount: transaction.amount,
      })
    );
    thunkAPI.dispatch(deleteCategoryTransactions(Number(transactionId)));
    return transactionId;
  }
);

export const editTransactionsAsync = createAsyncThunk(
  "transactions/editTransactions",
  async (transaction: Transaction, thunkAPI) => {
    console.log(transaction);
    const res = await api.editTransactions(transaction);
    thunkAPI.dispatch(
      updateCategoryTransactions({ id: transaction.id, item: transaction })
    );
    const state = thunkAPI.getState();
    const transactions = state.transactions.items || state.transactionsByCategory.data;
    const existingTx = transactions.find(
      (t: Transaction) => t.transaction_id == transaction.id
    );

    thunkAPI.dispatch(
      updateTransaction({
        newType: transaction.type,
        newAmount: transaction.amount,
        oldType: existingTx.type,
        oldAmount: existingTx.amount,
      })
    );
    console.log(res);
    return res;
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
        const { transactions, page } = action.payload;
        if (page === 1) {
          state.transactions = transactions;
        } else {
          const existingIds = new Set(
            state.transactions.map((t) => t.transaction_id)
          );
          const newTransactions = transactions.filter(
            (t) => !existingIds.has(t.transaction_id)
          );
          state.transactions = [...state.transactions, ...newTransactions];
        }
        state.transactionsByMonth = groupTransactionsByMonth(
          state.transactions
        );
        console.log(
          "---------------hdsfgjl------------------",
          state.transactions.length
        );
        state.summary = calculateTransactionSummary(state.transactions);
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
      .addCase(deleteTransactionsAsync.fulfilled, (state, action) => {
        console.log(Number(action.payload), state.transactions[0]);
        state.transactions = state.transactions.filter(
          (item) => item.transaction_id !== Number(action.payload)
        );
        state.transactionsByMonth = groupTransactionsByMonth(
          state.transactions
        );
        console.log("new---------------", state.transactions);
      })
      .addCase(editTransactionsAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        state.transactions = state.transactions.map(
          (item) => item.transaction_id !== action.payload.transaction_id ? item :action.payload
        );
        state.transactionsByMonth = groupTransactionsByMonth(
          state.transactions
        );
        console.log("new---------------", state.transactions);
      });
  },
});

export default transactionSlice.reducer;
