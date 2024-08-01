// reducers/transactionReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../../api/transactions';
import { TransactionState, TransactionsMap } from '.';

const initialState: TransactionState = {
    transactionsIds: [],
    transactionsMap: {},
    page: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setTransactions: (state, action: PayloadAction<Transaction[]>) => {
            state.transactionsIds = action.payload.map(transaction => transaction.id);

            const transactionsMap: TransactionsMap = {};
            action.payload.forEach(transaction => transactionsMap[transaction.id] = transaction)
            state.transactionsMap = transactionsMap;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
        setTotalItems: (state, action: PayloadAction<number>) => {
            state.totalItems = action.payload;
        }
        ,
        setItemsPerPage: (state, action: PayloadAction<number>) => {
            state.itemsPerPage = action.payload;
        }
    },

});

export const { setTransactions, setPage, setTotalPages, setTotalItems, setItemsPerPage } = transactionSlice.actions;

export default transactionSlice.reducer;
