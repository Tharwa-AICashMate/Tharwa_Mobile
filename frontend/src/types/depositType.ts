export interface IDeposit {
  id?: string;
  goal_id: string;
  amount: number;
  message?: string;
  title: string;
  created_at?: Date;
}

export interface IDepositCreate {
  goal_id: number;
  amount: number;
  message?: string;
  title: string;
  created_at:Date
}

export interface IDepositUpdate {
  amount?: number;
  message?: string;
  title?: string;
}