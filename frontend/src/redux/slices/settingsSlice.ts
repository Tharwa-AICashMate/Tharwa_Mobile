
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { NotificationSettings, PasswordData, UserSettings } from "../../types/settings.types";
import { settingsApi } from "../../api/settingsApi";

interface SettingsState {
  userSettings: UserSettings | null;
  loading: boolean;
  error: string;
  passwordChangeSuccess: boolean;
}

const initialState: SettingsState = {
  userSettings: null,
  loading: false,
  error: "",
  passwordChangeSuccess: false,
};

export const fetchUserSettings = createAsyncThunk(
  "settings/fetchUserSettings",
  async (): Promise<UserSettings> => {
    const userSettings = await settingsApi.fetchUserSettings();
    if (!["light", "dark", "system"].includes(userSettings.theme)) {
      userSettings.theme = "light"; 
    }
    return {
      ...userSettings,
      theme: userSettings.theme as "light" | "dark" | "system",
    };
  }
);

export const updateNotificationSettings = createAsyncThunk(
  "settings/updateNotificationSettings",
  async (settings: NotificationSettings): Promise<NotificationSettings> => {
    return await settingsApi.updateNotificationSettings(settings);
  }
);

export const changePassword = createAsyncThunk(
  "settings/changePassword",
  async (data: PasswordData): Promise<boolean> => {
    return await settingsApi.changePassword(data);
  }
);

export const deleteAccount = createAsyncThunk(
  "settings/deleteAccount",
  async (): Promise<boolean> => {
    return await settingsApi.deleteAccount();
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    resetPasswordChangeSuccess: (state) => {
      state.passwordChangeSuccess = false;
    },
    clearErrors: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSettings.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        fetchUserSettings.fulfilled,
        (state, action: PayloadAction<UserSettings>) => {
          state.loading = false;
          state.userSettings = action.payload;
        }
      )
      .addCase(fetchUserSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch settings";
      })

      .addCase(updateNotificationSettings.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(
        updateNotificationSettings.fulfilled,
        (state, action: PayloadAction<NotificationSettings>) => {
          state.loading = false;
          if (state.userSettings) {
            state.userSettings.notificationSettings = action.payload;
          }
        }
      )
      .addCase(updateNotificationSettings.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to update notification settings";
      })

      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.passwordChangeSuccess = false;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.passwordChangeSuccess = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to change password";
        state.passwordChangeSuccess = false;
      })

      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete account";
      });
  },
});

export const { resetPasswordChangeSuccess, clearErrors } =
  settingsSlice.actions;
export default settingsSlice.reducer;



