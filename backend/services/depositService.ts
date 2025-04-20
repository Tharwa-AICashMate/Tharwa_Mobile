import { IDeposit, IDepositCreate } from "../types/depositType.js";
import { supabase } from "../config/supabase.js";

class DepositService {
    // Create a new deposit
    async createDeposit(depositData: IDepositCreate): Promise<IDeposit | null> {
        const { data, error } = await supabase
            .from('goals_deposite')
            .insert(depositData)
            .select()
            .single();

        if (error) throw error;
        return data;
    }

    // Get deposit by ID
    async getDepositById(id: string): Promise<IDeposit | null> {
        const { data, error } = await supabase
            .from('goals_deposite')
            .select('*')
            .eq('id', id)
            .single();

        if (error) return null;
        return data;
    }

    // Get deposits by goal ID
    async getDepositsByGoal(goalId: string): Promise<IDeposit[]> {
        const { data, error } = await supabase
            .from('goals_deposite')
            .select('*')
            .eq('goal_id', goalId);

        if (error) return [];
        return data;
    }

    // Update a deposit
    async updateDeposit(id: string, depositData: Partial<IDeposit>): Promise<IDeposit | null> {
        const { data, error } = await supabase
            .from('goals_deposite')
            .update(depositData)
            .eq('id', id)
            .select()
            .single();

        if (error) return null;
        return data;
    }

    // Delete a deposit
    async deleteDeposit(id: string): Promise<boolean> {
        const { error } = await supabase
            .from('goals_deposite')
            .delete()
            .eq('id', id);

        return !error;
    }
}

// Export an instance of the DepositService
export const depositService = new DepositService();
