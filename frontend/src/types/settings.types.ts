
export interface NotificationSettings {
  generalNotification: boolean;
  sound: boolean;
  soundCall: boolean;
  vibrate: boolean;
  transactionUpdate: boolean;
  expenseReminder: boolean;
  budgetNotifications: boolean;
  lowBalanceAlerts: boolean;
}
  
  export interface PasswordData {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }
  
  export interface UserSettings {
    notificationSettings: NotificationSettings;
    language: string;
    theme: 'light' | 'dark' | 'system';
    currency: string;
    biometricEnabled: boolean;
  }