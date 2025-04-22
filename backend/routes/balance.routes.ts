import { Router, RequestHandler } from 'express';
import {
  getAllBalances,
  getBalanceByUserId,
  deleteBalanceByUserId,
  createNewBalance,
  updateBalanceByUserId,
} from '../controllers/balance.controller.js';

const router = Router();

router.get('/balances', getAllBalances as RequestHandler);
router.get('/balances/user/:user_id', getBalanceByUserId as RequestHandler);
router.post('/balances', createNewBalance as RequestHandler);
router.put('/balances/user/:user_id', updateBalanceByUserId as RequestHandler);
router.delete('/balances/user/:user_id', deleteBalanceByUserId as RequestHandler);

export default router;
