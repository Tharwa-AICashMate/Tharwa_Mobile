

import { supabase } from "../config/supabase.js";

interface DescriptionItem {
  name: string;
  unitPrice: number;
  quantity?: number;
}

interface Transaction {
  user_id?: string;
  category_id: number;
  amount: number;
  type: "income" | "expense";
  title: string;
  created_at: Date;
  details?: DescriptionItem[]; 
}

export const createTransaction = async (transaction: Transaction) => {
  
  const transactionToInsert = {
    ...transaction,
    details: transaction.details ? JSON.stringify(transaction.details) : null
  };

  const { data, error } = await supabase
    .from('transactions')
    .insert([transactionToInsert])
    .select();

  if (error) throw new Error(error.message);
  

  return data?.[0] ? {
    ...data[0],
    details: data[0].details ? JSON.parse(data[0].details) : undefined
  } : null;
};

// Update other functions to handle details parsing
export const getAllTransactions = async (userId: string) => {
  const { data, error } = await supabase
    .from('transaction_with_category')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  
  return data?.map(transaction => ({
    ...transaction,
    details: transaction.details ? JSON.parse(transaction.details) : undefined
  }));
};

export const getTransactionsByCategory = async (
  userId: string,
  categoryId: number
) => {
  const { data, error } = await supabase
    .from('transaction_with_category')
    .select('*')
    .eq('user_id', userId)
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  
  return data?.map(transaction => ({
    ...transaction,
    details: transaction.details ? JSON.parse(transaction.details) : undefined
  }));
};