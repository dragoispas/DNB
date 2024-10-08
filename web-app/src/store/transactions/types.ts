import { Transaction, TransactionToSubmit } from "../../api/transactions";

export type TransactionsMap = {
  [id: number]: Transaction;
};

export interface TransactionState {
  transactionsIds: number[];
  transactionsMap: TransactionsMap;
  page: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  transactionToSubmit: TransactionToSubmit;
  loadingTransactions: boolean;
  fetchTransactionsError: string | null;
  creatingTransaction: boolean;
  createTransactionError: string | null;
}

export enum TransactionActions {}
