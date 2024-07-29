import { createAsyncThunk } from '@reduxjs/toolkit';
import { TransactionsResponse, getTransactions, getTransactionsByUserId, Transaction, addTransaction } from '../../api/transactions';

export const fetchTransactions = createAsyncThunk<TransactionsResponse, { page: number; per_page: number }>(
    'transactions/fetchTransactions',
    async ({ page, per_page }) => {
        return await getTransactions(page, per_page);
    }
);

export const fetchTransactionsByUser = createAsyncThunk<TransactionsResponse, { userId: number, page: number, per_page: number }>(
    'transactions/fetchTransactionsByUser',
    async ({ userId, page, per_page }) => {
        return await getTransactionsByUserId(userId, page, per_page);
    }
);

export const createTransaction = createAsyncThunk<Transaction, Transaction>(
    'transactions/createTransaction',
    async (transaction) => {
        return await addTransaction(transaction);
    }
);