
export interface Goal {
  id?: string;
  user_id: string;
  name: string;
  target_amount: number;
  icon?: string;
  deadline: Date;
  created_at?: Date;
  updated_at?: Date;
}