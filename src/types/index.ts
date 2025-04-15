export interface Transaction {
  id: string;
  category: string;
  amount: number;
  time: string;
  date: Date;
  icon: string;
  iconBgColor: string;
}

export interface BudgetSummary {
  totalExpenses: number;
  totalIncome: number;
  budgetLimit: number;
  percentageUsed: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  
}

export interface ExpenseState {
  budget: BudgetSummary;
  transactions: Transaction[];
  categories: Category[];
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

export type RootStackParamList = {
  Home: undefined;
  Category: { categoryId: string };
  AddSavings: { categoryId?: string };
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

// interface SavingsState {
//   categories: {
//     [key: string]: SavingCategory;
//   };
// }