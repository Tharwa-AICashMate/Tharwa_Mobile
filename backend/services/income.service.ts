import { supabase } from '../utils/supabaseClient.js';

export const fetchIncome = async (user_id: string) => {
  return await supabase
    .from('balance')
    .select('income')
    .eq('user_id', user_id)
    .single();
};

export const setIncome = async (user_id: string, income: number) => {
  return await supabase
    .from('balance')
    .update({ income })
    .eq('user_id', user_id)
    .select()
    .single();
};


export const createIncomeRecord = async (user_id: string, income: number) => {
    return await supabase
      .from('balance')
      .insert([{ user_id, income }])
      .select()
      .single();
  };