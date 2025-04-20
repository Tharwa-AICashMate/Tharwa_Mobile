import { supabase } from "../config/supabase.js";
import { IGoal, IGoalCreate, IGoalUpdate } from "../types/goalsType.js";


export const createGoal = async (goalData: IGoalCreate): Promise<IGoal | null> => {
    const { data, error } = await supabase
        .from('goals')
        .insert(goalData)
        .select()
        .single();

    if (error) throw error;
    return data;
};

export const getGoal = async (id: string): Promise<IGoal | null> => {
    const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return null;
    return data;
};

export const getUserGoals = async (userId: string): Promise<IGoal[]> => {
    const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', userId);

    if (error) return [];
    return data;
};

export const updateGoal = async (id: string, goalData: IGoalUpdate): Promise<IGoal | null> => {
    const { data, error } = await supabase
        .from('goals')
        .update(goalData)
        .eq('id', id)
        .select()
        .single();

    if (error) return null;
    return data;
};

export const deleteGoal = async (id: string): Promise<boolean> => {
    const { error } = await supabase
        .from('goals')
        .delete()
        .eq('id', id);

    return !error;
};

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
