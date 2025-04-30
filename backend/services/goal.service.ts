import { supabase } from "../config/supabase.js";

export class GoalService {
  static async fetchGoalsByUserId(userId: string) {
    const { data, error } = await supabase
      .from("goals_progress")
      .select("name, icon, current_amount, target_amount")
      .eq('user_id', userId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
