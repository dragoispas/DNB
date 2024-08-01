import { TransactionsResponse, getTransactionsByUserId, Transaction, addTransaction } from '../../api/transactions';
import { TransactionToSubmit } from '../../api/transactions/types';
import { AppDispatch } from '../store';
import { setTransactions, setTotalItems, setTotalPages } from './slice';


export const fetchTransactionsByUser = (userId: number, page: number, itemsPerPage: number) => async (dispatch: AppDispatch) => {
    try {
        const response: TransactionsResponse = await getTransactionsByUserId(userId, page, itemsPerPage);
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