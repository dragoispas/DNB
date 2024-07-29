import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile, LoginResponse, LoginRequest, login, RegisterResponse, RegisterRequest, register, Profile } from "../../api/auth";


export const fetchProfile = createAsyncThunk<Profile | null>(
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
