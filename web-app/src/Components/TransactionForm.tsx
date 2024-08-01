import React, { ChangeEvent } from 'react';
import { TextField, MenuItem, Button, Box, styled } from '@mui/material';
import { Transaction } from '../api/transactions';
import { Profile } from '../api/auth';
import { User } from '../api/users';
import { TransactionToSubmit } from '../api/transactions/types';

const FormContainer = styled(Box)({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
});

interface TransactionFormProps {
    newTransaction: TransactionToSubmit;
    users: User[];
    activeUser?: Profile;
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
        <Box sx={{ display: "flex", flexDirection: "column", width: 400, gap: 1 }}>
            <FormContainer>
                <TextField
                    onChange={onInputChange('amount')}
                    value={newTransaction.amount}
                    size="small"
                    helperText="Amount"
                    type="number"
                />
                <TextField
                    onChange={onInputChange('currency')}
                    value={newTransaction.currency}
                    select
                    size="small"
                    helperText="Currency"
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
                >
                    {users.map(user => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.name}
                        </MenuItem>
                    ))}
                </TextField>

            </FormContainer>
            <Button onClick={onSubmit} variant="contained">Submit</Button>
        </Box>
    );
};

export default TransactionForm;
