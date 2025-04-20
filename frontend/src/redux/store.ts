

import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import helpCenterReducer from './slices/helpCenterSlice';
import expenseReducer from './slices/expenseSlice';
import goalsReducer from './slices/savingSlice';
import transactionReducer from './slices/transactionSlice'
import categoriesReducer from './slices/categoriesSlice';
import depositReducer from './slices/depositSlice'
export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    settings: settingsReducer,
    helpCenter: helpCenterReducer,
    expenses: expenseReducer,
    goals: goalsReducer,
    transactions: transactionReducer,
    deposits: depositReducer,
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
