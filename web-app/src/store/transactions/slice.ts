import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../../api/transactions";
import {
  TransactionState,
  TransactionsMap,
  fetchTransactions,
  createTransaction,
} from ".";
import { TransactionToSubmit } from "../../api/transactions";

const initialNewTransaction: TransactionToSubmit = {
  amount: 0,
  currency: "EUR",
  date_time: "",
  receiver_id: -1,
};

const initialState: TransactionState = {
  transactionsIds: [],
  transactionsMap: {},
  page: 0,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  transactionToSubmit: initialNewTransaction,
  loadingTransactions: false,
  fetchTransactionsError: null,
  creatingTransaction: false,
  createTransactionError: null,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactionsIds = action.payload.map(
        (transaction) => transaction.id
      );

      const transactionsMap: TransactionsMap = {};
      action.payload.forEach(
        (transaction) => (transactionsMap[transaction.id] = transaction)
      );
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
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setNewTransaction: (state, action: PayloadAction<TransactionToSubmit>) => {
      state.transactionToSubmit = action.payload;
    },
    resetNewTransaction: (state) => {
      state.transactionToSubmit = initialNewTransaction;
    },
    updateNewTransactionField: (
      state,
      action: PayloadAction<{ field: string; value: any }>
    ) => {
      state.transactionToSubmit = {
        ...state.transactionToSubmit,
        [action.payload.field]: action.payload.value,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loadingTransactions = true;
        state.fetchTransactionsError = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        const { transactions, total_items, total_pages } = action.payload;

        state.transactionsIds = transactions.map(
          (transaction) => transaction.id
        );
        const transactionsMap: TransactionsMap = {};
        transactions.forEach(
          (transaction) => (transactionsMap[transaction.id] = transaction)
        );
        state.transactionsMap = transactionsMap;
        state.totalItems = total_items;
        state.totalPages = total_pages;
        state.loadingTransactions = false;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loadingTransactions = false;
        state.fetchTransactionsError =
          action.error.message || "Failed to fetch transactions";
        console.error("Failed to fetch transactions:", action.payload);
      })
      .addCase(createTransaction.pending, (state) => {
        state.creatingTransaction = true;
        state.createTransactionError = null;
      })
      .addCase(createTransaction.fulfilled, (state) => {
        state.creatingTransaction = false;
        state.transactionToSubmit = initialNewTransaction;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.creatingTransaction = false;
        state.createTransactionError =
          action.error.message || "Failed to add transaction";
        state.transactionToSubmit = initialNewTransaction;
      });
  },
});

export const {
  setTransactions,
  setPage,
  setTotalPages,
  setTotalItems,
  setItemsPerPage,
  setNewTransaction,
  resetNewTransaction,
  updateNewTransactionField,
} = transactionSlice.actions;

export default transactionSlice.reducer;
