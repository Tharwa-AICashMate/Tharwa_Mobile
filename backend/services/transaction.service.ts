import { supabase } from "../config/supabase.js";

export const getAllTransactions = async (userId: string) => {
  const { data, error } = await supabase
    .from("transaction_with_category")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};
export const createTransaction = async (transaction: {
  category_id: number;
  amount: number;
  type: string;
  title: string;
  created_at: Date;
}) => {
  const { data, error } = await supabase
    .from("transactions")
    .insert([transaction])
    .select();

  if (error) throw new Error(error.message);
  return data?.[0];
};

export const getTransactionsByCategory = async (
  userId: string,
  categoryId: number
) => {
  const { data, error } = await supabase
    .from("transaction_with_category")
    .select("*")
    .eq("user_id", userId)
    .eq("category_id", categoryId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const deleteTransaction = async (transactionId: string) => {
  const { data, error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", transactionId);

  if (error) throw new Error(error.message);
  return ;
};
export const editTransaction = async (transaction: {
  user_id: string;
  category_id: number;
  amount: number;
  type: string;
  title: string;
  created_at: Date;
  transactionId: string;
}) => {
  const { data, error } = await supabase
    .from("transactions")
    .insert([transaction])
    .select();

  if (error) throw new Error(error.message);
  return data?.[0];
};
