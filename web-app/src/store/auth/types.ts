import { User } from "../../api/users/types";

export interface ProfileState {
    profile: User | null;
    loading: boolean;
    error: string | null;
}