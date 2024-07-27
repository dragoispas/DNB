import React, { useState, useEffect, ChangeEvent } from 'react';
import { Transaction, getTransactions, addTransaction, User, getUsers, getTransactionsByUserId, getUser, getProfile, TransactionsResponse } from '../api';
import { Box, TextField, MenuItem, styled, Typography, Pagination, TablePagination } from '@mui/material';
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
    const [rowsPerPage, setRowsPerPage] = useState(10); // Number of transactions per page

    const fetchTransactions = async () => {
        try {
            let data: TransactionsResponse;
            if (profile && profile.id) {
                data = await getTransactionsByUserId(profile.id, currentPage, rowsPerPage);
            } else {
                data = await getTransactions(currentPage, rowsPerPage);
            }
            setTransactions(data.transactions);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [currentPage, rowsPerPage])


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

    const handlePageChange = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1);
    };

    return (
        <Container>
            {profile ? <UserAvatar user={profile}></UserAvatar> : null}
            {profile ? <Typography >{`Account Balance: ${profile.balance} EUR`}</Typography> : null}
            <UserTransactionsTable
                transactions={transactions}
                userId={profile.id!}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
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
