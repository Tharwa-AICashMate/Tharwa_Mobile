export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface Store {
  id: string;
  name: string;
  latitude: number; 
  longitude: number;
  city?: string;
  country?: string;
  type: 'findBestStore' | 'analysis';

}

export interface StoreItem {
  id: string;
  store_id: string;
  item_name: string;
  price: number;
}

export interface GroceryItem {
  id: string;
  name: string;
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
export interface AnalysisPayload {
  userId: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  inputs: string;
}
