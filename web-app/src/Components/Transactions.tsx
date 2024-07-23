import React, { useState, useEffect, ChangeEvent } from 'react';
import { Transaction, getTransactions, addTransaction } from '../api';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, TextField, MenuItem, Button, makeStyles, styled } from '@mui/material';
import TransactionsTable from './TransactionsTable';

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

const FormContainer = styled(Box)({
    display: "flex",
    flexDirection: "row",
    gap: 2,
    justifyContent: "center",
    alignItems: "center",
});

const Transactions: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [newTransaction, setNewTransaction] = useState<Transaction>(defaultTransaction);

    const fetchTransactions = async () => {
        try {
            const data = await getTransactions();
            setTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

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
            setNewTransaction(defaultTransaction);  // Reset the form
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    };

    return (
        <Container>
            <TransactionsTable transactions={transactions} />
            <FormContainer>
                <TextField
                    onChange={handleInputChange('amount')}
                    value={newTransaction.amount}
                    size="small"
                    helperText="Amount"
                    type="number"
                    variant="standard"
                />
                <TextField
                    onChange={handleInputChange('currency')}
                    value={newTransaction.currency}
                    select
                    size="small"
                    helperText="Currency"
                    variant="standard"
                >
                    {currencies.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    onChange={handleInputChange('sender_id')}
                    value={newTransaction.sender_id}
                    size="small"
                    helperText="Sender ID"
                    type="number"
                    variant="standard"
                />
                <TextField
                    onChange={handleInputChange('receiver_id')}
                    value={newTransaction.receiver_id}
                    size="small"
                    helperText="Receiver ID"
                    type="number"
                    variant="standard"
                />
                <Button onClick={submitForm} variant="contained">Submit</Button>
            </FormContainer>
        </Container>
    );
};

export default Transactions;
