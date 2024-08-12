import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../store/users";

export const useUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.usersMap);

  const getUsers = useCallback(async () => {
    try {
      await dispatch(fetchUsers());
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }, [dispatch]);

  return { users, getUsers };
};
