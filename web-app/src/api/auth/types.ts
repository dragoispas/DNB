export interface Profile {
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