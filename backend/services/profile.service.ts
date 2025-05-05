import { supabase } from '../config/supabase.js';

export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select(' email, username, mobile_num');

  if (error) throw error;
  return data;
};

export const getUserById = async (user_id: string) => {
    const { data, error } = await supabase
      .from('users')
      .select(' email, full_name, mobile_num')
      .eq('id', user_id)
      .single();
  
    if (error) throw error;
    return data;
  };
  
  export const updateUserById = async (user_id: string, updateData: Partial<{ email: string, full_name: string, mobile_num: string }>) => {
    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', user_id)
      .select()
      .single();
  
    if (error) throw error;
    return data;
  };
  