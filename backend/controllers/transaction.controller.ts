// import { Request, Response } from 'express';
import * as transactionService from '../services/transaction.service.js';

import { Request, Response } from 'express';



export const getTransactions = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const page = parseInt(req.query.page as string) || 1;
    const transactions = await transactionService.getAllTransactions(userId,page);
    console.log(transactions)
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
    
    const { category_id,user_id, amount, type, title ,created_at,details} = req.body;
    
    if ((type == 'income' && !user_id ) || (type == 'expense' && !category_id) || !amount || !type || !title ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    
    const newTransaction = await transactionService.createTransaction({
      user_id,
      created_at,
      category_id,
      amount,
      type,
      title,
      details,
      
  
    });

    res.status(201).json(newTransaction);
  } catch (err: any) {
    res.status(500).json({ 
      message: 'Error creating transaction',
      error: err.message 
    });
  }
};


export const getTransactionsByCategory = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const categoryId = Number(req.params.categoryId);
    const page = parseInt(req.query.page as string) || 1;
    
    const transactions = await transactionService.getTransactionsByCategory(userId, categoryId, page);
    res.json(transactions);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const editTransaction = async (req: Request, res: Response) => {
  try {
    
    const { category_id, amount, type, title ,created_at} = req.body;
    const id = req.params.transactionId;
    
    if ((type == 'expense' && !category_id)|| !amount || !type || !title) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const newTransaction = await transactionService.editTransaction({
      created_at,
      category_id,
      amount,
      type,
      title,
      id
    });
    console.log(req.body);

    res.status(201).json(newTransaction);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ 
      message: 'Error creating transaction',
      error: err.message 
    });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const transactionId = req.params.transactionId;
    
    await transactionService.deleteTransaction(transactionId);

    res.status(201).json('deleted sucessesfully');
  } catch (err: any) {
    res.status(500).json({ 
      message: 'Error deleting transaction',
      error: err.message 
    });
  }
};