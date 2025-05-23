import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroceryItem } from '../../types/store';

interface GroceryState {
  items: GroceryItem[];
}

const initialState: GroceryState = {
  items: [],
};

const grocerySlice = createSlice({
  name: 'grocery',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      const newItem: GroceryItem = {
        id: Date.now().toString(),
        name: action.payload.toLowerCase(),
      };
      if(!state.items.find(item => item.name  == newItem.name))
      state.items = [...state.items ,newItem];
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearItems } = grocerySlice.actions;
export default grocerySlice.reducer;