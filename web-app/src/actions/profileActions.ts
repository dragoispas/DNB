// actions/profileActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, RegisterRequest, RegisterResponse, LoginRequest, LoginResponse } from '../api';
import { getProfile, login, register } from '../api';

export const fetchProfile = createAsyncThunk<User | null>(
    'profile/fetchProfile',
    async () => {
        return await getProfile();
    }
);

export const loginUser = createAsyncThunk<LoginResponse, LoginRequest>(
    'profile/loginUser',
    async (credentials) => {
        return await login(credentials);
    }
);

export const registerUser = createAsyncThunk<RegisterResponse, RegisterRequest>(
    'profile/registerUser',
    async (user) => {
        return await register(user);
    }
);
