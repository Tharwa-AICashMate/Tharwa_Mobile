export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface GroceryItem {
  id: string;
  item_id: string;
  user_id: string;
  new_price?: number;
  created_at: string;
}

export interface StoreItem {
  id: string;
  store_id: string;
  item_name: string;
  price: number;
  updated_at: string;
}

export interface Store {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  created_at: string;
}
