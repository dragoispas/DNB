import { Transaction } from "../../api/transactions";
import { TransactionToSubmit } from "../../api/transactions/types";

export type TransactionsMap = {
    [id: number]: Transaction
}

export interface TransactionState {
    transactionsIds: number[];
    transactionsMap: TransactionsMap;
    page: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    transactionToSubmit: TransactionToSubmit
}