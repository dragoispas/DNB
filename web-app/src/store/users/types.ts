import { User } from "../../api/users";

export interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
}