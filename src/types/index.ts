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


