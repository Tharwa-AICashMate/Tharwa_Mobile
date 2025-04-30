import { createAsyncThunk } from "@reduxjs/toolkit";
import { getStores, getStoreItems, getBestMatch, addStore as apiAddStore } from "../../api/storeapi";
import { RootState } from "../store";
import {
  Store,
  StoreItem,
  BestStoreResult,
  AnalysisPayload,
} from "../../types/store";

import axios from "axios";

import { API_ENDPOINTS } from "../../api/aiApi";
import { calculateDistance } from "@/utils/locationutils";
import axiosInstance from "@/config/axios";
export const fetchStores = createAsyncThunk<Store[], void>(
  'store/fetchStores',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/stores');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch stores');
    }
  }
);
export const addStore = createAsyncThunk(
  'store/addStore',
  async (payload: {
    name: string;
    latitude: number;
    longitude: number;
    city: string;
    country: string;
    userId: string;
  }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/stores', payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to add store');
    }
  }
);

export const fetchUserStores = createAsyncThunk(
  'store/fetchUserStores',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/stores?userId=${userId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch user stores');
    }
  }
);

export const removeUserStore = createAsyncThunk(
  'store/removeUserStore',
  async (storeId: string, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/user/stores/${storeId}`);
      return storeId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to remove store');
    }
  }
);


export const runAnalysis = createAsyncThunk(
  "store/runAnalysis",
  async (analysisData: AnalysisPayload, { rejectWithValue }) => {
    try {
      console.log("Running analysis with data:", analysisData);
      const response = await axios.post(API_ENDPOINTS.analyze, analysisData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Analysis response:", response);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response:", error.response);
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
export const findBestStore = createAsyncThunk<
  BestStoreResult,
  void,
  {
    state: RootState;
    rejectValue: string;
  }
>("store/findBestStore", async (_, { getState, rejectWithValue }) => {
  const { grocery, store } = getState();
  const { items } = grocery;
  const { userLocation, searchRadius } = store;

  if (!userLocation) {
    return rejectWithValue("User location not available");
  }
  if (items.length === 0) {
    return rejectWithValue("No items in grocery list");
  }

  try {
    const bestStore = await getBestMatch(
      userLocation.latitude,
      userLocation.longitude,
      items.map((item) => item.name),
      searchRadius
    ).catch((apiError) => {
      console.warn("API request failed, trying client calculation:", apiError);
      throw apiError;
    });

    return bestStore;
  } catch {
    try {
      const [stores, storeItems] = await Promise.all([
        getStores().catch(() => [] as Store[]),
        getStoreItems().catch(() => [] as StoreItem[]),
      ]);

      const storesWithDistance = await Promise.all(
        stores.map(async (store) => ({
          ...store,
          distance: await calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            store.latitude,
            store.longitude
          ),
        }))
      );

      const storesInRadius = storesWithDistance.filter(
        (store) => store.distance <= searchRadius
      );

      if (storesInRadius.length === 0) {
        return rejectWithValue(
          `No stores found within ${searchRadius} km radius`
        );
      }

      // البحث عن أفضل متجر
      const bestStore = storesInRadius.reduce(
        (prev, current) => {
          const currentItems = storeItems.filter(
            (item) =>
              item.store_id === current.id &&
              items.some(
                (groceryItem) =>
                  groceryItem.name.trim().toLowerCase() ===
                  item.item_name.trim().toLowerCase()
              )
          );

          if (currentItems.length !== items.length) return prev;

          const currentTotal = currentItems.reduce(
            (sum, item) => sum + item.price,
            0
          );
          const currentScore = currentTotal * 0.7 + current.distance * 0.3;

          if (!prev || currentScore < prev.score) {
            return {
              store: current,
              totalPrice: currentTotal,
              distance: current.distance,
              matchedItems: currentItems.map((item) => ({
                id: Number(item.id),
                store_id: Number(item.store_id),
                item_name: item.item_name,
                price: item.price,
              })),
              score: currentScore,
            };
          }
          return prev;
        },
        null as BestStoreResult | null
      );

      if (!bestStore) {
        return rejectWithValue("No store has all the requested items");
      }

      return bestStore;
    } catch (error) {
      console.error("Error in client-side calculation:", error);
      return rejectWithValue("Failed to find best store");
    }
  }
});
