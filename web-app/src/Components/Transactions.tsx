import React, { useState, useEffect, ChangeEvent } from 'react';
import { Transaction, getTransactions, addTransaction, User, getUsers, getTransactionsByUserId, getUser } from '../api';
import { Box, TextField, MenuItem, styled, Typography } from '@mui/material';
import TransactionsTable from './TransactionsTable';
import UserAvatar from './UserAvatar';
import UserTransactionsTable from './UserTransactionsTable';
import TransactionForm from './TransactionForm';

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
    receiver_id: 0
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
    const [activeUser, setActiveUser] = useState<User>()
    const [activeUserDetailed, setActiveUserDetailed] = useState<User>()

    const fetchTransactions = async () => {
        try {
            const data = activeUser && activeUser.id ? await getTransactionsByUserId(activeUser.id!) : await getTransactions();
            setTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchUserDetailed = async () => {
        if (!activeUser) return;
        try {
            const data = await getUser(activeUser.id.toString());
            setActiveUserDetailed(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    useEffect(() => {
        fetchTransactions();
        fetchUsers();
    }, []);

    useEffect(() => {
        if (activeUser && activeUser.id) {
            setNewTransaction(prevState => ({
                ...prevState,
                sender_id: activeUser.id!
            }));
            fetchUserDetailed()
        }
        fetchTransactions();
    }, [activeUser])

    const handleInputChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setNewTransaction(prevState => ({
            ...prevState,
            [field]: event.target.value
        }));
    };

    const submitForm = async () => {
        try {
            const transactionToSubmit = { ...newTransaction, date_time: new Date().toISOString() };
            await addTransaction(transactionToSubmit);
            await fetchTransactions();
            if (activeUser) {
                await fetchUserDetailed();
            }
            setNewTransaction(defaultTransaction);  // Reset the form
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    };

    const handleUserChange = (event: ChangeEvent<HTMLInputElement>) => {
        const id = parseInt(event.target.value);
        setActiveUser(users.find(user => user.id === id))
    }

    return (
        <Container>
            {activeUser ? <UserAvatar user={activeUser}></UserAvatar> : null}
            {activeUserDetailed ? <Typography >{`Account Balance: ${activeUserDetailed.balance} EUR`}</Typography> : null}
            {activeUser ? <UserTransactionsTable transactions={transactions} userId={activeUser.id!} /> : <TransactionsTable transactions={transactions} />}
            <TransactionForm
                newTransaction={newTransaction}
                users={users}
                activeUser={activeUser}
                currencies={currencies}
                onInputChange={handleInputChange}
                onSubmit={submitForm}
            />
            <TextField
                onChange={handleUserChange}
                value={activeUser?.name}
                select
                size="small"
                helperText="Sender"
                variant="standard"
            >
                {users.map(user => (
                    <MenuItem key={user.id} value={user.id}>
                        {user.name}
                    </MenuItem>
                ))}
            </TextField>
        </Container>
    );
};

export default Transactions;
