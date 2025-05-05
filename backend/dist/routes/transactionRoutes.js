import * as transactionController from '../controllers/transaction.controller.js';
import express from "express";
const router = express.Router();
router.get('/:userId', transactionController.getTransactions);
router.delete('/:transactionId', transactionController.deleteTransaction);
router.put('/:transactionId', transactionController.editTransaction);
router.post('/', transactionController.addTransaction);
router.get("/:userId/category/:categoryId", transactionController.getTransactionsByCategory);
export default router;
