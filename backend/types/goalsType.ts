export interface IGoal {
  id?: string;
  user_id: string;
  name: string;
  target_amount: number;
  icon?: string;
  deadline: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface IGoalCreate {
  user_id: string;
  name: string;
  target_amount: number;
  icon?: string;
  deadline: Date;
}

export interface IGoalUpdate {
  name?: string;
  target_amount?: number;
  icon?: string;
  deadline?: Date;
}