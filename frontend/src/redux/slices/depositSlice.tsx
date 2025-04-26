import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IDeposit, IDepositCreate, IDepositUpdate } from'@/types/depositType';

const API_URL = 'http://localhost:3000/deposits'; 

export const createDeposit = createAsyncThunk(
  'deposits/createDeposit',
  async (data: IDepositCreate) => {
    const response = await axios.post<IDeposit>(`${API_URL}`, data);
    return response.data;
  }
);

export const getDepositById = createAsyncThunk(
  'deposits/getDepositById',
  async (id: string) => {
    const response = await axios.get<IDeposit>(`${API_URL}/${id}`);
    return response.data;
  }
);

export const getDepositsByGoal = createAsyncThunk(
  'deposits/getDepositsByGoal',
  async (goalId: number) => {
    const response = await axios.get<IDeposit[]>(`${API_URL}/goal/${goalId}`);
    return response.data;
  }
);

interface DepositState {
  deposit?: IDeposit;
  deposits: IDeposit[];
  loading: boolean;
  error?: string;
}

const initialState: DepositState = {
  deposits: [],
  loading: false,
};

const depositSlice = createSlice({
  name: 'deposits',
  initialState,
  reducers: {
    cleargoals: (state) => {
      state.deposits = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDeposit.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(createDeposit.fulfilled, (state, action: PayloadAction<IDeposit>) => {
        state.loading = false;
        state.deposits.push(action.payload);
      })
      .addCase(createDeposit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getDepositById.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getDepositById.fulfilled, (state, action: PayloadAction<IDeposit>) => {
        state.loading = false;
        state.deposit = action.payload;
      })
      .addCase(getDepositById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getDepositsByGoal.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getDepositsByGoal.fulfilled, (state, action: PayloadAction<IDeposit[]>) => {
        state.loading = false;
        state.deposits = action.payload;
      })
      .addCase(getDepositsByGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { cleargoals } = depositSlice.actions;
export default depositSlice.reducer;
