import React, { useState, useEffect, ChangeEvent } from 'react';
import { Transaction, getTransactions, addTransaction, User, getUsers, getTransactionsByUserId, getUser, getProfile, TransactionsResponse } from '../api';
import { Box, TextField, MenuItem, styled, Typography, Pagination } from '@mui/material';
import TransactionForm from '../Components/TransactionForm';
import TransactionsTable from '../Components/TransactionsTable';
import UserAvatar from '../Components/UserAvatar';
import UserTransactionsTable from '../Components/UserTransactionsTable';

const currencies = [
    { value: 'USD', label: '$' },
    { value: 'EUR', label: '€' },
    { value: 'BTC', label: '฿' },
    { value: 'JPY', label: '¥' },
];

const defaultTransaction: Transaction = {
    amount: 0,
    currency: 'EUR',
    date_time: '',
    sender_id: 0,
    receiver_id: 1
};

const Container = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: 50,
    margin: 30,
});

const Transactions: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [newTransaction, setNewTransaction] = useState<Transaction>(defaultTransaction);
    const [profile, setProfile] = useState<User>()

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 10; // Number of transactions per page

    const fetchTransactions = async () => {
        try {
            let data: TransactionsResponse;
            if (profile && profile.id) {
                data = await getTransactionsByUserId(profile.id, currentPage, perPage);
            } else {
                data = await getTransactions(currentPage, perPage);
            }
            setTransactions(data.transactions);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [currentPage])


    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchProfile = async () => {
        try {
            const fetchedUser = await getProfile();
            if (fetchedUser) {
                setProfile(fetchedUser);
            }
        } catch (err) {
            console.error('Profile fetch error:', err);
        }
    };

    useEffect(() => {
        fetchTransactions();
        fetchUsers();
        fetchProfile();
    }, []);

    const handleInputChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setNewTransaction(prevState => ({
            ...prevState,
            [field]: event.target.value
        }));
    };

    if (!profile) {
        return null;
    }

    const submitForm = async () => {
        try {
            const transactionToSubmit = { ...newTransaction, sender_id: profile.id, date_time: new Date().toISOString() };
            await addTransaction(transactionToSubmit);
            // await fetchTransactions();
            await fetchTransactions();
            setNewTransaction(defaultTransaction);  // Reset the form
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    return (
        <Container>
            {profile ? <UserAvatar user={profile}></UserAvatar> : null}
            {profile ? <Typography >{`Account Balance: ${profile.balance} EUR`}</Typography> : null}
            {profile ? <UserTransactionsTable transactions={transactions} userId={profile.id!} /> : null}
            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
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
