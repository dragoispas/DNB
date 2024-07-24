import React, { ChangeEvent } from 'react';
import { TextField, MenuItem, Button, Box, styled } from '@mui/material';
import { Transaction, User } from '../api';

const FormContainer = styled(Box)({
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
});

interface TransactionFormProps {
    newTransaction: Transaction;
    users: User[];
    activeUser?: User;
    currencies: { value: string; label: string }[];
    onInputChange: (field: string) => (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
    newTransaction,
    users,
    activeUser,
    currencies,
    onInputChange,
    onSubmit
}) => {
    return (
        <FormContainer>
            <TextField
                onChange={onInputChange('amount')}
                value={newTransaction.amount}
                size="small"
                helperText="Amount"
                type="number"
                variant="standard"
            />
            <TextField
                onChange={onInputChange('currency')}
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
            {!activeUser && (
                <TextField
                    onChange={onInputChange('sender_id')}
                    value={newTransaction.sender_id}
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
            )}
            <TextField
                onChange={onInputChange('receiver_id')}
                value={newTransaction.receiver_id}
                select
                size="small"
                helperText="Receiver"
                variant="standard"
            >
                {users.map(user => (
                    <MenuItem key={user.id} value={user.id}>
                        {user.name}
                    </MenuItem>
                ))}
            </TextField>
            <Button onClick={onSubmit} variant="contained">Submit</Button>
        </FormContainer>
    );
};

export default TransactionForm;
