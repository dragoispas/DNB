// reducers/userReducer.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, fetchUser, fetchProfile, loginUser, registerUser } from '../actions/userActions';
import { User, LoginResponse, RegisterResponse } from '../api';

interface UserState {
    users: User[];
    user: User | null;
    profile: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    user: null,
    profile: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch users';
                state.loading = false;
            })
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.error = action.error.message || `Failed to fetch user with id ${action.meta.arg}`;
                state.loading = false;
            })
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch profile';
                state.loading = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const response: LoginResponse = action.payload;
                if (response.token) {
                    localStorage.setItem('authToken', response.token);
                }
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to log in';
                state.loading = false;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                const response: RegisterResponse = action.payload;
                if (response.success) {
                    // Registration successful, do something if needed
                }
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to register';
                state.loading = false;
            });
    },
});

export default userSlice.reducer;
