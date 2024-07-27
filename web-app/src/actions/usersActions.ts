// actions/usersActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../api';
import { getUsers } from '../api';

export const fetchUsers = createAsyncThunk<User[]>(
    'users/fetchUsers',
    async () => {
        return await getUsers();
    }
);
