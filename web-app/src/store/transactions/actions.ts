import { createAsyncThunk } from "@reduxjs/toolkit";
import { transactionsApi, TransactionToSubmit } from "../../api/transactions";
import { AppDispatch } from "../store";
import { updateNewTransactionField } from "./slice";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (
    payload: { page: number; itemsPerPage: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await transactionsApi.fetchTransactions(
        payload.page,
        payload.itemsPerPage
      );
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      throw error;
    }
  }
);

export const createTransaction = createAsyncThunk(
  "transactions/createTransaction", // Define a unique action type
  async (transaction: TransactionToSubmit, { rejectWithValue }) => {
    try {
      const newTransaction = await transactionsApi.createTransaction(
        transaction
      );
      // Optionally, you can return the newly created transaction data here if needed
      return newTransaction;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      throw error;
    }
  }
);

export const editNewTransactionField =
  (field: string, value: any) => (dispatch: AppDispatch) => {
    dispatch(updateNewTransactionField({ field, value }));
  };
