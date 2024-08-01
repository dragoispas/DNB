import React, { useEffect, ChangeEvent, useTransition, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, styled, Typography } from '@mui/material';
import TransactionForm from '../components/TransactionForm';
import UserAvatar from '../components/UserAvatar';
import UserTransactionsTable from '../components/UserTransactionsTable';
import { AppDispatch, RootState } from '../store/store';
import { fetchUsers } from '../store/users/actions';
import { useAuth } from '../hooks/useAuth';
import { useTransactions } from '../hooks/useTransactions';
import { useUsers } from '../hooks/useUsers';

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
    // Accessing state from Redux store
    const { transactions, transactionsCount, currentPage, transactionsPerPage, getTransactions, addTransaction, setCurrentPage, setTransactionsPerPage } = useTransactions({})
    const { profile, getProfile } = useAuth({ lazy: true });
    const { users, getUsers } = useUsers();

    const [newTransaction, setNewTransaction] = React.useState(defaultTransaction);

    useEffect(() => {
        if (!profile) getProfile();
        if (Object.keys(users).length === 0) getUsers();
        if (Object.keys(transactions).length === 0) getTransactions();
    }, []);

    if (!profile) return null;

    const handleInputChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setNewTransaction(prevState => ({
            ...prevState,
            [field]: event.target.value
        }));
    };

    const submitForm = async () => {
        try {
            const transactionToSubmit = { ...newTransaction, sender_id: profile.id, date_time: new Date().toISOString() };
            await addTransaction(transactionToSubmit);
            await getTransactions();
        } catch (error) { }
    };

    const handlePageChange = (event: unknown, newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setTransactionsPerPage(parseInt(event.target.value, 10));
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
                totalPages={Math.ceil(transactionsCount / transactionsPerPage)}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                rowsPerPage={transactionsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {profile && <Typography>{`Account Balance: ${profile.balance} EUR`}</Typography>}
            <TransactionForm
                newTransaction={newTransaction}
                users={Object.values(users)}
                activeUser={profile}
                currencies={currencies}
                onInputChange={handleInputChange}
                onSubmit={submitForm}
            />
        </Container>
    );
};

export default Transactions;
