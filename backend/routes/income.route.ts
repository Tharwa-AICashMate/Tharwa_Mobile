import express from 'express';
import { getIncome, updateIncome ,createIncome } from '../controllers/income.controller.js';

const router = express.Router();

router.get('/income/:user_id', getIncome as any);
router.put('/income/:user_id', updateIncome as any);
router.post('/income/:user_id', createIncome as any);

export default router;