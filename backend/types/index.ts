
export interface Store {
    latitude(lat: any, lng: any, latitude: any, longitude: any): number;
    id: string;
    name: string;
    lat: number;
    lng: number;
    address?: string;
    phone?: string;
    working_hours?: string;
    distance?: number; 
  }
  
  export interface StoreItem {
    id: string;
    store_id: string;
    item_name: string;
    price: number;
    category?: string;
    brand?: string;
    unit?: string;
    image_url?: string;
    last_updated?: Date;
  }
  
  export interface BestStoreResult {
    store: Store;
    totalPrice: number;
    distance: number;
    matchedItems: Array<{
      id: number;
      store_id: number;
      item_name: string;
      price: number;
    }>;
    score: number; 
  }
  
  export interface UserLocation {
    latitude: number;
    longitude: number;
  }