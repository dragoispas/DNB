// actions/userActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, RegisterRequest, RegisterResponse, LoginRequest, LoginResponse } from '../api';
import { getUsers, getUser, getProfile, login, register } from '../api';

export const fetchUsers = createAsyncThunk<User[]>(
    'users/fetchUsers',
    async () => {
        return await getUsers();
    }
);

export const fetchUser = createAsyncThunk<User, string>(
    'users/fetchUser',
    async (id) => {
        return await getUser(id);
    }
);

export const fetchProfile = createAsyncThunk<User | null>(
    'users/fetchProfile',
    async () => {
        return await getProfile();
    }
);

export const loginUser = createAsyncThunk<LoginResponse, LoginRequest>(
    'users/loginUser',
    async (credentials) => {
        return await login(credentials);
    }
);

export const registerUser = createAsyncThunk<RegisterResponse, RegisterRequest>(
    'users/registerUser',
    async (user) => {
        return await register(user);
    }
);
