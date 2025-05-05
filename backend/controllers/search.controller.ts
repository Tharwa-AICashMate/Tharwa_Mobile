
import { Request, Response } from 'express';
import { searchService } from '../services/search.service.js';

export const searchController = {
  async searchTransactions(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const { title, category_name, start_date, end_date, type } = req.query;
      
      console.log('Search params:', { 
        user_id, 
        title: title?.toString() || undefined, 
        category_name: category_name?.toString() || undefined,
        start_date: start_date?.toString() || undefined, 
        end_date: end_date?.toString() || undefined, 
        type: type?.toString() || undefined 
      });

      const transactions = await searchService.getFilteredTransactions({
        user_id,
        title: title?.toString(),
        category_name: category_name?.toString(),
        start_date: start_date?.toString(),
        end_date: end_date?.toString(),
        type: type?.toString(),
      });

      res.json(transactions);
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};