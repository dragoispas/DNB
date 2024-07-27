// types.ts
import { User } from '../api';

export interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
}

export interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

export interface ProfileState {
    profile: User | null;
    loading: boolean;
    error: string | null;
}
