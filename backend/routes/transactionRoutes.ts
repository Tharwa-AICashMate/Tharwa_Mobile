
import { Router } from 'express';
import * as transactionController from '../controllers/transaction.controller';

const router = Router();

router.get('/:userId', transactionController.getTransactions);

router.post('/', transactionController.addTransaction);

export default router;