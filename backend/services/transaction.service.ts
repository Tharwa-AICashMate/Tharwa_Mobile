import { supabase } from '../utils/transaction';

export const getAllTransactions = async (userId: string) => {
  const { data, error } = await supabase
    .from('transaction_with_category')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createTransaction = async (transaction: {
  user_id: string;
  category_id: number;
  category_name: string;
  amount: number;
  type: string;
  title: string;
}) => {
  const { data, error } = await supabase
    .from('transaction_with_category')
    .insert([{ ...transaction }]);

  if (error) throw error;
  return data;
};
