
import { Goal } from "@/types/goal";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


interface GoalsState {
  items: Goal[];
  loading: boolean;
  error: string | null;
}

const initialState: GoalsState = {
  items: [],
  loading: false,
  error: null,
};


const BASE_URL = "http://192.168.1.105:3000/goals";



export const fetchUserGoals = createAsyncThunk(
  "goals/fetchUserGoals",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/user/${userId}`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch goals");
    }
  }
);

export const createGoal = createAsyncThunk(
  "goals/createGoal",
  async (goalData: Omit<Goal, "id">, { rejectWithValue }) => {
    try {
      const res = await axios.post(BASE_URL, goalData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to create goal");
    }
  }
);

export const updateGoal = createAsyncThunk(
  "goals/updateGoal",
  async ({ id, data }: { id: string; data: Partial<Goal> }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to update goal");
    }
  }
);

export const deleteGoal = createAsyncThunk(
  "goals/deleteGoal",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete goal");
    }
  }
);

// ===== Slice =====

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Goals
      .addCase(fetchUserGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserGoals.fulfilled, (state, action: PayloadAction<Goal[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create Goal
      .addCase(createGoal.fulfilled, (state, action: PayloadAction<Goal>) => {
        state.items.push(action.payload);
      })

      // Update Goal
      .addCase(updateGoal.fulfilled, (state, action: PayloadAction<Goal>) => {
        const index = state.items.findIndex((goal) => goal.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // Delete Goal
      .addCase(deleteGoal.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((goal) => goal.id !== action.payload);
      });
  },
});

export default goalsSlice.reducer;
