import { supabase } from '../config/supabase.js';

export const fetchAllBudgets = async () => {
  const { data, error } = await supabase.from('budgets').select('*');
  if (error) throw error;
  return data;
};

export const getBudgetByIdService = async (id: string) => {
  const { data, error } = await supabase
    .from('budgets')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const deleteBudgetByIdService = async (id: string) => {
  const { error } = await supabase
    .from('budgets')
    .delete()
    .eq('id', id);
    
  if (error) throw error;
  return true;
};


interface BudgetInput {
  user_id: string;
  budget_limit: number;
  created_at: string;
  updated_at: string;
}


export const createBudgetService = async (budget: BudgetInput) => {
  const { data, error } = await supabase.from('budgets').insert([budget]).select().single();
  if (error) throw error;
  return data;
};

export const updateBudgetService = async (
  id: string,
  updateFields: { budget_limit: number; updated_at: string }
) => {
  const { data, error } = await supabase
    .from('budgets')
    .update(updateFields)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
