import { Transaction } from "../../api/transactions";

export interface TransactionState {
    transactions: Transaction[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    loading: boolean;
    error: string | null;
}