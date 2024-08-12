import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../../api/transactions";
import { TransactionState, TransactionsMap } from ".";
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
