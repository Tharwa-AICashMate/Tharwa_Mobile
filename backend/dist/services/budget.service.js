"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBudgetService = exports.createBudgetService = exports.deleteBudgetByIdService = exports.getBudgetByIdService = exports.fetchAllBudgets = void 0;
const supabase_js_1 = require("../config/supabase.js");
const fetchAllBudgets = async () => {
    const { data, error } = await supabase_js_1.supabase.from('budgets').select('*');
    if (error)
        throw error;
    return data;
};
exports.fetchAllBudgets = fetchAllBudgets;
const getBudgetByIdService = async (id) => {
    const { data, error } = await supabase_js_1.supabase
        .from('budgets')
        .select('*')
        .eq('id', id)
        .single();
    if (error)
        throw error;
    return data;
};
exports.getBudgetByIdService = getBudgetByIdService;
const deleteBudgetByIdService = async (id) => {
    const { error } = await supabase_js_1.supabase
        .from('budgets')
        .delete()
        .eq('id', id);
    if (error)
        throw error;
    return true;
};
exports.deleteBudgetByIdService = deleteBudgetByIdService;
const createBudgetService = async (budget) => {
    const { data, error } = await supabase_js_1.supabase.from('budgets').insert([budget]).select().single();
    if (error)
        throw error;
    return data;
};
exports.createBudgetService = createBudgetService;
const updateBudgetService = async (id, updateFields) => {
    const { data, error } = await supabase_js_1.supabase
        .from('budgets')
        .update(updateFields)
        .eq('id', id)
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
exports.updateBudgetService = updateBudgetService;
