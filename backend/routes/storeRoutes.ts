import { Router } from "express";
import {
  findBestStore,
  getAllStores,
  getAllStoreItems,
} from "../controllers/storeController";
import { supabase } from "../config/supabase.js";

const router = Router();

// router.post('/add', async (req, res) => {
//   const { name, latitude, longitude, city, country, userId } = req.body;

//   if (!name || !latitude || !longitude || !city || !country || !userId) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     const { data, error } = await supabase
//       .from('stores')
//       .insert([{
//         name,
//         latitude,
//         longitude,
//         city,
//         country,
//         added_by: userId
//       }])
//       .select();

//     if (error) throw error;

//     res.status(201).json({ message: 'Store added successfully', store: data[0] });
//   } catch (err) {
//     console.log('Error adding store:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// routes/storeRoutes.ts
// router.post('/stores', async (req, res) => {
//   const { name, latitude, longitude, city, country, userId } = req.body;

//   try {
//     const { data: newStore, error } = await supabase
//       .from('stores')
//       .insert([{
//         name,
//         latitude,
//         longitude,
//         city,
//         country,
//         added_by: userId
//       }])
//       .select()
//       .single();

//     if (error?.code === '23505') {
//       return res.status(400).json({
//         error: 'المتجر موجود بالفعل',
//         code: 'DUPLICATE_STORE'
//       });
//     }

//     if (error) throw error;

//     // إضافة العلاقة للمستخدم
//     const { error: relationError } = await supabase
//       .from('user_stores')
//       .insert({
//         user_id: userId,
//         store_id: newStore.id
//       });

//     if (relationError) throw relationError;

//     res.status(201).json(newStore);
//   } catch (error) {
//     console.log('Error:', error);
//     res.status(500).json({
//       error: 'فشل إضافة المتجر',
//       details: error.message
//     });
//   }
// });
// routes/storeRoutes.ts
// في ملف storeRoutes.ts
router.post("/stores", async (req, res) => {
  const { name, latitude, longitude, city, country, userId } = req.body;

  try {
    let newStore;

    const { data, error } = await supabase
      .from("stores")
      .insert({ name, latitude, longitude, city, country })
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        const { data: existingStore, error: fetchError } = await supabase
          .from("stores")
          .select("*")
          .eq("name", name)
          .eq("latitude", latitude)
          .eq("longitude", longitude)
          .single();

        if (fetchError) throw fetchError;
        newStore = existingStore;
      } else {
        throw error;
      }
    } else {
      newStore = data;
    }

    const { error: relationError } = await supabase.from("user_stores").insert({
      user_id: userId,
      store_id: newStore.id,
    });

    if (relationError) throw relationError;

    res.status(201).json(newStore);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      error: "Failed to add store",
      details: error.message,
    });
  }
});

router.get("/user/stores/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const { data, error } = await supabase
      .from("user_stores")
      .select(
        `
        store:stores(
          id,
          name,
          latitude,
          longitude,
          city,
          country
        )
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw error;

    const stores = data.map((item) => ({
      id: item.store.id,
      name: item.store.name,
      latitude: item.store.latitude,
      longitude: item.store.longitude,
      city: item.store.city,
      country: item.store.country,
    }));
    res.json(stores);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json([]);
  }
});

router.delete("/user/stores/:userId/:storeId", async (req, res) => {
  const { userId, storeId } = req.params;
  console.log(`Deleting store ${storeId} for user ${userId}`);

  try {
    const { error } = await supabase
      .from("user_stores")
      .delete()
      .match({ user_id: userId, store_id: storeId });
    console.log(error);
    if (error) throw error;

    res
      .status(200)
      .json({ message: "Store association deleted successfully." });
  } catch (error) {
    console.log("Error deleting store:", error);
    res.status(500).json({ error: "Failed to delete store association." });
  }
});

router.get("/stores/:userId", getAllStores);

router.get("/store_items", getAllStoreItems);
router.post("/best-match", findBestStore);

export default router;
