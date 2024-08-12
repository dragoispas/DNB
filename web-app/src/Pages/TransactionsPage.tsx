import React, { useEffect } from "react";
import { Box, styled, Typography, Button } from "@mui/material";
import UserAvatar from "../Components/UserAvatar";
import UserTransactionsTable from "../Components/UserTransactionsTable";
import { useAuth } from "../hooks/useAuth";
import { useTransactions } from "../hooks/useTransactions";
import { useUsers } from "../hooks/useUsers";
import TransactionDialog from "../Components/TransactionDialog";
import { useTransaction } from "../hooks/useTransaction";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 30,
  margin: 30,
});

const Transactions: React.FC = () => {
  const {
    transactions,
    transactionsCount,
    currentPage,
    transactionsPerPage,
    getTransactions,
    setCurrentPage,
    setTransactionsPerPage,
  } = useTransactions({});
  const { profile, getProfile } = useAuth();
  const { users, getUsers } = useUsers();
  const {
    newTransaction,
    open,
    handleInputChange,
    submitForm,
    handleClickOpen,
    handleClose,
  } = useTransaction();

  useEffect(() => {
    if (!profile) getProfile();
    if (Object.keys(users).length === 0) getUsers();
    if (Object.keys(transactions).length === 0) getTransactions();
  }, []);

  if (!profile) return null;

  const handlePageChange = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTransactionsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <Container>
      {profile ? <UserAvatar user={profile} /> : null}
      <UserTransactionsTable
        transactions={transactions}
        userId={profile?.id!}
        totalPages={Math.ceil(transactionsCount / transactionsPerPage)}
        currentPage={currentPage}
        totalItems={transactionsCount}
        onPageChange={handlePageChange}
        rowsPerPage={transactionsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {profile && (
        <Typography>{`Account Balance: ${profile.balance} EUR`}</Typography>
      )}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        New Transaction
      </Button>
      <TransactionDialog
        open={open}
        onClose={handleClose}
        onSubmit={submitForm}
        newTransaction={newTransaction}
        users={Object.values(users)}
        onInputChange={handleInputChange}
      />
    </Container>
  );
};

export default Transactions;
