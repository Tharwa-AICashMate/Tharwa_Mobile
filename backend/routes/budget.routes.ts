import { Router, RequestHandler } from 'express';
import { getAllBudgets, getBudgetById ,deleteBudgetById ,createNewBudget, updateBudget} from '../controllers/budget.controller.js';

const router = Router();

router.get('/budgets', getAllBudgets as RequestHandler);
router.get('/budgets/:id', getBudgetById as RequestHandler);
router.post('/budgets', createNewBudget as RequestHandler);
router.put('/budgets/:id', updateBudget as RequestHandler);
router.delete('/budget/:id', deleteBudgetById as RequestHandler);
export default router;
