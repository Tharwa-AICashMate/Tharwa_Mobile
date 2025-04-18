import authReducer from "./slices/AuthSlice";

import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./slices/settingsSlice";
import helpCenterReducer from "./slices/helpCenterSlice";
import expenseReducer from "./slices/expenseSlice";
import savingsReducer from "./slices/savingSlice";
import transactionReducer from "./slices/transactionSlice";
export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    helpCenter: helpCenterReducer,
    expenses: expenseReducer,
    savings: savingsReducer,
    transactions: transactionReducer,
    auth: authReducer,
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
