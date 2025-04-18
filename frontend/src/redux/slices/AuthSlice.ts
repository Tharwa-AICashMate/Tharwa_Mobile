import { User } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { supabase } from "@/utils/supabase";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import { Provider } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const apiBase = "http://192.168.1.6:3000";

WebBrowser.maybeCompleteAuthSession();
const redirectTo = makeRedirectUri();
export const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);
  if (errorCode) throw new Error(errorCode);
  console.log("Received params:", params);
  const { access_token, refresh_token } = params;
  if (!access_token || !refresh_token) {
    console.log("Missing tokens", { access_token, refresh_token });
    return;
  }
  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

export const registerUser = createAsyncThunk(
  "auth/signup",
  async (payload: { user: User; password: string }, { rejectWithValue }) => {
    console.log("payload", payload);
    const { user, password } = payload;
    try {
      await axios.post(`${apiBase}/auth/signup`, {
        user: { ...user, dob: user.dob?.toISOString(), password },
      });
      console.log("User registered successfully", user);
      return { ...user, dob: user.dob?.toISOString() };
    } catch (error) {
      console.error("Error registering user:", error);
      rejectWithValue("User Email already Registered");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    const { email, password } = payload;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return rejectWithValue("Invalid email or password");
      const { data: userData } = await axios.post(`${apiBase}/auth/login`, {
        userId: data.user.id,
      });
      return userData.data;
    } catch (error) {
      console.error("Error registering user:", error);
      return rejectWithValue("Invalid email or password");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      let { error } = await supabase.auth.signOut();
      if (error) return rejectWithValue("Logout failed");
      return null;
    } catch (error) {
      console.error("Error logging out:", error);
      return rejectWithValue("Logout failed");
    }
  }
);

export const loginWithProvider = createAsyncThunk(
  "auth/loginWithProvider",
  async (provider: Provider, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
          skipBrowserRedirect: false,
        },
      });
      if (error) return rejectWithValue("Login failed");
      const res = await WebBrowser.openAuthSessionAsync(
        data?.url ?? "",
        redirectTo
      );
      if (res.type === "success") {
        const session = await createSessionFromUrl(res.url);
        const { data: userData } = await axios.post(`${apiBase}/auth/login`, {
          userId: session?.user.id,
        });
        return userData.data;
      }
    } catch (error) {
      console.error("Error logging in with provider:", error);
      return rejectWithValue("Login failed");
    }
  }
);
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
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload as User;
        state.error = null;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.loading = false;
      })
      .addCase(loginWithProvider.fulfilled, (state, action) => {
        state.user = action.payload as User;
        state.error = null;
        state.loading = false;
      })
      .addCase(loginWithProvider.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(loginWithProvider.pending, (state) => {
        state.loading = true;
      });

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

//export const {  } = authSlice.actions;
//logout, startForgotPassword, cancelReset
export default authSlice.reducer;
