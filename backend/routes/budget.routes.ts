import { Router } from 'express';
import { getAllBudgets, getBudgetById ,deleteBudgetById ,createNewBudget, updateBudget} from '../controllers/budget.controller.js';

const router = Router();

router.get('/budgets', getAllBudgets);
router.get('/budgets/:id', getBudgetById);
router.post('/budgets',createNewBudget)
router.put('/budgets/:id', updateBudget);
router.delete('/budget/:id',deleteBudgetById);
export default router;
