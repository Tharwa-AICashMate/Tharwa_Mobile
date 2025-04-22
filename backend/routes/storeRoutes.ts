import { Router } from 'express';
import { findBestStore, getAllStores, getAllStoreItems } from '../controllers/storeController';
import { supabase } from '../utils/supabaseClient';

const router = Router();

router.post('/add', async (req, res) => {
  const { name, latitude, longitude, city, country } = req.body;

  if (!name || !latitude || !longitude || !city || !country) {
    return res.status(400).json({ error: 'Missing fields in request body' });
  }

  try {
    const { data, error } = await supabase
      .from('stores')
      .insert([{ name, latitude, longitude, city, country }])
      .select();

    if (error) {
      console.error('Supabase Insert Error:', error);
      return res.status(500).json({ error: 'Failed to add store' });
    }

    res.status(201).json({ message: 'Store added successfully', store: data });
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/stores', getAllStores);

router.get('/store_items', getAllStoreItems);
router.post('/best-match', findBestStore);

export default router;
