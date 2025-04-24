"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.getCategories = exports.createCategory = void 0;
// import { supabase } from "../config/supabase.js";
const supabase_js_1 = require("../config/supabase.js");
const createCategory = async (categoryData) => {
    const { data, error } = await supabase_js_1.supabase
        .from('categories')
        .insert(categoryData)
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
exports.createCategory = createCategory;
const getCategories = async (userId) => {
    let query = supabase_js_1.supabase.from('categories').select('*');
    if (userId) {
        query = query.eq('user_id', userId);
    }
    const { data, error } = await query;
    if (error)
        throw error;
    return data || [];
};
exports.getCategories = getCategories;
const deleteCategory = async (id) => {
    const { error } = await supabase_js_1.supabase
        .from('categories')
        .delete()
        .eq('id', id);
    return !error;
};
exports.deleteCategory = deleteCategory;
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
