import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, getUser } from "../../api/users/api";
import { User } from "../../api/users/types";

export const fetchUsers = createAsyncThunk<User[]>(
    'users/fetchUsers',
    async () => {
        return await getUsers();
    }
);

export const fetchUser = createAsyncThunk<User, string>(
    'user/fetchUser',
    async (id) => {
        return await getUser(id);
    }
);
