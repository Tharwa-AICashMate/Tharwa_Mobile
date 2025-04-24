"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = exports.getAllTransactions = void 0;
const supabase_js_1 = require("../config/supabase.js");
// import { supabase } from './supabaseClient';
// import { Transaction } from '../types/transactions.js';
// export class TransactionService {
//   static async getAllTransactions() {
//     const { data, error } = await supabase
//       .from('transactions')
//       .select('*')
//       .order('created_at', { ascending: false });
//     if (error) throw error;
//     return data;
//   }
//   static async getTransactionsByCategory(categoryId: number) {
//     const { data, error } = await supabase
//       .from('transactions')
//       .select('*')
//       .eq('category_id', categoryId)
//       .order('created_at', { ascending: false });
//     if (error) throw error;
//     return data;
//   }
//   static async getTransactionsByType(type: 'income' | 'expence') {
//     const { data, error } = await supabase
//       .from('transactions')
//       .select('*')
//       .eq('type', type)
//       .order('created_at', { ascending: false });
//     if (error) throw error;
//     return data;
//   }
//   static async createTransaction(transaction: Omit<Transaction, 'id'>) {
//     const { data, error } = await supabase
//       .from('transactions')
//       .insert(transaction)
//       .select()
//       .single();
//     if (error) throw error;
//     return data;
//   }
// }
const getAllTransactions = async (userId) => {
    const { data, error } = await supabase_js_1.supabase
        .from('transaction_with_category')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
    if (error)
        throw new Error(error.message);
    return data;
};
exports.getAllTransactions = getAllTransactions;
const createTransaction = async (transaction) => {
    const { data, error } = await supabase_js_1.supabase
        .from('transactions')
        .insert([transaction])
        .select();
    if (error)
        throw new Error(error.message);
    return data?.[0];
};
exports.createTransaction = createTransaction;
