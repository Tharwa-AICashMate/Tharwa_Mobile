
// const API_URL = 'http://10.0.2.2:5000'; 


// const API_URL = 'http://localhost:5000'; 
// const API_URL = 'http://192.168.75.1:5000';
import axios from 'axios';
import { Transaction } from '../types';

const API_URL = 'http://192.168.75.1:5000';

export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await axios.get(`${API_URL}/transactions`);
    return response.data;
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
