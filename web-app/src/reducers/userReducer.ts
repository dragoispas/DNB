// reducers/userReducer.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchUser } from '../actions/userActions';
import { UserState } from './types';

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
            });
    },
});

export default userSlice.reducer;
