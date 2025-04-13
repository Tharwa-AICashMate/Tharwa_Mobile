import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './slices/expenseSlice';

export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
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
