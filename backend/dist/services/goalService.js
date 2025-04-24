"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGoal = exports.updateGoal = exports.getUserGoals = exports.getGoal = exports.createGoal = void 0;
const supabase_js_1 = require("../config/supabase.js");
const createGoal = async (goalData) => {
    const { data, error } = await supabase_js_1.supabase
        .from('goals')
        .insert(goalData)
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
exports.createGoal = createGoal;
const getGoal = async (id) => {
    const { data, error } = await supabase_js_1.supabase
        .from('goals')
        .select('*')
        .eq('id', id)
        .single();
    if (error)
        return null;
    return data;
};
exports.getGoal = getGoal;
const getUserGoals = async (userId) => {
    const { data, error } = await supabase_js_1.supabase
        .from('goals')
        .select('*')
        .eq('user_id', userId);
    if (error)
        return [];
    return data;
};
exports.getUserGoals = getUserGoals;
const updateGoal = async (id, goalData) => {
    const { data, error } = await supabase_js_1.supabase
        .from('goals')
        .update(goalData)
        .eq('id', id)
        .select()
        .single();
    if (error)
        return null;
    return data;
};
exports.updateGoal = updateGoal;
const deleteGoal = async (id) => {
    const { error } = await supabase_js_1.supabase
        .from('goals')
        .delete()
        .eq('id', id);
    return !error;
};
exports.deleteGoal = deleteGoal;
// export const getGoalProgress = async (goalId: string): Promise<{ current: number; target: number } | null> => {
//     const goal = await getGoal(goalId);
//     if (!goal) return null;
//     const deposits = await depositModel.getDepositsByGoal(goalId);
//     const currentAmount = deposits.reduce((sum, deposit) => sum + deposit.amount, 0);
//     return {
//         current: currentAmount,
//         target: goal.target_amount
//     };
// };
