import { Goal } from "@/types/goal";
import { apiBase } from "@/utils/axiosInstance";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface GoalsState {
  items: Goal[];
  loading: boolean;
  error: string | null;
  currentAmounts: Record<number, number>;
  goalLoading: Record<number, boolean>;
}

const initialState: GoalsState = {
  items: [],
  loading: false,
  error: null,
  currentAmounts: {},
  goalLoading: {},
};

const BASE_URL = `${apiBase}/goals`;

// === Async Thunks ===

export const fetchGoalCurrentAmount = createAsyncThunk(
  "goals/fetchGoalCurrentAmount",
  async (goalId: number, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/${goalId}/current-amount`);
      return {
        goalId,
        currentAmount: res.data.current_amount,
      };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch current amount"
      );
    }
  }
);

export const fetchUserGoals = createAsyncThunk(
  "goals/fetchUserGoals",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/user/${userId}`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch goals"
      );
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
      return rejectWithValue(
        err.response?.data?.message || "Failed to create goal"
      );
    }
  }
);

export const updateGoal = createAsyncThunk(
  "goals/updateGoal",
  async (
    { id, data }: { id: number; data: Partial<Goal> },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.put(`${BASE_URL}/${id}`, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update goal"
      );
    }
  }
);

export const deleteGoal = createAsyncThunk(
  "goals/deleteGoal",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete goal"
      );
    }
  }
);



// === Slice ===

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // === Fetch User Goals ===
      .addCase(fetchUserGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserGoals.fulfilled,
        (state, action: PayloadAction<Goal[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchUserGoals.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch goals";
      })

      // === Create Goal ===
      .addCase(createGoal.fulfilled, (state, action: PayloadAction<Goal>) => {
        state.items.push(action.payload);
      })

      // === Update Goal ===
      .addCase(updateGoal.fulfilled, (state, action: PayloadAction<Goal>) => {
        const index = state.items.findIndex(
          (goal) => goal.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      // === Delete Goal ===
      .addCase(deleteGoal.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter((goal) => goal.id !== action.payload);
      })

      // === Fetch Goal Current Amount ===
      .addCase(fetchGoalCurrentAmount.pending, (state, action) => {
        const goalId = action.meta.arg;
        state.goalLoading[goalId] = true;
      })
      .addCase(fetchGoalCurrentAmount.fulfilled, (state, action) => {
        const { goalId, currentAmount } = action.payload;
        state.currentAmounts[goalId] = currentAmount;
        state.goalLoading[goalId] = false;
      })
      .addCase(fetchGoalCurrentAmount.rejected, (state, action) => {
        const goalId = action.meta.arg;
        state.goalLoading[goalId] = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to fetch current amount";
      });
  },
});

export default goalsSlice.reducer;
