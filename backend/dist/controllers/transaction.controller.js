// import { Request, Response } from 'express';
import * as transactionService from '../services/transaction.service.js';
export const getTransactions = async (req, res) => {
    try {
        const userId = req.params.userId;
        const page = parseInt(req.query.page) || 1;
        const transactions = await transactionService.getAllTransactions(userId, page);
        console.log(transactions);
        res.json(transactions);
    }
    catch (err) {
        res.status(500).json({
            message: 'Error fetching transactions',
            error: err.message
        });
    }
};
export const addTransaction = async (req, res) => {
    try {
        const { category_id, user_id, amount, type, title, created_at, details, storeId, description } = req.body;
        if ((type == 'income' && !user_id) || (type == 'expense' && !category_id) || !amount || !type || !title) {
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
            storeId,
            description
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
export const getTransactionsByCategory = async (req, res) => {
    try {
        const userId = req.params.userId;
        const categoryId = Number(req.params.categoryId);
        const page = parseInt(req.query.page) || 1;
        const transactions = await transactionService.getTransactionsByCategory(userId, categoryId, page);
        res.json(transactions);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const editTransaction = async (req, res) => {
    try {
        const { category_id, amount, type, title, created_at, storeId, user_id, details, description } = req.body;
        const id = req.params.transactionId;
        console.log(req.body);
        if ((type == 'expense' && !category_id) || !amount || !type || !title) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const newTransaction = await transactionService.editTransaction({
            user_id,
            created_at,
            category_id,
            amount,
            type,
            title,
            id,
            storeId,
            details,
            description
        });
        console.log(req.body);
        res.status(201).json(newTransaction);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Error creating transaction',
            error: err.message
        });
    }
};
export const deleteTransaction = async (req, res) => {
    try {
        const transactionId = req.params.transactionId;
        await transactionService.deleteTransaction(transactionId);
        res.status(201).json('deleted sucessesfully');
    }
    catch (err) {
        res.status(500).json({
            message: 'Error deleting transaction',
            error: err.message
        });
    }
};
