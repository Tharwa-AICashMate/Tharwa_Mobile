import { createAsyncThunk } from '@reduxjs/toolkit';
import { getStores, getStoreItems, getBestMatch } from '../../api/storeapi';
import { RootState } from '../store';
import { Store, StoreItem, BestStoreResult } from '../../types/store';
import { calculateDistance, isWithinSearchRadius } from '../../utils/locationutils';

// export const findBestStore = createAsyncThunk<BestStoreResult, void, {
//   state: RootState;
//   rejectValue: string;
// }>(
//   'store/findBestStore',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const { grocery, store } = getState();
//       const { items } = grocery;
//       const { userLocation, searchRadius } = store;

//       // التحقق من البيانات الأساسية
//       if (!userLocation) {
//         return rejectWithValue('User location not available');
//       }
//       if (items.length === 0) {
//         return rejectWithValue('No items in grocery list');
//       }

//       // محاولة استخدام API الباكند أولاً
//       try {
//         const bestStore = await getBestMatch(
//           userLocation.latitude,
//           userLocation.longitude,
//           items.map(item => item.name),
//           searchRadius 
//         );
        
//         if (bestStore) {
//           console.log('Best store found via API:', bestStore);
//           return bestStore;
//         }
//       } catch (apiError) {
//         console.warn('API search failed, falling back to client calculation:', apiError);
//       }

//       // إذا فشل اتصال API نستخدم الحساب المحلي
//       console.log('Falling back to client-side calculation...');
      
//       const [stores, storeItems] = await Promise.all([
//         getStores(),
//         getStoreItems()
//       ]);

//       console.log('All stores:', stores);
//       console.log('All store items:', storeItems);

//       // تصفية المتاجر في نطاق البحث
//       const storesInRadius: Store[] = [];
//       for (const store of stores) {
//         const withinRadius = await isWithinSearchRadius(
//           store.latitude,
//           store.longitude,
//           userLocation.latitude,
//           userLocation.longitude,
//           searchRadius
//         );
//         if (withinRadius) {
//           storesInRadius.push(store);
//         }
//       }

//       console.log(`Stores within ${searchRadius}km:`, storesInRadius.length);

//       if (storesInRadius.length === 0) {
//         return rejectWithValue(`No stores found within ${searchRadius} km radius`);
//       }

//       let bestStore: BestStoreResult | null = null;
//       let lowestScore = Infinity;

//       for (const store of storesInRadius) {
//         const distance = await calculateDistance(
//           userLocation.latitude,
//           userLocation.longitude,
//           store.latitude,
//           store.longitude
//         );

//         // تصفية العناصر المتاحة في المتجر
//         const availableItems = storeItems.filter(item => 
//           item.store_id === store.id && 
//           items.some(groceryItem => 
//             groceryItem.name.trim().toLowerCase() === item.item_name.trim().toLowerCase()
//           )
//         );

//         console.log(`Store ${store.name} has ${availableItems.length} matching items`);

//         if (availableItems.length !== items.length) {
//           continue;
//         }

//         const totalPrice = availableItems.reduce((sum, item) => sum + item.price, 0);
        
//         const score = (totalPrice * 0.7) + (distance * 0.3);

//         if (score < lowestScore) {
//           lowestScore = score;
//           bestStore = {
//             store,
//             totalPrice,
//             distance: parseFloat(distance.toFixed(2)),
//             matchedItems: availableItems.map(item => ({
//               id: Number(item.id),
//               store_id: Number(item.store_id),
//               item_name: item.item_name,
//               price: item.price
//             })),
//             score: parseFloat(score.toFixed(2))
//           };
//         }
//       }

//       if (!bestStore) {
//         return rejectWithValue('No store has all the requested items');
//       }

//       console.log('Best store found:', bestStore);
//       return bestStore;

//     } catch (error) {
//       console.error('Error in findBestStore:', error);
//       return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
//     }
//   }
// );
// في storeThunk.ts
export const findBestStore = createAsyncThunk<BestStoreResult, void, {
  state: RootState;
  rejectValue: string;
}>(
  'store/findBestStore',
  async (_, { getState, rejectWithValue }) => {
    const { grocery, store } = getState();
    const { items } = grocery;
    const { userLocation, searchRadius } = store;

    if (!userLocation) {
      return rejectWithValue('User location not available');
    }
    if (items.length === 0) {
      return rejectWithValue('No items in grocery list');
    }

    try {
      // محاولة الاتصال بالباكند أولاً
      const bestStore = await getBestMatch(
        userLocation.latitude,
        userLocation.longitude,
        items.map(item => item.name),
        searchRadius
      ).catch(apiError => {
        console.warn('API request failed, trying client calculation:', apiError);
        throw apiError; // سيتم التعامل معها في catch التالي
      });

      return bestStore;
    } catch {
      // إذا فشل اتصال API نستخدم الحساب المحلي
      try {
        const [stores, storeItems] = await Promise.all([
          getStores().catch(() => [] as Store[]),
          getStoreItems().catch(() => [] as StoreItem[])
        ]);

        // حساب المسافات بشكل متوازي
        const storesWithDistance = await Promise.all(
          stores.map(async store => ({
            ...store,
            distance: await calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              store.latitude,
              store.longitude
            )
          }))
        );

        // تصفية المتاجر في نطاق البحث
        const storesInRadius = storesWithDistance.filter(
          store => store.distance <= searchRadius
        );

        if (storesInRadius.length === 0) {
          return rejectWithValue(`No stores found within ${searchRadius} km radius`);
        }

        // البحث عن أفضل متجر
        const bestStore = storesInRadius.reduce((prev, current) => {
          const currentItems = storeItems.filter(
            item => item.store_id=== current.id && 
            items.some(groceryItem => 
              groceryItem.name.trim().toLowerCase() === item.item_name.trim().toLowerCase()
            )
          );

          if (currentItems.length !== items.length) return prev;

          const currentTotal = currentItems.reduce((sum, item) => sum + item.price, 0);
          const currentScore = (currentTotal * 0.7) + (current.distance * 0.3);

          if (!prev || currentScore < prev.score) {
            return {
              store: current,
              totalPrice: currentTotal,
              distance: current.distance,
              matchedItems: currentItems.map(item => ({
                id: Number(item.id),
                store_id: Number(item.store_id),
                item_name: item.item_name,
                price: item.price
              })),
              score: currentScore
            };
          }
          return prev;
        }, null as BestStoreResult | null);

        if (!bestStore) {
          return rejectWithValue('No store has all the requested items');
        }

        return bestStore;
      } catch (error) {
        console.error('Error in client-side calculation:', error);
        return rejectWithValue('Failed to find best store');
      }
    }
  }
);
