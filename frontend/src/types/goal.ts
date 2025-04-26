
export interface Goal {
  id?: number;
  user_id: string;
  name: string;
  target_amount: number;
  icon?: string;
  deadline: Date;
  created_at?: Date;
  updated_at?: Date;
}