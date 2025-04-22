

import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import helpCenterReducer from './slices/helpCenterSlice';
import expenseReducer from './slices/expenseSlice';
import savingsReducer from './slices/savingSlice';
import transactionReducer from './slices/transactionSlice'
import groceryReducer from './slices/grocerySlice';
import storeReducer from './slices/storeSlice';
export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    helpCenter: helpCenterReducer,
    expenses: expenseReducer,
    savings: savingsReducer,
    transactions: transactionReducer,
    grocery: groceryReducer,
    store: storeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['expenses/addTransaction'],
        ignoredPaths: ['expenses.transactions'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
