import { Router } from 'express';
import { getUserFinance } from '../controllers/finananceController';

const router = Router();

router.get('/:userId', getUserFinance as any);

export default router;
