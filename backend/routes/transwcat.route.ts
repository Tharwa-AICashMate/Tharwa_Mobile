
import { TranswcatController } from '../controllers/transwcat.controller.js';
import { Router, RequestHandler } from 'express';

const router = Router();


router.get('/weekly-amounts/:id/', TranswcatController.getWeeklyAmounts  as RequestHandler);
router.get('/monthly-amounts/:id/', TranswcatController.getMonthlyAmounts  as RequestHandler);
router.get('/yearly-amounts/:id', TranswcatController.getYearlyAmounts as RequestHandler);

// Routes for expense amounts
router.get('/weekly-expense-amounts/:id', TranswcatController.getWeeklyExpenseAmounts as RequestHandler);
router.get('/monthly-expense-amounts/:id', TranswcatController.getMonthlyExpenseAmounts as RequestHandler);
router.get('/yearly-expense-amounts/:id', TranswcatController.getYearlyExpenseAmounts as RequestHandler);


export default router;
