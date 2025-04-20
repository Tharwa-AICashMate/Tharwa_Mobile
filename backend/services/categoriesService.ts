// import { supabase } from "../config/supabase.js";
import { supabase } from '../config/supabase.js';
import { ICategory, ICategoryCreate } from '../types/categoryType.js';

export const createCategory = async (categoryData: ICategoryCreate): Promise<ICategory | null> => {
    const { data, error } = await supabase
        .from('categories')
        .insert(categoryData)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const getCategories = async (userId?: string): Promise<ICategory[]> => {
    let query = supabase.from('categories').select('*');
    
    if (userId) {
        query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
};

export const deleteCategory = async (id: number): Promise<boolean> => {
    const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

    return !error;
};

// interface CategoryData {
//   user_id: string;
//   name: string;
//   icon: string;
// }

// const getAllCategories = async () => {
//   const { data, error } = await supabase.from('categories').select('*');
//   if (error) {
//     throw new Error(error.message);
//   }
//   return data;
// };


// const createCategory = async (data: CategoryData) => {
//   const { data: newCategory, error } = await supabase.from('categories').insert([data]);
//   if (error) {
//     throw new Error(error.message);
//   }
//   return newCategory;
// };

// const deleteCategory = async (id: string) => {
//   const { error } = await supabase.from('categories').delete().eq('id', id);
//   if (error) {
//     throw new Error(error.message);
//   }
// };

// export { getAllCategories, createCategory, deleteCategory };
