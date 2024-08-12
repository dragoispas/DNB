import axios from "axios";
import { API_BASE_URL } from "../config";
import { User } from ".";

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// This gets all the fields for the user
export const getUser = async (id: string): Promise<User> => {
  try {
    const response = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user: ${id}`, error);
    throw error;
  }
};
