import styled from "@emotion/styled";
import { Box, TextField, MenuItem, Typography, Button } from "@mui/material";
import { ChangeEvent } from "react";
import { TransactionToSubmit } from "../api/transactions/types";
import { User } from "../api/users";

const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
});

interface TransactionFormProps {
  newTransaction: TransactionToSubmit;
  recipient: User;
  currencies: { value: string; label: string }[];
  onInputChange: (
    field: string
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  newTransaction,
  recipient,
  currencies,
  onInputChange,
  onSubmit,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormContainer>
        <TextField
          onChange={onInputChange("amount")}
          value={newTransaction.amount}
          size="small"
          helperText="Amount"
          type="number"
        />
        <TextField
          onChange={onInputChange("currency")}
          value={newTransaction.currency}
          select
          size="small"
          helperText="Currency"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </FormContainer>
      <Box>
        <Typography variant="body2" color="textSecondary">
          Recipient ID: {recipient.id}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Recipient Name: {recipient.name}
        </Typography>
      </Box>
      <Button onClick={onSubmit} variant="contained">
        Submit
      </Button>
    </Box>
  );
};

export default TransactionForm;
