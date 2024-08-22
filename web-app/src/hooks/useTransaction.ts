import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTransactions } from "./useTransactions";
import { useAuth } from "./useAuth";
import React from "react";
import { RootState } from "../store/store";
import {
  updateNewTransactionField,
  resetNewTransaction,
} from "../store/transactions/slice";

export const useTransaction = () => {
  const dispatch = useDispatch();
  const newTransaction = useSelector(
    (state: RootState) => state.transactions.transactionToSubmit
  );
  const { addTransaction, getTransactions } = useTransactions({});
  const { profile } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleInputChange =
    (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      dispatch(updateNewTransactionField({ field, value }));
    };

  const setFieldValue = (field: string, value: any) => {
    dispatch(updateNewTransactionField({ field, value }));
  };

  const submitForm = async () => {
    try {
      const transactionToSubmit = {
        ...newTransaction,
        sender_id: profile?.id!,
        date_time: new Date().toISOString(),
      };
      await addTransaction(transactionToSubmit);
      setOpen(false);
    } catch (error) {
      console.error("Failed to submit transaction", error);
    } finally {
      await getTransactions();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(resetNewTransaction());
  };

  return {
    newTransaction,
    open,
    handleInputChange,
    setFieldValue,
    submitForm,
    handleClickOpen,
    handleClose,
  };
};
