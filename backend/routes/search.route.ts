import { Router } from 'express';
import { searchController } from '../controllers/search.controller.js';

const router = Router();

router.get('/search/:user_id', searchController.searchTransactions);

export default router;

