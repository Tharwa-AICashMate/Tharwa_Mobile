import * as transactionController from '../controllers/transaction.controller.js';

import express from "express";
const router = express.Router();


router.get('/:userId', transactionController.getTransactions as any);

router.post('/', transactionController.addTransaction as any);

export default router;



// import { TransactionController } from '../controllers/transaction.controller.js';

// import express from "express";
// const router = express.Router();

// router.get('/', TransactionController.getAllTransactions);
// router.get('/category/:categoryId', TransactionController.getByCategory as any);
// router.get('/type/:type', TransactionController.getByType as any);
// router.post('/', TransactionController.create as any);

// export default router;