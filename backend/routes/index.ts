// src/routes/index.ts
import express from 'express';
import storeRoutes from './storeRoutes';
import itemRoutes from './itemRoutes';

const router = express.Router();

router.use('/stores', storeRoutes);
router.use('/items', itemRoutes);

// Health check endpoint
router.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

export default router;