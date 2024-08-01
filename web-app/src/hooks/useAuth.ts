import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { LoginRequest, RegisterRequest } from "../api/auth";
import { fetchProfile, loginUser, logoutUser, registerUser } from "../store/auth";
import { useCallback, useEffect } from "react";

interface Props {
    lazy?: boolean;
}

export const useAuth = ({ lazy = false }: Props = {}) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const profile = useSelector((state: RootState) => state.profile.profile);
    const isAuthenticated = localStorage.getItem('authToken') !== null;

    const getProfile = useCallback(async () => {
        try {
            await dispatch(fetchProfile());
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        }
    }, [dispatch]);

    const login = useCallback(async (credentials: LoginRequest) => {
        try {
            await dispatch(loginUser(credentials));
            navigate('/profile');
            await getProfile();
        } catch (error) {
            console.error("Login failed:", error);
        }
    }, [dispatch, navigate]);

    const logout = useCallback(async () => {
        try {
            await dispatch(logoutUser());
            navigate('/login');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }, [dispatch, navigate]);

    const register = useCallback(async (user: RegisterRequest) => {
        try {
            await dispatch(registerUser(user));
            navigate('/profile');
        } catch (error) {
            console.error("Registration failed:", error);
        }
    }, [dispatch, navigate]);

    return { profile, isAuthenticated, login, logout, register, getProfile };
}
