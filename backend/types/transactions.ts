export interface Transaction {
  id?: number;
  category_id: number;
  amount: number;
  description?: string;  
  created_at?: string;
  title: string;
  type: 'income' | 'expence';
}

export interface TransactionFilters {
  category_id?: number;
  type?: 'income' | 'expence';
}