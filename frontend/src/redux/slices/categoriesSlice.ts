

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/api/categories';
import { Category, CreateCategoryDTO, UpdateCategoryDTO } from '@/types/category';

interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
};

// Fetch categories
export const fetchUserCategories = createAsyncThunk(
  'categories/fetchUserCategories',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await fetchCategories(userId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Create category
export const addNewCategory = createAsyncThunk(
  'categories/addNewCategory',
  async (categoryData: CreateCategoryDTO, { rejectWithValue }) => {
    try {
      return await createCategory(categoryData);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Update category
export const editCategory = createAsyncThunk(
  'categories/editCategory',
  async ({ id, updates }: { id: number; updates: UpdateCategoryDTO }, { rejectWithValue }) => {
    try {
      return await updateCategory(id, updates);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete category
export const removeCategory = createAsyncThunk(
  'categories/removeCategory',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteCategory(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    resetCategories: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cases
      .addCase(fetchUserCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create cases
      .addCase(addNewCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update cases
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete cases
      .addCase(removeCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;