import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ChangeEvent, useEffect } from "react";
import { TransactionToSubmit } from "../api/transactions/types";
import { User } from "../api/users";
import { useTransaction } from "../hooks/useTransaction";
import TransactionForm from "./TransactionForm";
import CloseIcon from "@mui/icons-material/Close";

const currencies = [
  { value: "USD", label: "$" },
  { value: "EUR", label: "€" },
  { value: "BTC", label: "฿" },
  { value: "JPY", label: "¥" },
];

interface TransactionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  newTransaction: TransactionToSubmit;
  users: User[];
  onInputChange: (
    field: string
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
}

const TransactionDialog: React.FC<TransactionDialogProps> = ({
  open,
  onClose,
  onSubmit,
  newTransaction,
  users,
  onInputChange,
}) => {
  const { setFieldValue, handleClose } = useTransaction();

  const handleRecipientIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setFieldValue("receiver_id", value);
  };

  const handleUserSelect = (user: User) => {
    setFieldValue("receiver_id", user.id);
  };

  const handleContinue = () => {
    const user = users.find((user) => user.id === newTransaction.receiver_id);
    if (user) {
      setFieldValue("selectedUser", user); // You can add this to your state management if needed
    }
  };

  useEffect(() => {
    if (!newTransaction.receiver_id) {
      setFieldValue("receiver_id", null);
    }
  }, [open, newTransaction.receiver_id, setFieldValue]);

  const selectedUser = users.find(
    (user) => user.id === newTransaction.receiver_id
  );

  const onDialogClose = () => {
    onClose();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={onDialogClose}>
      <DialogTitle>
        {selectedUser ? "Transfer" : "Select Recipient"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {!selectedUser ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "300px",
            }}
          >
            {users.length > 0 && (
              <List>
                {users.map((user) => (
                  <ListItem
                    button
                    key={user.id}
                    onClick={() => handleUserSelect(user)}
                  >
                    <ListItemText
                      primary={user.name}
                      secondary={`ID: ${user.id}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        ) : (
          <TransactionForm
            newTransaction={newTransaction}
            recipient={selectedUser}
            currencies={currencies}
            onInputChange={onInputChange}
            onSubmit={onSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;
