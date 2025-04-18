import { User } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const apiBase = "http://192.168.1.6:3000";
export const registerUser = createAsyncThunk(
  "auth/signup",
  async (payload: { user: User; password: string }, { rejectWithValue }) => {
    console.log("payload", payload);
    const { user, password } = payload;
    try {
      await axios.post(`${apiBase}/auth/signup`, {
        user: { ...user,dob:user.dob?.toISOString(), password },
      });
      console.log("User registered successfully",user);
      return { ...user,dob:user.dob?.toISOString() };
    } catch (error) {
      console.error("Error registering user:", error);
      rejectWithValue("User Email already Registered");
    }
  }
);

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (
//     payload: { loginEmail: string; password: string },
//     { rejectWithValue }
//   ) => {
//     const { loginEmail, password } = payload;
//     const user = Users.find(
//       (user) => user.email === loginEmail && user.password === password
//     );
//     if (!user) {
//       return rejectWithValue("Invalid email or password");
//     }
//     return { user, token: "xxxx" }; // Simulate token
//   }
// );

// export const submitEmail = createAsyncThunk(
//   "auth/submitEmail",
//   async (email: string, { rejectWithValue }) => {
//     const user = Users.findIndex((user) => user.email === email);
//     if (user === -1) {
//       return rejectWithValue("No user registered with the provided email");
//     }
//     // Simulate sending a pin to the email
//     return { pin: "555555" }; // Simulated PIN
//   }
// );

// export const verifyPin = createAsyncThunk(
//   "auth/verifyPin",
//   async (pin: string, { getState, rejectWithValue }) => {
//     const state = getState() as { auth: AuthState };
//     if (pin !== state.auth.pin) {
//       return rejectWithValue("Incorrect PIN");
//     }
//     // Successfully verified, return empty
//     return null;
//   }
// );

// export const resetPassword = createAsyncThunk(
//   "auth/resetPassword",
//   async (
//     payload: { password: string; confirm: string },
//     { getState, rejectWithValue }
//   ) => {
//     const { password, confirm } = payload;
//     if (password !== confirm) {
//       return rejectWithValue("Passwords do not match");
//     }
//     const state = getState() as { auth: AuthState };
//     // Update user password in Users array
//     const updatedUsers = Users.map((user) =>
//       user.email === state.auth.user?.email ? { ...user, password } : user
//     );
//     return { updatedUsers };
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.user = null;
    //   state.token = null;
    // },
    // startForgotPassword: (state) => {
    //   state.error = null;
    //   state.pin = null;
    //   state.pinTimer = null;
    // },
    // cancelReset: (state) => {
    //   state.error = null;
    //   state.pin = null;
    //   state.pinTimer = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload as User;
        state.error = null;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      });
    //       .addCase(loginUser.fulfilled, (state, action) => {
    //         state.user = action.payload.user;
    //         state.token = action.payload.token;
    //         state.error = null;
    //       })
    //       .addCase(loginUser.rejected, (state, action) => {
    //         state.error = action.payload as string;
    //       })
    //       .addCase(submitEmail.fulfilled, (state, action) => {
    //         state.pin = action.payload.pin;
    //         state.error = null;
    //         state.pinTimer = setTimeout(() => (state.pin = null), 10 * 60 * 1000);
    //       })
    //       .addCase(submitEmail.rejected, (state, action) => {
    //         state.error = action.payload as string;
    //       })
    //       .addCase(verifyPin.fulfilled, (state) => {
    //         state.pin = null;
    //         state.pinTimer = null;
    //         state.error = null;
    //       })
    //       .addCase(verifyPin.rejected, (state, action) => {
    //         state.error = action.payload as string;
    //       })
    //       .addCase(resetPassword.fulfilled, (state, action) => {
    //         state.users = action.payload.updatedUsers;
    //         state.error = null;
    //       })
    //       .addCase(resetPassword.rejected, (state, action) => {
    //         state.error = action.payload as string;
    //       });
  },
});

// export const { logout, startForgotPassword, cancelReset } = authSlice.actions;

export default authSlice.reducer;
