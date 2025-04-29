import { Request, Response } from 'express';
import { searchService } from '../services/search.service';

export const searchController = {
  async searchTransactions(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const { title, category_name, created_at, type } = req.query;

      const transactions = await searchService.getFilteredTransactions({
        user_id,
        title: title?.toString(),
        category_name: category_name?.toString(),
        created_at: created_at?.toString(),
        type: type?.toString(),
      });

      res.json(transactions);
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
