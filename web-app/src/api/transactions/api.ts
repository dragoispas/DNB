import axios from "axios";
import { API_BASE_URL } from "../config";
import { Transaction, TransactionsResponse } from ".";
import { TransactionToSubmit } from "./types";

export const transactionsApi = {
  createTransaction: async (
    transaction: TransactionToSubmit
  ): Promise<Transaction | null> => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.post<Transaction>(
        `${API_BASE_URL}/transactions`,
        transaction,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An unknown error occurred";
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.error("Token has expired or is invalid");
        localStorage.removeItem("authToken");
        return null;
      }

      console.error("Error adding transaction:", message);
      throw error;
    }
  },
  fetchTransactions: async (
    page: number,
    per_page: number
  ): Promise<TransactionsResponse> => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get<TransactionsResponse>(
        `${API_BASE_URL}/transactions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { page, per_page },
        }
      );
      return response.data;
    } catch (error) {
      const message =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "An unknown error occurred";
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.error("Token has expired or is invalid");
        localStorage.removeItem("authToken");
        throw new Error("TokenExpiredError");
      }

      console.error("Failed to fetch transactions:", message);
      throw new Error("ApiError");
    }
  },
};
