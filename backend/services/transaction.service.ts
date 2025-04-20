import { supabase } from "../config/supabase.js";


// import { supabase } from './supabaseClient';
// import { Transaction } from '../types/transactions.js';


// export class TransactionService {
//   static async getAllTransactions() {
//     const { data, error } = await supabase
//       .from('transactions')
//       .select('*')
//       .order('created_at', { ascending: false });

//     if (error) throw error;
//     return data;
//   }

//   static async getTransactionsByCategory(categoryId: number) {
//     const { data, error } = await supabase
//       .from('transactions')
//       .select('*')
//       .eq('category_id', categoryId)
//       .order('created_at', { ascending: false });

//     if (error) throw error;
//     return data;
//   }

//   static async getTransactionsByType(type: 'income' | 'expence') {
//     const { data, error } = await supabase
//       .from('transactions')
//       .select('*')
//       .eq('type', type)
//       .order('created_at', { ascending: false });

//     if (error) throw error;
//     return data;
//   }

//   static async createTransaction(transaction: Omit<Transaction, 'id'>) {
//     const { data, error } = await supabase
//       .from('transactions')
//       .insert(transaction)
//       .select()
//       .single();

//     if (error) throw error;
//     return data;
//   }
// }
export const getAllTransactions = async (userId: string) => {
  const { data, error } = await supabase
    .from('transaction_with_category')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};
export const createTransaction = async (transaction: {
  user_id: string;
  category_id: number;
  amount: number;
  type: string;
  title: string;
}) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert([transaction])
    .select(); 

  if (error) throw new Error(error.message);
  return data?.[0];
};