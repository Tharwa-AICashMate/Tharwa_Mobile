import express from 'express';
import { processReceipt } from '../controllers/invoiceController.js';

const router = express.Router();

router.post('/process-receipt', processReceipt as any);

export default router;
