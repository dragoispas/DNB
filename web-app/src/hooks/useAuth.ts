import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { LoginRequest, RegisterRequest } from "../api/auth";
import {
  fetchProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../store/auth";
import { useCallback, useEffect, useRef, useState } from "react";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.profile.profile);
  const isAuthenticated = useRef(localStorage.getItem("authToken") !== null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        isAuthenticated.current = true;
      } else {
        isAuthenticated.current = false;
        navigate("/login");
      }
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, [isAuthenticated]);

  const getProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await dispatch(fetchProfile());
    } catch (error) {
      setError("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const login = useCallback(
    async (credentials: LoginRequest) => {
      try {
        await dispatch(loginUser(credentials));
        navigate("/profile");
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    [dispatch, navigate]
  );

  const logout = useCallback(async () => {
    try {
      await dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [dispatch, navigate]);

  const register = useCallback(
    async (user: RegisterRequest) => {
      try {
        await dispatch(registerUser(user));
        navigate("/profile");
      } catch (error) {
        console.error("Registration failed:", error);
      }
    },
    [dispatch, navigate]
  );

  return { profile, isAuthenticated, login, logout, register, getProfile };
};
