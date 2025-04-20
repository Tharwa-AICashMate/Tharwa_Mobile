export interface ICategory {
  id?: number;
  name: string;
  icon: string;
  user_id: string;
  created_at?: Date;
}

export interface ICategoryCreate {
  name: string;
  icon: string;
  user_id: string;
}