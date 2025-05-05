import { supabase } from "../config/supabase.js";
export const createCategory = async (categoryData) => {
    const { data, error } = await supabase
        .from("categories")
        .insert(categoryData)
        .select()
        .single();
    console.log(data);
    if (error)
        throw error;
    return data;
};
export const getCategories = async (userId) => {
    let query = supabase.from("categories").select("*").neq("name", "Income");
    if (userId) {
        query = query.eq("user_id", userId);
    }
    const { data, error } = await query;
    if (error)
        throw error;
    return data || [];
};
export const getCategoryById = async (id) => {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();
    if (error)
        throw error;
    return data;
};
export const updateCategory = async (id, updates) => {
    const { data, error } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
export const deleteCategory = async (id) => {
    const { error } = await supabase.from("categories").delete().eq("id", id);
    return !error;
};
