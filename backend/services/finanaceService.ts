import { supabase } from "../config/supabase";

export const getFinanceSummary = async (userId: string) => {
  const [expensesRes, incomeRes, savingsRes] = await Promise.all([
    supabase
      .from('transaction_with_category')
      .select('amount')
      .eq('type', 'expense')
      .eq('user_id', userId),
    supabase
      .from('transaction_with_category')
      .select('amount')
      .eq('type', 'income')
      .eq('user_id', userId),
    supabase
      .from('goals_deposite')
      .select('amount, goals!inner(user_id)')
      .eq('goals.user_id', userId),
  ]);

  const hasError = expensesRes.error || incomeRes.error || savingsRes.error;
  if (hasError) {
   console.log(expensesRes.error , incomeRes.error , savingsRes.error)
  }

  const total = (arr: any[]) =>
    arr.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);

  return {
    income: total(incomeRes?.data || []),
    expenses: total(expensesRes?.data || []) ,
    savings: total(savingsRes?.data || []),
  };
};
