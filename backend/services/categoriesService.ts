import { supabase } from "../config/supabase.js";
import { ICategory, ICategoryCreate } from "../types/categoryType.js";

export const createCategory = async (
  categoryData: ICategoryCreate
): Promise<ICategory | null> => {
  const { data, error } = await supabase
    .from("categories")
    .insert(categoryData)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getCategories = async (userId?: string): Promise<ICategory[]> => {
  let query = supabase.from("categories").select("*").neq("name", "Income");

  if (userId) {
    query = query.eq("user_id", userId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data || [];
};

export const getCategoryById = async (id: number): Promise<ICategory | null> => {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

export const updateCategory = async (id: number, updates: Partial<ICategoryCreate>): Promise<ICategory | null> => {
    const { data, error } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const deleteCategory = async (id: number): Promise<boolean> => {
  const { error } = await supabase.from("categories").delete().eq("id", id);

  return !error;
};
