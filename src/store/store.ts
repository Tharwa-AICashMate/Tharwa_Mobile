import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './slices/settingsSlice';
import helpCenterReducer from './slices/helpCenterSlice';
export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    helpCenter: helpCenterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 