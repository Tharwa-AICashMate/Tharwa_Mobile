import { Request, Response } from 'express';
import { getFinanceSummary } from '../services/finanaceService.js';

export const getUserFinance = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  if (!userId) return res.status(400).json({ error: 'User ID required' });

  try {
    const data = await getFinanceSummary(userId);
    res.json({ ...data });
  } catch (error: any) {
    console.log('Finance summary error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
