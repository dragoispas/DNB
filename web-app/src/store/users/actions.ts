import { getUsers } from "../../api/users";
import { AppDispatch } from "../store";
import { setUsers } from ".";

export const fetchUsers = () => async (dispatch: AppDispatch) => {
    try {
        const profile = await getUsers();
        if (profile) dispatch(setUsers(profile));
    } catch (error) { }
};
