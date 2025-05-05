
import { Store } from "../types";
import { supabase } from "../utils/supabaseClient.js";

export const getStores = async (): Promise<Store[]> => {
  const { data, error } = await supabase
    .from('stores')
    .select('id, name, latitude, longitude, city, country');

  if (error) throw error;

  return data.map(store => ({
    ...store,
    lat: store.latitude,
    lng: store.longitude,
  }));
};

export const getStoreItems = async () => {
  const { data, error } = await supabase
    .from('store_items')
    .select('*');

  if (error) throw error;
  return data;
};
