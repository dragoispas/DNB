// reducers/transactionReducer.ts
import { createSlice } from '@reduxjs/toolkit';
import { Transaction } from '../api';
import { createTransaction, fetchTransactions, fetchTransactionsByUser } from '../actions/transactionActions';

interface TransactionState {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    transactions: [],
    loading: false,
    error: null,
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.transactions = action.payload.transactions;
                state.loading = false;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch transactions';
                state.loading = false;
            })
            .addCase(fetchTransactionsByUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactionsByUser.fulfilled, (state, action) => {
                state.transactions = action.payload.transactions;
                state.loading = false;
            })
            .addCase(fetchTransactionsByUser.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to fetch transactions for user';
                state.loading = false;
            })
            .addCase(createTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.transactions.push(action.payload);
                state.loading = false;
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to create transaction';
                state.loading = false;
            });
    },
});

export default transactionSlice.reducer;
