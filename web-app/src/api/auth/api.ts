import axios from "axios";
import { LoginRequest, LoginResponse, Profile, RegisterRequest, RegisterResponse } from ".";
import { API_BASE_URL } from "../config";

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

export const getProfile = async (): Promise<Profile | null> => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('No token found');
        return null; // or handle as you need, e.g., redirect to login
    }

    try {
        const response = await axios.get<Profile>(`${API_BASE_URL}/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        // Directly returning the Profile data
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