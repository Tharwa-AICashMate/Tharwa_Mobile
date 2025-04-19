import { Request, Response } from 'express';
import * as transactionService from '../services/transaction.service';

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const transactions = await transactionService.getAllTransactions(userId);
    res.json(transactions);
  } catch (err: any) {
    res.status(500).json({ 
      message: 'Error fetching transactions',
      error: err.message 
    });
  }
};
export const addTransaction = async (req: Request, res: Response) => {
  try {
    const { user_id, category_id, amount, type, title } = req.body;
    
    if (!user_id || !category_id || !amount || !type || !title) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newTransaction = await transactionService.createTransaction({
      user_id,
      category_id,
      amount,
      type,
      title
    });

    res.status(201).json(newTransaction);
  } catch (err: any) {
    res.status(500).json({ 
      message: 'Error creating transaction',
      error: err.message 
    });
  }
};