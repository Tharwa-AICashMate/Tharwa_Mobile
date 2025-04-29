import { supabase } from '../config/supabase.js';

export const fetchAllBalances = async () => {
  const { data, error } = await supabase.from('balance').select('*');
  if (error) throw error;
  return data;
};

export const getBalanceByUserIdService = async (user_id: string) => {
  const { data, error } = await supabase
    .from('balance')
    .select('*')
    .eq('user_id', user_id)
    .single();
  console.log(data, error);
  if (error) throw error;
  return data;
};

export const deleteBalanceByUserIdService = async (user_id: string) => {
  const { error } = await supabase
    .from('balance')
    .delete()
    .eq('user_id', user_id);

  if (error) throw error;
  return true;
};

interface BalanceInput {
  user_id: string;
  balance_limit: number;
  created_at: string;
  updated_at: string;
}

export const createBalanceService = async (balance: BalanceInput) => {
  const { data, error } = await supabase
    .from('balance')
    .upsert([balance], {  onConflict: 'user_id'})
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateBalanceByUserIdService = async (
  user_id: string,
  updateFields: { balance_limit: number; updated_at: string }
) => {
  const { data, error } = await supabase
    .from('balance')
    .update(updateFields)
    .eq('user_id', user_id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
