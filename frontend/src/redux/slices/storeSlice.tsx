import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserLocation, BestStoreResult, Store } from '../../types/store';
import { addStore, fetchStores, fetchUserStores, findBestStore ,removeUserStore,runAnalysis} from './storeThunk';

interface StoreState {
  userLocation: UserLocation | null;
  locationDetected: boolean;
  stores: Store[];
  bestStoreResult: BestStoreResult | null;
  loading: boolean;
  error: string | null;
  searchRadius: number; 
  analysisStatus: 'idle' | 'loading' | 'succeeded' | 'failed'; // Add analysisStatus property
  analysisResults: any; 
  addStoreStatus: 'idle' | 'loading' | 'succeeded' | 'failed'; 
    addStoreError: string | null; 
    newlyAddedStore: Store | null;
    userStores: Store[],
    removeStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: StoreState = {
  userLocation: null,
  locationDetected: false,
  stores: [],
  bestStoreResult: null,
  loading: false,
  error: null,
  searchRadius: 5, 
  analysisStatus: 'idle',
  analysisResults: null, 
  addStoreStatus: 'idle',
  addStoreError: null,
  newlyAddedStore: null,
  userStores: [],
   removeStatus: 'idle'
};

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setUserLocation: (state, action: PayloadAction<UserLocation>) => {
      state.userLocation = action.payload;
      state.locationDetected = true;
    }, setStores: (state, action: PayloadAction<Store[]>) => {
      state.stores = action.payload;
    }, setUserStores: (state, action: PayloadAction<Store[]>) => {
      state.userStores = action.payload;
    },
    resetBestStore: (state) => {
      state.bestStoreResult = null;
      state.error = null;
    },
    setSearchRadius: (state, action: PayloadAction<number>) => {
      state.searchRadius = action.payload;
    },
    resetAddStoreStatus: (state) => {
      state.addStoreStatus = 'idle';
      state.addStoreError = null;
      state.newlyAddedStore = null;
  },
  resetRemoveStatus: (state) => {
    state.removeStatus = 'idle';
  },clearUserStores: (state) => {
    state.userStores = [];
  },reverseFavourite:(state,action) =>{
    state.stores = state.stores.map(item => item.id == action.payload ? {...item, is_favourite:!item.is_favourite}:item) 
  }
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
      }).addCase(runAnalysis.pending, (state) => {
        state.analysisStatus = 'loading';
      })
      .addCase(runAnalysis.fulfilled, (state, action) => {
        state.analysisStatus = 'succeeded';
        state.analysisResults = action.payload;
      })
      .addCase(runAnalysis.rejected, (state, action) => {
        state.analysisStatus = 'failed';
        state.error = action.error.message || 'An unknown error occurred';
      })    
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch stores';
      })
      .addCase(addStore.pending, (state) => {
        state.addStoreStatus = 'loading';
        state.addStoreError = null;
        state.newlyAddedStore = null;
    })
    .addCase(addStore.fulfilled, (state, action) => {
      state.addStoreStatus = 'succeeded';
      state.newlyAddedStore = action.payload;
      state.userStores = [...state.userStores, action.payload]; 
    })
    .addCase(addStore.rejected, (state, action) => {
        state.addStoreStatus = 'failed';
        state.addStoreError = action.payload as string || 'Failed to add store.';
    }) .addCase(fetchUserStores.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchUserStores.fulfilled, (state, action) => {
      state.loading = false;
      state.userStores = action.payload; 
    })
    .addCase(fetchUserStores.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || 'Failed to fetch user stores';
    })
    .addCase(removeUserStore.pending, (state) => {
      state.removeStatus = 'loading';
    })
    .addCase(removeUserStore.fulfilled, (state, action) => {
      state.removeStatus = 'succeeded';
      state.userStores = state.userStores.filter(store => store.id !== action.payload);
    })
    .addCase(removeUserStore.rejected, (state, action) => {
      state.removeStatus = 'failed';
      state.error = action.payload as string || 'Failed to remove store';
    });
  },
});

export const {reverseFavourite, setUserLocation,setUserStores, resetBestStore, setSearchRadius , resetAddStoreStatus , resetRemoveStatus ,clearUserStores , setStores } = storeSlice.actions;
export default storeSlice.reducer;