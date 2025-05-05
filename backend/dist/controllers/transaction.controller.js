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
exports.deleteTransaction = exports.editTransaction = exports.getTransactionsByCategory = exports.addTransaction = exports.getTransactions = void 0;
// import { Request, Response } from 'express';
const transactionService = __importStar(require("../services/transaction.service.js"));
const getTransactions = async (req, res) => {
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
exports.getTransactions = getTransactions;
const addTransaction = async (req, res) => {
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
exports.addTransaction = addTransaction;
const getTransactionsByCategory = async (req, res) => {
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
exports.getTransactionsByCategory = getTransactionsByCategory;
const editTransaction = async (req, res) => {
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
exports.editTransaction = editTransaction;
const deleteTransaction = async (req, res) => {
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
exports.deleteTransaction = deleteTransaction;
