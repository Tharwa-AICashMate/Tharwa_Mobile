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
  transaction_id: number;
  userId: string;
  categoryId: number;
  category_name: string;
  amount: number;
  created_at: string;
  type: 'income' | 'expense';
  title: string; 
  description?: string; 
  icon:string;
};
export interface TransactionSummary {
  totalBalance: number;
  income: number;
  expense: number;
}

export interface TransactionsByMonth {
  [month: string]: Transaction[];
}

