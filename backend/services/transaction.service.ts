import { supabase } from "../config/supabase.js";

export const getAllTransactions = async (userId: string, page = 1) => {
  const from = (page - 1) * 20;
  const to = from + 20 - 1;

  const { data, error } = await supabase
    .from("transaction_with_category")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

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
  categoryId: number,
  page = 1,
) => {
  const from = (page - 1) * 20;
  const to = from + 20 - 1;

  const { data, error } = await supabase
    .from("transaction_with_category")
    .select("*")
    .eq("user_id", userId)
    .eq("category_id", categoryId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw new Error(error.message);
  return data;
};

export const deleteTransaction = async (transactionId: string) => {
  const { data, error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", transactionId);

  if (error) throw new Error(error.message);
  return;
};
export const editTransaction = async (transaction: {
  category_id: number;
  amount: number;
  type: string;
  title: string;
  created_at: Date;
  id: string;
}) => {
  const { data, error } = await supabase
    .from("transactions")
    .update(transaction)
    .eq("id", transaction.id)
    .select()
    .single();
  console.log(transaction, data,error);
  if (error) throw new Error(error.message);
  return data?.[0];
};
