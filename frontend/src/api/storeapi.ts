
import { Store, StoreItem, BestStoreResult } from '../types/store';
import axiosInstance from '../config/axios';
import axios from 'axios';
import { apiBase } from '@/utils/axiosInstance';

export const getStores = async (): Promise<Store[]> => {
  try {
    const response = await axiosInstance.get('/stores');
    return response.data;
  } catch (error) {
    console.log('ererr in fetch store ', error);
    throw error;
  }
};

export const getStoreItems = async (): Promise<StoreItem[]> => {
  try {
    const response = await axiosInstance.get('/store_items');
    return response.data;
  } catch (error) {
    console.log('ererr in fetch store items', error);
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
    //console.log('fun2',response.data)
    return response.data;
  } catch (error) {
    console.log('ererr in fetch best store', error);
    throw error;
  }
};
export const getBestMatchAi = async (
  lat: number, lng: number, items: string[], searchRadius: number,userId:string
): Promise<BestStoreResult[]> => {
 
  try {
    const response = await axios.post(`${apiBase}/ai/find`, {
      userId,
      lat,
      lng,
      items,
      searchRadius
    });
    return response.data.data;
  } catch (error) {
    console.log('ererr in fetch best store', error);
    throw error;
  }
};

export const addStore = async (
  name: string,
  latitude: number,
  longitude: number,
  city: string,
  country: string,
  userId: string
): Promise<Store> => {
  try {
      const response = await axiosInstance.post('/stores', {
          name,
          latitude,
          longitude,
          city,
          country,
          userId
      });
      return response.data 
  } catch (error: any) {
      console.log('Error adding store:', error);
      throw error;
  }
};


export const fetchUserStores = async (userId: string): Promise<Store[]> => {
  try {
    const response = await axiosInstance.get(`/user/stores?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.log('Error fetching user stores:', error);
    throw error;
  }
};

export const removeUserStore = async (storeId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/user/stores/${storeId}`);
  } catch (error) {
    console.log('Error removing store:', error);
    throw error;
  }
};

export const getLocationSuggestions = async (url: string): Promise<any> => {
  try {
    console.log(url)
     const response = await axiosInstance.post(`/stores/url`, {url} );
 
     console.log( response.data )
     return response.data;
   } catch (error) {
     console.log('Error fetching location suggestions', error);
     throw error;
   }
 };