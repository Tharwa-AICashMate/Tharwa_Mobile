import { Request, Response } from "express";
import { getStores, getStoreItems } from "../services/storeService";
import { getDrivingDistance } from "../services/distanceService";
import { calculateHaversineDistance } from "../utils/haversine";
import { supabase } from "../utils/supabaseClient";
import { Store } from "../types";

import { getDistance } from "../utils/distanceUtils";
import { getStoreFromUrl } from "../services/StoreByLocationLinkService";

export const getAllStores = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const { data, error } = await supabase.rpc("get_stores_with_favourite", {
    user_uuid: userId,
  });
  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
};

export const getAllStoreItems = async (req: Request, res: Response) => {
  const { data, error } = await supabase.from("store_items").select("*");
  if (error) return res.status(500).json({ error: error.message });
  return res.json(data);
};

export const resolveLocationFromUrl = async (req: Request, res: Response) => {
  const { url } = req.body;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'url' in request body." });
  }

  try {
    const locations = await getStoreFromUrl(url);

    if (!locations || locations.length === 0) {
      return res.status(404).json({ message: "No location data found for the provided URL." });
    }

    return res.status(200).json({ locations });
  } catch (error: any) {
    console.error("Controller error:", error.message);
    return res.status(500).json({ error: "Failed to resolve location from URL." });
  }
}
export const findBestStore = async (req: Request, res: Response) => {
  try {
    const { lat, lng, items, radius = 10000, unit = "m" } = req.body;

    if (!lat || !lng || !items || !Array.isArray(items)) {
      return res.status(400).json({ error: "Missing or invalid parameters" });
    }

    // 1. Get nearby stores
    const { data: nearbyStores, error: nearbyError } = await supabase.rpc(
      "find_stores_nearby",
      {
        user_lat: lat,
        user_lon: lng,
        radius,
        unit,
      }
    );

    if (nearbyError) {
      console.error("Error fetching nearby stores:", nearbyError);
      return res.status(500).json({ error: "Failed to fetch nearby stores" });
    }

    if (!nearbyStores || nearbyStores.length === 0) {
      return res.status(404).json({ error: "No stores found within radius" });
    }

    const storeIds = nearbyStores.map((store:any) => store.id);

    // 2. Get transactions (items) for those stores
    const { data: storeItems, error: itemsError } = await supabase
      .from("transaction_with_category_and_store")
      .select("transaction_id, store_id, title, amount, description, details")
      .in("store_id", storeIds);

    if (itemsError) {
      console.error("Error fetching store items:", itemsError);
      return res.status(500).json({ error: "Failed to fetch store items" });
    }
    console.log("startStore");

    const normalize = (str: string) => str?.toLowerCase().trim();

    const matchesSearch = (transaction: any, searchTerm: string) => {
      const normalizedSearch = normalize(searchTerm);
      const titleMatch = normalize(transaction.title)?.includes(
        normalizedSearch
      );
      const descriptionMatch = normalize(transaction.description)?.includes(
        normalizedSearch
      );

      let detailsMatch = false;
      try {
        const details = JSON.parse(transaction.details || "[]");
        if (Array.isArray(details)) {
          detailsMatch = details.some((d: any) =>
            normalize(d.name)?.includes(normalizedSearch)
          );
        }
      } catch (error) {
        console.log(error);
      }

      return titleMatch || descriptionMatch || detailsMatch;
    };
    console.log("matchStore");

    // 3. Filter stores that have all required items
    const validStores = nearbyStores.filter((store:any) => {
      const transactions = storeItems.filter(
        (item) => item.store_id === store.id
      );
      return items.every((item) =>
        transactions.some((tx) => matchesSearch(tx, item))
      );
    });

    console.log("validStore");

    if (validStores.length === 0) {
      return res
        .status(404)
        .json({ error: "No stores match all requested items" });
    }

    // 4. Score and sort valid stores
    const scoredStores = validStores.map((store:any) => {
      const matchedItems = storeItems.filter(
        (tx) =>
          tx.store_id === store.id &&
          items.some((item) => matchesSearch(tx, item))
      );

      const totalPrice = matchedItems.reduce(
        (sum, item) => sum + item.amount,
        0
      );
      const score = totalPrice * 0.6 + store.distance * 0.4;

      return {
        store: {
          id: store.id,
          latitude: store.latitude,
          longitude: store.longitude,
          name: store.name,
          city: store.city,
          country: store.country,
        },
        distance: store.distance,
        matchedItems,
        totalPrice,
        score,
      };
    });

    const topStores = scoredStores
      .sort((a:any, b:any) => b.score - a.score)
      .slice(0, 3)
      .map((entry:any) => ({
        store: {
          id: entry.store.id,
          name: entry.store.name,
          latitude: entry.store.latitude,
          longitude: entry.store.longitude,
        },
        totalPrice: entry.totalPrice.toFixed(2),
        distance: (entry.distance/1000).toFixed(2),
      }));
      
    res.json(topStores);
  } catch (error) {
    console.log("Error in findBestStores:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
