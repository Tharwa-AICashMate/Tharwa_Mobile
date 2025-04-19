export interface Category {
  id?: number;
  name: string;
  icon: string;
  user_id: string;
  created_at?: Date;
}


export interface CreateCategoryDTO {
  name: string;
  icon: string;
  user_id: string;
}


