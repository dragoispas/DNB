import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useAuth } from "./useAuth";
import { useCallback, useEffect, useState } from "react";
import { createTransaction, fetchTransactionsByUser, setItemsPerPage, setPage } from "../store/transactions";
import { Transaction, TransactionToSubmit } from "../api/transactions/types";

interface Props {
    lazy?: boolean;
}

export const useTransactions = ({ lazy = false }: Props = {}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, profile } = useAuth({ lazy: true });
    const transactions = useSelector((state: RootState) => state.transactions.transactionsMap);
    const transactionsCount = useSelector((state: RootState) => state.transactions.totalItems);
    const currentPage = useSelector((state: RootState) => state.transactions.page);
    const transactionsPerPage = useSelector((state: RootState) => state.transactions.itemsPerPage);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getTransactions();
    }, [currentPage, transactionsPerPage])

    const getTransactions = useCallback(async () => {
        if (!profile) return;
        setLoading(true);
        setError(null);
        try {
            await dispatch(fetchTransactionsByUser(profile.id, currentPage, transactionsPerPage));
        } catch (error) {
            setError("Failed to fetch transactions");
        } finally {
            setLoading(false);
        }
    }, [dispatch, profile, currentPage, transactionsPerPage]);

    const addTransaction = useCallback(async (transaction: TransactionToSubmit) => {
        try {
            setLoading(true);
            await dispatch(createTransaction(transaction));
        } catch (error) {
            setError("Failed to add transaction");
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    const setCurrentPage = useCallback(async (page: number) => {
        dispatch(setPage(page));
    }, [dispatch]);

    const setTransactionsPerPage = useCallback((rows: number) => {
        dispatch(setItemsPerPage(rows));
    }, [dispatch]);

    return { transactions, transactionsCount, currentPage, transactionsPerPage, getTransactions, addTransaction, setCurrentPage, setTransactionsPerPage, loading, error };
};
