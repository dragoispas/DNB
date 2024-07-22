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
    is_incoming: true,
    date_time: ''
};

const Container = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: 10,
    margin: 5,
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

    const handleInputChange = (field: keyof Transaction) => (event: ChangeEvent<HTMLInputElement>) => {
        setNewTransaction(prevState => ({
            ...prevState,
            [field]: field === 'amount' ? parseFloat(event.target.value) : event.target.value
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
                    onChange={handleInputChange('is_incoming')}
                    value={newTransaction.is_incoming ? "Incoming" : "Outgoing"}
                    select
                    size="small"
                    helperText="Transaction Type"
                    variant="standard"
                >
                    <MenuItem value="Incoming">Incoming</MenuItem>
                    <MenuItem value="Outgoing">Outgoing</MenuItem>
                </TextField>
                <Button onClick={submitForm} variant="contained">Submit</Button>
            </FormContainer>
        </Container>
    );
};

export default Transactions;
