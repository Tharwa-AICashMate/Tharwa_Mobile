import express from 'express';
import { getIncome, updateIncome ,createIncome } from '../controllers/income.controller.js';

const router = express.Router();

router.get('/income/:user_id', getIncome);
router.put('/income/:user_id', updateIncome);
router.post('/income/:user_id', createIncome);

export default router;