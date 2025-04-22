
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
import axios from 'axios';
import { Store, StoreItem, BestStoreResult } from '../types/store';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
      throw new Error('Request timeout');
    }
    if (!error.response) {
      console.error('Network error');
      throw new Error('Network error');
    }
    throw error;
  }
);

export const getStores = async (): Promise<Store[]> => {
  try {
    const response = await apiClient.get('/stores');
    return response.data;
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
};

export const getStoreItems = async (): Promise<StoreItem[]> => {
  try {
    const response = await apiClient.get('/store_items');
    return response.data;
  } catch (error) {
    console.error('Error fetching store items:', error);
    throw error;
  }
};

export const getBestMatch = async (
  lat: number, lng: number, items: string[], searchRadius: number
): Promise<BestStoreResult> => {
  try {
    const response = await apiClient.post('/best-match', {
      lat,
      lng,
      items,
      radius: searchRadius
    });
    return response.data;
  } catch (error) {
    console.error('Error finding best match:', error);
    throw error;
  }
};