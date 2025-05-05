// routes/deposit.routes.ts
import express from "express";
import { createDeposit, getDepositById, getDepositsByGoal, updateDeposit, deleteDeposit } from '../controllers/depositController.js';
const router = express.Router();
// Define routes for Deposit CRUD operations
router.post('/', createDeposit);
router.get('/:id', getDepositById);
router.get('/goal/:goalId', getDepositsByGoal);
router.put('/:id', updateDeposit);
router.delete('/:id', deleteDeposit);
export default router;
