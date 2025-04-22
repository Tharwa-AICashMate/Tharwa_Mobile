import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserLocation, BestStoreResult, Store } from '../../types/store';
import { findBestStore } from './storeThunk';

interface StoreState {
  userLocation: UserLocation | null;
  locationDetected: boolean;
  stores: Store[];
  bestStoreResult: BestStoreResult | null;
  loading: boolean;
  error: string | null;
  searchRadius: number; // نطاق البحث بالكيلومتر
}

const initialState: StoreState = {
  userLocation: null,
  locationDetected: false,
  stores: [],
  bestStoreResult: null,
  loading: false,
  error: null,
  searchRadius: 5, // افتراضيًا 5 كيلومتر
};

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setUserLocation: (state, action: PayloadAction<UserLocation>) => {
      state.userLocation = action.payload;
      state.locationDetected = true;
    },
    resetBestStore: (state) => {
      state.bestStoreResult = null;
      state.error = null;
    },
    setSearchRadius: (state, action: PayloadAction<number>) => {
      state.searchRadius = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findBestStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findBestStore.fulfilled, (state, action) => {
        state.loading = false;
        state.bestStoreResult = action.payload;
      })
      .addCase(findBestStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to find the best store';
      });
  },
});

export const { setUserLocation, resetBestStore, setSearchRadius } = storeSlice.actions;
export default storeSlice.reducer;