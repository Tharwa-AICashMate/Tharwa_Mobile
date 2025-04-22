// import axios from 'axios';
// import { Store, StoreItem } from '../types/store';
// import { BestStoreResult } from '../types/store';

// // const API_URL = 'http://localhost:5000';
// const API_URL = 'http://localhost:3000/api';
 
// export const getStores = async (): Promise<Store[]> => {
//   try {
//     const response = await axios.get(`${API_URL}/stores`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching stores:', error);
//     throw error;
//   }
// };

// export const getStoreItems = async (): Promise<StoreItem[]> => {
//   try {
//     const response = await axios.get(`${API_URL}/store_items`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching store items:', error);
//     throw error;
//   }
// };

// export const getBestMatch = async (
//   lat: number, lng: number, items: string[], searchRadius: number
// ): Promise<BestStoreResult> => {
//   try {
//     const response = await axios.post(`${API_URL}/best-match`, {
//       lat,
//       lng,
//       items
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error finding best match:', error);
//     throw error;
//   }
// };

// في api/storeapi.ts
import { Store, StoreItem, BestStoreResult } from '../types/store';
import axiosInstance from '../config/axios';

export const getStores = async (): Promise<Store[]> => {
  try {
    const response = await axiosInstance.get('/stores');
    return response.data;
  } catch (error) {
    console.error('خطأ في جلب المتاجر:', error);
    throw error;
  }
};

export const getStoreItems = async (): Promise<StoreItem[]> => {
  try {
    const response = await axiosInstance.get('/store_items');
    return response.data;
  } catch (error) {
    console.error('خطأ في جلب عناصر المتجر:', error);
    throw error;
  }
};

export const getBestMatch = async (
  lat: number, lng: number, items: string[], searchRadius: number
): Promise<BestStoreResult> => {
  try {
    const response = await axiosInstance.post('/best-match', {
      lat,
      lng,
      items,
      searchRadius
    });
    return response.data;
  } catch (error) {
    console.error('خطأ في العثور على أفضل تطابق:', error);
    throw error;
  }
};