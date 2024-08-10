import { TransactionsResponse, getTransactionsByUserId, Transaction, addTransaction } from '../../api/transactions';
import { TransactionToSubmit } from '../../api/transactions/types';
import { AppDispatch } from '../store';
import { setTransactions, setTotalItems, setTotalPages, updateNewTransactionField } from './slice';


export const fetchTransactionsByUser = (page: number, itemsPerPage: number) => async (dispatch: AppDispatch) => {
    try {
        const response: TransactionsResponse | null = await getTransactionsByUserId(page, itemsPerPage);
        if (response) {
            dispatch(setTransactions(response.transactions))
            dispatch(setTotalItems(response.total_items))
            dispatch(setTotalPages(response.total_pages))
        }
    } catch (error) { }
}

export const createTransaction = (transaction: TransactionToSubmit) => async (dispatch: AppDispatch) => {
    try {
        await addTransaction(transaction);
    } catch (error) { }
}

export const editNewTransactionField = (field: string, value: any) => (dispatch: AppDispatch) => {
    dispatch(updateNewTransactionField({ field, value }));
}