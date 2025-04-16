export type TransactionType = 'income' | 'expense';

export type CategoryType = 'salary' | 'groceries' | 'rent' | 'transport' | 'food' | 'others';

export interface Transaction {
  id: number;
  amount: number;
  type: TransactionType;
  category: CategoryType;
  date: string;
  description: string;
}

export interface TransactionSummary {
  totalBalance: number;
  income: number;
  expense: number;
}

export interface TransactionsByMonth {
  [month: string]: Transaction[];
}
