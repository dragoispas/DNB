import { User } from "../../api/users";

export type UsersMap = {
  [id: number]: User;
};

export interface UsersState {
  userIds: number[];
  usersMap: UsersMap;
}
