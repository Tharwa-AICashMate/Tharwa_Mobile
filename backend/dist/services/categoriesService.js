"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;
const supabase_js_1 = require("../config/supabase.js");
const createCategory = async (categoryData) => {
    const { data, error } = await supabase_js_1.supabase
        .from("categories")
        .insert(categoryData)
        .select()
        .single();
    console.log(data);
    if (error)
        throw error;
    return data;
};
exports.createCategory = createCategory;
const getCategories = async (userId) => {
    let query = supabase_js_1.supabase.from("categories").select("*").neq("name", "Income");
    if (userId) {
        query = query.eq("user_id", userId);
    }
    const { data, error } = await query;
    if (error)
        throw error;
    return data || [];
};
exports.getCategories = getCategories;
const getCategoryById = async (id) => {
    const { data, error } = await supabase_js_1.supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();
    if (error)
        throw error;
    return data;
};
exports.getCategoryById = getCategoryById;
const updateCategory = async (id, updates) => {
    const { data, error } = await supabase_js_1.supabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
exports.updateCategory = updateCategory;
const deleteCategory = async (id) => {
    const { error } = await supabase_js_1.supabase.from("categories").delete().eq("id", id);
    return !error;
};
exports.deleteCategory = deleteCategory;
