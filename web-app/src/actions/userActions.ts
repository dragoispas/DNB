// actions/userActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../api';
import { getUser } from '../api';

export const fetchUser = createAsyncThunk<User, string>(
    'user/fetchUser',
    async (id) => {
        return await getUser(id);
    }
);
