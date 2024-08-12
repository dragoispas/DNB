// reducers/usersReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersState, UsersMap } from ".";
import { User } from "../../api/users";

const initialState: UsersState = {
  userIds: [],
  usersMap: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.userIds = action.payload.map((user) => user.id);

      const usersMap: UsersMap = {};
      action.payload.forEach((user) => (usersMap[user.id] = user));
      state.usersMap = usersMap;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;
