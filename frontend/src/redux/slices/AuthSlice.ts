import { User } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { supabase } from "@/utils/supabase";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import { Provider } from "@supabase/supabase-js";
import { RootState } from "../store";

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

const apiBase = "http://192.168.1.4:3000";

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
          scopes: "email",
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

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const {data} = await axios.post(`${apiBase}/auth/forgetPassword`, {
        email,
      });
      console.log('-----------',data.data); 
      if (data.data.status !== 200) {
        return rejectWithValue(data.message);
      }
      return email;
    } catch (error) {
      console.error("Error sending otp:invalid email address can't send message", error);
      return rejectWithValue("invalid email address can't send message");
    }
  }
);

export const verifyPin = createAsyncThunk(
  "auth/verifyotp",
  async (payload:string , { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const email = state.auth.user!.email;
    try {
      console.log("payload", payload,email);
      const { data } = await axios.post(`${apiBase}/auth/verifyotp`, {otp:payload,email});
      console.log('-----------',data);
      if (data.data.status !== 200) {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      console.error("Error verifying pin:", error);
      return rejectWithValue("Invalid OTP");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload: string , { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const email = state.auth.user!.email;
    try {
      const { data } = await axios.post(`${apiBase}/auth/resetPassword`, {
        email,
        password:payload,
      });
      console.log('-----------',data);
      if (data.data.status !== 200) {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      return rejectWithValue("Error resetting password");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.user = {...state.user,email:action.payload} as User;
        state.error = null;
        state.loading = false;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPin.fulfilled, (state) => {
        state.error = null;
        state.loading = false;
      })
      .addCase(verifyPin.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(verifyPin.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      });
  }
});


export default authSlice.reducer;