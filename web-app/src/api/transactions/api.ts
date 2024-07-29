import axios from "axios";
import { API_BASE_URL } from "../config";
import { Transaction, TransactionsResponse } from ".";


export const getTransactions = async (page: number = 1, per_page: number = 10): Promise<TransactionsResponse> => {
    try {
        const response = await axios.get<TransactionsResponse>(`${API_BASE_URL}/transactions`, {
            params: { page, per_page }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
};

export const getTransactionsByUserId = async (userId: number, page: number = 1, per_page: number = 10): Promise<TransactionsResponse> => {
    try {
        const response = await axios.get<TransactionsResponse>(`${API_BASE_URL}/transactions`, {
            params: { user_id: userId, page, per_page }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching transactions for user: ${userId}`, error);
        throw error;
    }
};

export const addTransaction = async (transaction: Transaction): Promise<Transaction> => {
    try {
        const response = await axios.post<Transaction>(`${API_BASE_URL}/transactions`, transaction);
        return response.data;
    } catch (error) {
        console.error("Error adding transaction:", error);
        throw error;
    }
};