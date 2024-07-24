import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001'; // Update this to your Flask server URL if needed

export interface Transaction {
    id?: number;
    amount: number;
    currency: string;
    date_time?: string;
    sender_id: number;
    receiver_id: number;
}

export interface User {
    id?: number;
    name: string;
    gender?: string;
    email?: string;
    birth_date?: string;
}

export const getTransactions = async (): Promise<Transaction[]> => {
    try {
        const response = await axios.get<Transaction[]>(`${API_BASE_URL}/transactions`);
        return response.data;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
};

export const getTransactionsByUserId = async (userId: number): Promise<Transaction[]> => {
    try {
        const response = await axios.get<Transaction[]>(`${API_BASE_URL}/transactions`, {
            params: { user_id: userId }
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

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get<User[]>(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

export const getUser = async (id: string): Promise<User> => {
    try {
        const response = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user: ${id}`, error);
        throw error;
    }
}
