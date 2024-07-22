import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Transaction, getTransactions, addTransaction } from '../api';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box, TextField, MenuItem, Button } from '@mui/material';

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

const Transactions: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [newTransaction, setNewTransaction] = useState<Transaction>({
        amount: 0,
        currency: '',
        is_incoming: true,
        date_time: ''
    });

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions();
                setTransactions(data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, []);

    const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTransaction(prevState => ({
            ...prevState,
            amount: parseFloat(event.target.value)
        }));
    };

    const handleCurrencyChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTransaction(prevState => ({
            ...prevState,
            currency: event.target.value
        }));
    };

    const handleTransactionTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const transactionType = event.target.value
        setNewTransaction(prevState => ({
            ...prevState,
            is_incoming: transactionType == 'Incoming' ? true : false
        }));
    };

    const submitForm = async () => {
        try {
            const currentDateTime = new Date().toISOString();
            const transactionToSubmit = { ...newTransaction, date_time: currentDateTime };
            await addTransaction(transactionToSubmit);
            setTransactions(prevState => [...prevState, transactionToSubmit]);
            // Reset the form
            setNewTransaction({
                amount: 0,
                currency: 'EUR',
                is_incoming: true,
                date_time: ''
            });
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 10, margin: 5 }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Transaction</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Currency</TableCell>
                            <TableCell align="right">Transaction Type</TableCell>
                            <TableCell align="right">Date Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{row.currency}</TableCell>
                                <TableCell align="right">{row.is_incoming ? "Debited" : "Credited"}</TableCell>
                                <TableCell align="right">{row.date_time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: "center", alignItems: "center" }}>
                <TextField onChange={handleAmountChange} value={newTransaction.amount} size='small' helperText="Amount" type='number' variant="standard"></TextField>
                <TextField
                    onChange={handleCurrencyChange}
                    value={newTransaction.currency}
                    select
                    size='small'
                    defaultValue="EUR"
                    helperText="Currency"
                    variant="standard"
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    onChange={handleTransactionTypeChange}
                    value={newTransaction.is_incoming ? "Incoming" : "Outgoing"}
                    select
                    size='small'
                    defaultValue="EUR"
                    helperText="Transaction Type"
                    variant="standard"
                >
                    <MenuItem value={"Incoming"}>
                        {'Incoming'}
                    </MenuItem>
                    <MenuItem value={"Outgoing"}>
                        {'Outgoing'}
                    </MenuItem>
                </TextField>
                <Button onClick={submitForm} variant='contained'>Submit</Button>
            </Box>
        </Box>
    );
};

export default Transactions;
