

// import axios from 'axios';
// import { Transaction } from '../types';
// import { API_BASE_URL } from "../config/api";


// const API_URL = API_BASE_URL; 

// const userId = 'f955350c-5e5b-4410-907d-37985313e386'; 
// export const fetchTransactions = async (): Promise<Transaction[]> => {
//   try {
//     const response = await axios.get(`${API_URL}/transactions/${userId}`);
    
//     return response.data.map((transaction: any) => ({
//       ...transaction,
//       amount: Number(transaction.amount) || 0, 
//       category: transaction.category_name.toLowerCase(),
//             date: transaction.date || new Date().toISOString() 
//     }));
    
//   } catch (error) {
//     console.error('API Error:', error);
//     throw new Error('Failed to fetch transactions');
//   }
// };

// export const addTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
//   try {
//     const response = await axios.post(`${API_URL}/transactions`, transaction);
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw new Error('Failed to add transaction');
//   }
// };



import axios from 'axios';
import { Transaction } from '../types';
import { API_BASE_URL } from "../config/api";
import { getCurrentUserId } from '../utils/auth';

const API_URL = API_BASE_URL;

export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) throw new Error('User ID not found');

    const response = await axios.get(`${API_URL}/transactions/${userId}`);

    return response.data.map((transaction: any) => ({
      ...transaction,
      amount: Number(transaction.amount) || 0,
      category: transaction.category_name.toLowerCase(),
      date: transaction.date || new Date().toISOString(),
    }));
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch transactions');
  }
};

export const addTransaction = async (transaction: Omit<Transaction, 'id'>): Promise<Transaction> => {
  try {
    const response = await axios.post(`${API_URL}/transactions`, transaction);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to add transaction');
  }
};
