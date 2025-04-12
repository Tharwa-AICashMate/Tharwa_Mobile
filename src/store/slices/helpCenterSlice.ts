import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FAQItem, SupportChannel } from '../../types';
import { fetchFAQs, fetchSupportChannels } from '../../api/helpCenter';

interface HelpCenterState {
  faqs: FAQItem[];
  supportChannels: SupportChannel[];
  selectedCategory: 'general' | 'account' | 'services';
  isLoading: boolean;
  error: string | null;
}

const initialState: HelpCenterState = {
  faqs: [],
  supportChannels: [],
  selectedCategory: 'general',
  isLoading: false,
  error: null,
};

export const getFAQs = createAsyncThunk(
  'helpCenter/getFAQs',
  async (category: 'general' | 'account' | 'services', { rejectWithValue }) => {
    try {
      return await fetchFAQs(category);
    } catch (error) {
      return rejectWithValue('Failed to fetch FAQs');
    }
  }
);

export const getSupportChannels = createAsyncThunk(
  'helpCenter/getSupportChannels',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchSupportChannels();
    } catch (error) {
      return rejectWithValue('Failed to fetch support channels');
    }
  }
);

const helpCenterSlice = createSlice({
  name: 'helpCenter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<'general' | 'account' | 'services'>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFAQs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFAQs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.faqs = action.payload;
      })
      .addCase(getFAQs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getSupportChannels.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSupportChannels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.supportChannels = action.payload;
      })
      .addCase(getSupportChannels.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCategory } = helpCenterSlice.actions;
export default helpCenterSlice.reducer;
