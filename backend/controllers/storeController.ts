
import { Request, Response } from "express";
import { getStores, getStoreItems } from "../services/storeService";
import { getDrivingDistance } from "../services/distanceService";
import { calculateHaversineDistance } from "../utils/haversine";
import { supabase } from '../utils/supabaseClient';
import { Store } from "../types";

import { getDistance } from '../utils/distanceutils';

export const getAllStores = async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('stores').select('*');
  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
};

export const getAllStoreItems = async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('store_items').select('*');
  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
};
// export const findBestStore = async (req: Request, res: Response) => {
//   try {
//     const { lat, lng, items: rawItems, radius = 100 } = req.body;

//     if (!lat || !lng || !rawItems || !Array.isArray(rawItems)) {
//       return res.status(400).json({ message: "the data is not compelete" });
//     }

//     const items = rawItems.map((item: string) => item.toLowerCase());

//     const stores = await getStores();
//     const storeItems = await getStoreItems();

//     const itemMap = new Map<number, any[]>();
//     storeItems.forEach((item) => {
//       const storeId = item.store_id;
//       if (!itemMap.has(storeId)) itemMap.set(storeId, []);
//       itemMap.get(storeId)?.push(item);
//     });

//     const eligibleStores = [];

//     for (const store of stores) {
//       let distance: number;

//       try {
//         distance = await getDrivingDistance(
//           [lng, lat],
//           [store.lng, store.lat]
//         );
//       } catch {
//         distance = calculateHaversineDistance(lat, lng, store.lat, store.lng);
//       }

//       if (distance > radius) continue;

//       const storeAvailableItems = itemMap.get(Number(store.id)) || [];

//       const matchedItems = storeAvailableItems.filter((item) =>
//         items.includes(item.item_name.toLowerCase())
//       );

//       if (matchedItems.length === items.length) {
//         const totalPrice = matchedItems.reduce((sum, item) => sum + item.price, 0);
//         eligibleStores.push({
//           store,
//           distance,
//           totalPrice,
//           matchedItems,
//         });
//       }
//     }

//     if (eligibleStores.length === 0) {
//       return res.status(404).json({ message: "لا توجد متاجر مطابقة" });
//     }

//     const bestStore = eligibleStores.reduce((prev, current) => {
//       const prevScore = prev.totalPrice * 0.7 + prev.distance * 0.3;
//       const currentScore = current.totalPrice * 0.7 + current.distance * 0.3;
//       return currentScore < prevScore ? current : prev;
//     });

//     res.json(bestStore);
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : "حدث خطأ غير معروف";
//     res.status(500).json({ error: errorMessage });
//   }
// };

export const findBestStore = async (req: Request, res: Response) => {
  try {
    const { lat, lng, items } = req.body;
    
    if (!lat || !lng || !items) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // جلب جميع المتاجر والعناصر
    const [storesResult, itemsResult] = await Promise.all([
      supabase.from('stores').select('*'),
      supabase.from('store_items').select('*')
    ]);

    if (storesResult.error || itemsResult.error) {
      console.error('Supabase error:', storesResult.error || itemsResult.error);
      return res.status(500).json({ error: 'Database error' });
    }

    const stores = storesResult.data;
    const allItems = itemsResult.data;

    // حساب المسافات بشكل متوازي
    const storesWithDistance = await Promise.all(
      stores.map(async store => ({
        ...store,
        distance: await getDistance(
          { lat, lng },
          { lat: store.latitude, lng: store.longitude }
        )
      }))
    );

    // تصفية المتاجر التي تحتوي على جميع العناصر المطلوبة
    const validStores = storesWithDistance.filter(store => {
      const storeItems = allItems.filter(item => item.store_id === store.id);
      return items.every(function (itemName: string) {
        return storeItems.some(storeItem => storeItem.item_name.toLowerCase().includes(itemName.toLowerCase())
        );
      });
    });

    if (validStores.length === 0) {
      return res.status(404).json({ error: 'No matching stores found' });
    }

    const bestStore = validStores.reduce((prev, current) => {
      const currentItems = allItems.filter(
        item => item.store_id === current.id && 
        items.some((i: string) => item.item_name.toLowerCase().includes(i.toLowerCase()))
      );
      
      const prevItems = allItems.filter(
        item => item.store_id === prev.id && 
        items.some((i: string) => item.item_name.toLowerCase().includes(i.toLowerCase()))
      );

      const currentTotal = currentItems.reduce((sum, item) => sum + item.price, 0);
      const prevTotal = prevItems.reduce((sum, item) => sum + item.price, 0);

      const currentScore = (currentTotal * 0.7) + (current.distance * 0.3);
      const prevScore = (prevTotal * 0.7) + (prev.distance * 0.3);

      return currentScore < prevScore ? current : prev;
    });

    const resultItems = allItems.filter(
      item => item.store_id === bestStore.id && 
      items.some((i: string) => item.item_name.toLowerCase().includes(i.toLowerCase()))
    );

    res.json({
      store: bestStore,
      totalPrice: resultItems.reduce((sum, item) => sum + item.price, 0),
      distance: bestStore.distance,
      matchedItems: resultItems,
      score: (resultItems.reduce((sum, item) => sum + item.price, 0) * 0.7 + bestStore.distance * 0.3)
    });

  } catch (error) {
    console.error('Error in findBestStore:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};