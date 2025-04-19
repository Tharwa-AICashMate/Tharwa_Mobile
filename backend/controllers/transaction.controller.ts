
import { Request, Response } from 'express';
import * as transactionService from '../services/transaction.service';

export const getTransactions = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  try {
    const transactions = await transactionService.getAllTransactions(userId);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions', error: err });
  }
};

export const addTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = req.body;
    const result = await transactionService.createTransaction(transaction);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error adding transaction', error: err });
  }
};
