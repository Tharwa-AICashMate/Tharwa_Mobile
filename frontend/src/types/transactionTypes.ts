export type TransactionType = "income" | "expense";

export type CategoryType =
  | "salary"
  | "groceries"
  | "rent"
  | "transport"
  | "food"
  | "medicine"
  | "gifts"
  | "others";
export interface DescriptionItem {
  name: string;
  unitPrice: number;
  quantity?: number;
}
export type Transaction = {
  transaction_id: number;
  userId: string;
  categoryId: number;
  category_name: string;
  amount: number;
  created_at: string;
  type: "income" | "expense";
  title: string;
  description?: string;
  icon: string;
  details?: DescriptionItem[];
};
export interface TransactionSummary {
  totalBalance: number;
  income: number;
  expense: number;
}

export interface TransactionsByMonth {
  [month: string]: Transaction[];
}
