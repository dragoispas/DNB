import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useAuth } from "./useAuth";
import { useCallback, useEffect, useState } from "react";
import { createTransaction, fetchTransactions } from "../store/transactions";
import { TransactionToSubmit } from "../api/transactions/types";
import { setPage, setItemsPerPage } from "../store/transactions/slice";

interface Props {
  lazy?: boolean;
}

export const useTransactions = ({ lazy = false }: Props = {}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useAuth();
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactionsMap
  );
  const transactionsCount = useSelector(
    (state: RootState) => state.transactions.totalItems
  );
  const currentPage = useSelector(
    (state: RootState) => state.transactions.page
  );
  const transactionsPerPage = useSelector(
    (state: RootState) => state.transactions.itemsPerPage
  );
  const loading = useSelector(
    (state: RootState) => state.transactions.loadingTransactions
  );
  const error = useSelector(
    (state: RootState) => state.transactions.fetchTransactionsError
  );

  const getTransactions = useCallback(async () => {
    try {
      dispatch(
        fetchTransactions({
          page: currentPage + 1,
          itemsPerPage: transactionsPerPage,
        })
      );
    } catch (error) {
    } finally {
    }
  }, [dispatch, profile, currentPage, transactionsPerPage]);

  const addTransaction = useCallback(
    async (transaction: TransactionToSubmit) => {
      try {
        await dispatch(createTransaction(transaction));
      } catch (error) {
      } finally {
        getTransactions();
      }
    },
    [dispatch]
  );

  const setCurrentPage = useCallback(
    async (page: number) => {
      dispatch(setPage(page));
    },
    [dispatch]
  );

  const setTransactionsPerPage = useCallback(
    (rows: number) => {
      dispatch(setItemsPerPage(rows));
    },
    [dispatch]
  );

  return {
    transactions,
    transactionsCount,
    currentPage,
    transactionsPerPage,
    getTransactions,
    addTransaction,
    setCurrentPage,
    setTransactionsPerPage,
    loading,
    error,
  };
};
