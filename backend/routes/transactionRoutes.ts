import * as transactionController from '../controllers/transaction.controller.js';

import express from "express";
const router = express.Router();






router.get('/:userId', transactionController.getTransactions as any);
router.delete('/:transactionId', transactionController.deleteTransaction as any);
router.put('/:transactionId', transactionController.editTransaction as any);

router.post('/', transactionController.addTransaction as any);
router.get("/:userId/category/:categoryId", transactionController.getTransactionsByCategory as any);

export default router;

