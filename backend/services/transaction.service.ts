import { supabase } from '../utils/supabase';
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