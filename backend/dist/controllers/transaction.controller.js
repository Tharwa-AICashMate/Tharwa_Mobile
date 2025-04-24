"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTransaction = exports.getTransactions = void 0;
// import { Request, Response } from 'express';
const transactionService = __importStar(require("../services/transaction.service.js"));
const getTransactions = async (req, res) => {
    try {
        const userId = req.params.userId;
        const transactions = await transactionService.getAllTransactions(userId);
        res.json(transactions);
    }
    catch (err) {
        res.status(500).json({
            message: 'Error fetching transactions',
            error: err.message
        });
    }
};
exports.getTransactions = getTransactions;
const addTransaction = async (req, res) => {
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
    }
    catch (err) {
        res.status(500).json({
            message: 'Error creating transaction',
            error: err.message
        });
    }
};
exports.addTransaction = addTransaction;
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
