import axios from "axios";
import { apiBase } from "@/utils/axiosInstance";

// const API_URL = "http://localhost:5000";
const API_URL = apiBase;

interface NotificationSettings {
  generalNotification: boolean;
  sound: boolean;
  soundCall: boolean;
  vibrate: boolean;
  transactionUpdate: boolean;
  expenseReminder: boolean;
  budgetNotifications: boolean;
  lowBalanceAlerts: boolean;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface UserSettings {
  notificationSettings: NotificationSettings;
  language: string;
  theme: string;
  currency: string;
  biometricEnabled: boolean;
}

export const settingsApi = {
  fetchUserSettings: async (): Promise<UserSettings> => {
    const res = await axios.get(`${API_URL}/userSettings`);
    return res.data;
  },

  updateNotificationSettings: async (settings: NotificationSettings): Promise<NotificationSettings> => {
    const current = await axios.get(`${API_URL}/userSettings`);
    const updated = {
      ...current.data,
      notificationSettings: settings
    };
    const res = await axios.put(`${API_URL}/userSettings`, updated);
    return res.data.notificationSettings;
  },

  changePassword: async (data: PasswordData): Promise<boolean> => {
    const current = await axios.get(`${API_URL}/password`);
    if (data.currentPassword !== current.data.currentPassword) {
      throw new Error("Current password is incorrect");
    }
    if (data.newPassword !== data.confirmNewPassword) {
      throw new Error("Passwords do not match");
    }

    await axios.put(`${API_URL}/password`, { currentPassword: data.newPassword });

    return true;
  },

  deleteAccount: async (): Promise<boolean> => {
    return true; 
  }
};
