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

export interface TransactionsResponse {
    total_pages: number;
    total_items: number;
    current_page: number;
    per_page: number;
    transactions: Transaction[];
}

export interface User {
    id: number;
    name: string;
    balance: number;
    gender?: string;
    email?: string;
    birth_date?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    token?: string;
    message?: string;
}

export interface RegisterRequest {
    name: string;
    gender: string;
    email: string;
    birth_date: string;
    password: string;
}

export interface RegisterResponse {
    success: boolean;
    message?: string;
}

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

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get<User[]>(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}

// This gets all the fields for the user
export const getUser = async (id: string): Promise<User> => {
    try {
        const response = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching user: ${id}`, error);
        throw error;
    }
}

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${API_BASE_URL}/login`, credentials, {
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.data.token) {
            // Storing the token
            localStorage.setItem('authToken', response.data.token);
            return { success: true, token: response.data.token };
        } else {
            return { success: false, message: response.data.message || 'Login failed' };
        }
    } catch (error) {
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : 'An unknown error occurred';
        return { success: false, message };
    }
};

export const logout = (): void => {
    localStorage.removeItem('authToken');
    window.location.href = '/login';
};

export const getProfile = async (): Promise<User | null> => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No token found');
        return null; // or handle as you need, e.g., redirect to login
    }

    try {
        const response = await axios.get<User>(`${API_BASE_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        // Directly returning the user data
        return response.data;
    } catch (error) {
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : 'An unknown error occurred';

        console.error('Failed to fetch profile:', message);
        return null;
    }
};

export const register = async (user: RegisterRequest): Promise<RegisterResponse> => {
    try {
        const response = await axios.post<RegisterResponse>(`${API_BASE_URL}/register`, user, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.data.success) {
            return { success: true, message: 'Registration successful' };
        } else {
            return { success: false, message: response.data.message || 'Registration failed' };
        }
    } catch (error) {
        const message = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : 'An unknown error occurred';

        return { success: false, message };
    }
};
