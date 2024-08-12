import { setProfile } from ".";
import {
  getProfile,
  LoginRequest,
  LoginResponse,
  login,
  logout,
  RegisterRequest,
  register,
} from "../../api/auth";
import { AppDispatch } from "../store";

export const fetchProfile = () => async (dispatch: AppDispatch) => {
  try {
    const profile = await getProfile();
    if (profile) dispatch(setProfile(profile));
  } catch (error) {}
};

export const loginUser =
  (credentials: LoginRequest) => async (dispatch: AppDispatch) => {
    try {
      const response: LoginResponse = await login(credentials);
      if (response.success) {
        if (response.token) localStorage.setItem("authToken", response.token);
        dispatch(fetchProfile());
      }
    } catch (error) {}
  };

export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    await logout();
    dispatch(setProfile(null));
  } catch (error) {}
};

export const registerUser = (user: RegisterRequest) => async () => {
  try {
    await register(user);
  } catch (error) {}
};
