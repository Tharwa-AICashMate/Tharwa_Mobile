import { Request, Response } from 'express';
import { TranswcatService } from '../services/transwcat.service';
export class TranswcatController {
    static async getWeeklyAmounts(req: Request, res: Response) {
        try {
            const userId = req.params.id;

            if (!userId) {
                return res.status(400).json({ message: 'user_id is required' });
            }

            const weeklyAmounts = await TranswcatService.getWeeklyAmounts(userId);
            res.json({ weeklyAmounts });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching weekly amounts' });
        }
    }

    static async getMonthlyAmounts(req: Request, res: Response) {
        try {
            const userId = req.params.id;

            if (!userId) {
                return res.status(400).json({ message: 'user_id is required' });
            }

            const monthlyAmounts = await TranswcatService.getMonthlyAmounts(userId);
            res.json({ monthlyAmounts });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching monthly amounts' });
        }
    }


    //year
    static async getYearlyAmounts(req: Request, res: Response) {
        try {
            const userId = req.params.id;
    
            if (!userId) {
                return res.status(400).json({ message: 'user_id is required' });
            }
    
            const yearlyAmounts = await TranswcatService.getYearlyAmounts(userId);
            res.json({ yearlyAmounts }); // <--- No change needed
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching yearly amounts' });
        }
    }
    


    //for expence
    static async getWeeklyExpenseAmounts(req: Request, res: Response) {
        try {
            const userId = req.params.id;

            if (!userId) {
                return res.status(400).json({ message: 'user_id is required' });
            }

            const weeklyAmounts = await TranswcatService.getWeeklyExpenseAmounts(userId);
            res.json({ weeklyAmounts });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching weekly expense amounts' });
        }
    }

    // Monthly expense amounts
    static async getMonthlyExpenseAmounts(req: Request, res: Response) {
        try {
            const userId = req.params.id;

            if (!userId) {
                return res.status(400).json({ message: 'user_id is required' });
            }

            const monthlyAmounts = await TranswcatService.getMonthlyExpenseAmounts(userId);
            res.json({ monthlyAmounts });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching monthly expense amounts' });
        }
    }

    // Yearly expense amounts
    static async getYearlyExpenseAmounts(req: Request, res: Response) {
        try {
            const userId = req.params.id;
    
            if (!userId) {
                return res.status(400).json({ message: 'user_id is required' });
            }
    
            const yearlyAmounts = await TranswcatService.getYearlyExpenseAmounts(userId);
            res.json({ yearlyAmounts }); // <--- Return array as is
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching yearly expense amounts' });
        }
    }
    

}


