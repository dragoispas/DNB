import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileState } from ".";
import { getProfile, login, LoginRequest, LoginResponse, logout, Profile, register, RegisterRequest, RegisterResponse } from "../../api/auth";
import { AppDispatch } from "../store";

const initialState: ProfileState = { // maybe change this to AuthState and have login error or register error state
    profile: null,
};
// TODO - add register email verification, login through link
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<Profile | null>) => {
            state.profile = action.payload;
        }
    }
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
