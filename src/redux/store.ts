// import { configureStore } from '@reduxjs/toolkit';
// import expenseReducer from './slices/expenseSlice';

// export const store = configureStore({
//   reducer: {
//     expenses: expenseReducer,
//   },
//   middleware: (getDefaultMiddleware) => 
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ['expenses/addTransaction'],
//         ignoredPaths: ['expenses.transactions'],
//       },
//     }),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import helpCenterReducer from './slices/helpCenterSlice';
import expenseReducer from './slices/expenseSlice';
import savingsReducer from './slices/savingSlice';
export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    helpCenter: helpCenterReducer,
    expenses: expenseReducer,
    savings: savingsReducer
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
