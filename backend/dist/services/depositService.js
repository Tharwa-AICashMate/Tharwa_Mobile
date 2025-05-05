"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depositService = void 0;
const supabase_js_1 = require("../config/supabase.js");
class DepositService {
    // Create a new deposit
    async createDeposit(depositData) {
        const { data, error } = await supabase_js_1.supabase
            .from('goals_deposite')
            .insert(depositData)
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    // Get deposit by ID
    async getDepositById(id) {
        const { data, error } = await supabase_js_1.supabase
            .from('goals_deposite')
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            return null;
        return data;
    }
    // Get deposits by goal ID
    async getDepositsByGoal(goalId) {
        const { data, error } = await supabase_js_1.supabase
            .from('goals_deposite')
            .select('*')
            .eq('goal_id', goalId);
        if (error)
            return [];
        return data;
    }
    // Update a deposit
    async updateDeposit(id, depositData) {
        const { data, error } = await supabase_js_1.supabase
            .from('goals_deposite')
            .update(depositData)
            .eq('id', id)
            .select()
            .single();
        if (error)
            return null;
        return data;
    }
    // Delete a deposit
    async deleteDeposit(id) {
        const { error } = await supabase_js_1.supabase
            .from('goals_deposite')
            .delete()
            .eq('id', id);
        console.log(id, error);
        return !error;
    }
}
// Export an instance of the DepositService
exports.depositService = new DepositService();
