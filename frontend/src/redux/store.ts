import authReducer from "./slices/AuthSlice";
import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import helpCenterReducer from './slices/helpCenterSlice';
import goalsReducer from './slices/savingSlice';
import transactionReducer from './slices/transactionSlice'
import categoriesReducer from './slices/categoriesSlice';
import depositReducer from './slices/depositSlice'
import groceryReducer from './slices/grocerySlice';
import storeReducer from './slices/storeSlice';
import  categoryTransactionReducer from './slices/categoryTransactions'
export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    settings: settingsReducer,
    helpCenter: helpCenterReducer,
    goals: goalsReducer,
    transactions: transactionReducer,
    auth: authReducer,
    deposits: depositReducer,
    grocery: groceryReducer,
    store: storeReducer,
    transactionsByCategory: categoryTransactionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["expenses/addTransaction"],
        ignoredPaths: ["expenses.transactions"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
