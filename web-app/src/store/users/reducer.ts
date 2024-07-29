// reducers/usersReducer.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, UsersState } from '.';

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
};

const usersSlice = createSlice({
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
            });
    },
});

export default usersSlice.reducer;
