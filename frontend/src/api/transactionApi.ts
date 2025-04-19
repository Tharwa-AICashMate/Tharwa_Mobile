
import axios from 'axios';
import { Transaction } from '../types';
// const API_URL = 'http://localhost:5000'; 

const API_URL = 'http://localhost:3000'; 
const userId = 'f955350c-5e5b-4410-907d-37985313e386'; 

export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    // const response = await axios.get(`${API_URL}/transactions`);
    const response = await axios.get(`${API_URL}/transactions/${userId}`);
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
