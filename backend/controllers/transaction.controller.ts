// import { Request, Response } from 'express';
import * as transactionService from '../services/transaction.service.js';

import { Request, Response } from 'express';



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
// import { TransactionService } from '../services/transaction.service.js';


// export class TransactionController {
//   static async getAllTransactions(req: Request, res: Response) {
//     try {
//       const transactions = await TransactionService.getAllTransactions();
//       res.json(transactions);
//     } catch (error:any) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   static async getByCategory(req: Request, res: Response) {
//     try {
//       const categoryId = parseInt(req.params.categoryId);
//       if (isNaN(categoryId)) {
//         return res.status(400).json({ error: 'Invalid category ID' });
//       }
//       const transactions = await TransactionService.getTransactionsByCategory(categoryId);
//       res.json(transactions);
//     } catch (error:any) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   static async getByType(req: Request, res: Response) {
//     try {
//       const type = req.params.type as 'income' | 'expence';
//       if (!['income', 'expence'].includes(type)) {
//         return res.status(400).json({ error: 'Invalid transaction type' });
//       }
//       const transactions = await TransactionService.getTransactionsByType(type);
//       res.json(transactions);
//     } catch (error:any) {
//       res.status(500).json({ error: error.message });
//     }
//   }

//   static async create(req: Request, res: Response) {
//     try {
//       const { category_id, amount, title, type, description } = req.body;
      
//       // Validate required fields
//       if (!category_id || !amount || !title || !type) {
//         return res.status(400).json({ error: 'Missing required fields' });
//       }

//       const transaction = await TransactionService.createTransaction({
//         category_id,
//         amount,
//         title,
//         type,
//         description
//       });
//       res.status(201).json(transaction);
//     } catch (error:any) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// }






