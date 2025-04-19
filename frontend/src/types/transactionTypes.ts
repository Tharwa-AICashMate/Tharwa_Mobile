export type TransactionType = 'income' | 'expense';


export type CategoryType = 
  | 'salary'
  | 'groceries'
  | 'rent'
  | 'transport'
  | 'food'
  | 'medicine' 
  | 'gifts'
  | 'others';
export type Transaction = {
  id: number;
  userId: string;
  categoryId: number;
  categoryName: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  title: string; 
  description?: string; 
};
export interface TransactionSummary {
  totalBalance: number;
  income: number;
  expense: number;
}

export interface TransactionsByMonth {
  [month: string]: Transaction[];
}

