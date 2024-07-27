import React, { useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, fetchTransactionsByUser, createTransaction } from '../actions/transactionActions';
import { fetchUsers, fetchProfile } from '../actions/userActions';
import { RootState, AppDispatch } from '../store';
import { Box, TextField, MenuItem, styled, Typography } from '@mui/material';
import TransactionForm from '../Components/TransactionForm';
import UserAvatar from '../Components/UserAvatar';
import UserTransactionsTable from '../Components/UserTransactionsTable';

const currencies = [
    { value: 'USD', label: '$' },
    { value: 'EUR', label: '€' },
    { value: 'BTC', label: '฿' },
    { value: 'JPY', label: '¥' },
];

const defaultTransaction = {
    amount: 0,
    currency: 'EUR',
    date_time: '',
    sender_id: 0,
    receiver_id: 1
};

const Container = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: 30,
    margin: 30,
});

const Transactions: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>(); // Correctly typed useDispatch

    // Accessing state from Redux store
    const transactions = useSelector((state: RootState) => state.transactions.transactions);
    const profile = useSelector((state: RootState) => state.user.profile);
    const users = useSelector((state: RootState) => state.user.users);

    const [newTransaction, setNewTransaction] = React.useState(defaultTransaction);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        if (profile) {
            dispatch(fetchTransactionsByUser({ userId: profile.id, page: currentPage, per_page: rowsPerPage }));
        } else {
            dispatch(fetchTransactions({ page: currentPage, per_page: rowsPerPage }));
        }
    }, [dispatch, profile, currentPage, rowsPerPage]);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchProfile());
    }, [dispatch]);

    const handleInputChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setNewTransaction(prevState => ({
            ...prevState,
            [field]: event.target.value
        }));
    };

    const submitForm = async () => {
        try {
            if (profile) {
                const transactionToSubmit = { ...newTransaction, sender_id: profile.id, date_time: new Date().toISOString() };
                await dispatch(createTransaction(transactionToSubmit)).unwrap();
                setNewTransaction(defaultTransaction);  // Reset the form
            }
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    };

    const handlePageChange = (event: unknown, newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1);
    };

    if (!profile) {
        return null;
    }

    return (
        <Container>
            {profile ? <UserAvatar user={profile} /> : null}
            <UserTransactionsTable
                transactions={transactions}
                userId={profile?.id!}
                totalPages={Math.ceil(transactions.length / rowsPerPage)}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {profile && <Typography>{`Account Balance: ${profile.balance} EUR`}</Typography>}
            <TransactionForm
                newTransaction={newTransaction}
                users={users}
                activeUser={profile}
                currencies={currencies}
                onInputChange={handleInputChange}
                onSubmit={submitForm}
            />
        </Container>
    );
};

export default Transactions;
