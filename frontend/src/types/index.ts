// types/index.ts
import { RootStackParamList } from "@/navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


// Proper navigation prop typing for the Login screen
export type navigationProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
};

// Transaction type
export interface Transaction {
  id: string;
  category: string;
  amount: number;
  time: string;
  date: Date;
  icon: string;
  iconBgColor: string;
}

// Budget summary type
export interface BudgetSummary {
  totalExpenses: number;
  totalIncome: number;
  budgetLimit: number;
  percentageUsed: number;
}

// Category type
export interface Category {
  id: string;
  name: string;
  icon: string;
}

// State slice for expenses
export interface ExpenseState {
  budget: BudgetSummary;
  transactions: Transaction[];
  categories: Category[];
}

// FAQ and support
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "account" | "services";
}

export interface SupportChannel {
  id: string;
  name: string;
  icon: string;
  link: string;
}
/////////////
export interface Expense {
  id: string;
  date: string;
  title: string;
  amount: number;
  message?: string;
}

export interface SavingsCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  goal: number;
  saved: number;
  expenses: Expense[];
}

export interface SavingsState {
  totalSavings: number;
  totalBalance: number;
  targetAmount: number;
  categories: SavingsCategory[];
}

export type User = {
  username?: string;
  fullName: string;
  email: string;
  phone?:string,
  dob?: Date,  
  id: string;
};

interface SavingDeposit {
  id: string;
  amount: number;
  date: string;
  time: string;
}

interface SavingCategory {
  goal: number;
  deposits: SavingDeposit[];
}


