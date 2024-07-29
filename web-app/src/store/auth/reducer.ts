import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile, loginUser, registerUser, ProfileState } from ".";

const initialState: ProfileState = {
    profile: null,
    loading: false,
    error: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
                const response = action.payload;
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
                const response = action.payload;
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

export default profileSlice.reducer;
