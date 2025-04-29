import axios from "axios";
import { getCurrentUserId } from "../utils/auth";
import { apiBase } from "@/utils/axiosInstance";
import { Transaction } from "@/types/transactionTypes";

const API_URL = apiBase;
const userId = "f955350c-5e5b-4410-907d-37985313e386";
export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) throw new Error("User ID not found");

    const response = await axios.get(`${API_URL}/transactions/${userId}`);

    return response.data.map(
      (transaction: any) =>
        ({
          ...transaction,
          amount: Number(transaction.amount) || 0,
          category: transaction.category_name.toLowerCase(),
          created_at: transaction.created_at || new Date().toISOString(),
        }) as Transaction
    );
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch transactions");
  }
};

export const addTransaction = async (
  transaction: Omit<Transaction, "id">
): Promise<Transaction> => {
  try {
    const response = await axios.post(`${API_URL}/transactions`, transaction);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to add transaction");
  }
};

export const deleteTransactions = async (
  transactionId: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(
      `${API_URL}/transactions/${transactionId}`
    );
    console.log('----- ',response.data == "deleted sucessesfully",transactionId);
    return response.data == "deleted sucessesfully";
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to delete transaction");
  }
};

export const editTransaction = async (
  transaction: Transaction
): Promise<Transaction> => {
  try {
    const response = await axios.put(
      `${API_URL}/transactions/${transaction.id}`,
      transaction
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to edit transaction");
  }
};
