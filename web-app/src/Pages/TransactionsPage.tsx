import React, { useEffect, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, styled, Typography } from '@mui/material';
import TransactionForm from '../components/TransactionForm';
import UserAvatar from '../components/UserAvatar';
import UserTransactionsTable from '../components/UserTransactionsTable';
import { AppDispatch, RootState } from '../store/store';
import { fetchProfile } from '../store/auth/actions';
import { fetchUsers } from '../store/users/actions';
import { fetchTransactionsByUser, createTransaction } from '../store/transactions/actions';

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
    const totalItems = useSelector((state: RootState) => state.transactions.totalItems);
    const profile = useSelector((state: RootState) => state.profile.profile);
    const users = useSelector((state: RootState) => state.users.users);

    const [newTransaction, setNewTransaction] = React.useState(defaultTransaction);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        if (profile) {
            dispatch(fetchTransactionsByUser({ userId: profile.id, page: currentPage, per_page: rowsPerPage }));
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
                dispatch(fetchTransactionsByUser({ userId: profile.id, page: currentPage, per_page: rowsPerPage })); // Refetch transactions after creating new one
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
                totalPages={Math.ceil(totalItems / rowsPerPage)}
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
