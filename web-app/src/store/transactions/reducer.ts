// reducers/transactionReducer.ts
import { createSlice } from '@reduxjs/toolkit';
import { createTransaction, fetchTransactions, fetchTransactionsByUser, TransactionState } from '.';

const initialState: TransactionState = {
    transactions: [],
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
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
                state.currentPage = action.payload.current_page;
                state.totalPages = action.payload.total_pages;
                state.totalItems = action.payload.total_items;
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
                state.currentPage = action.payload.current_page;
                state.totalPages = action.payload.total_pages;
                state.totalItems = action.payload.total_items;
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
