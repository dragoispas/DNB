import { TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Table, styled, TablePagination, Typography } from "@mui/material";
import { TransactionsMap } from "../store/transactions/types";

const StyledTable = styled(Table)({
    minWidth: 650,
});

interface Props {
    transactions: TransactionsMap;
    userId: number;
    currentPage: number;
    totalPages: number;
    rowsPerPage: number;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const UserTransactionsTable: React.FC<Props> = ({
    transactions,
    userId,
    currentPage,
    totalPages,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
}) => {
    return (
        <Paper sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center" }}>
            <TableContainer>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>Transaction ID</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Currency</TableCell>
                            <TableCell align="right">Transaction Type</TableCell>
                            <TableCell align="right">Date Time</TableCell>
                            <TableCell align="right">Collaborator ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.values(transactions).map(row => (
                            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{row.currency}</TableCell>
                                <TableCell align="right">
                                    {userId === row.sender_id ? "Credited" : "Debited"}
                                </TableCell>
                                <TableCell align="right">{row.date_time}</TableCell>
                                <TableCell align="right">
                                    {userId === row.sender_id ? row.receiver_id : row.sender_id}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
            <TablePagination
                component="div"
                count={totalPages * rowsPerPage} // This should be the total number of items
                page={currentPage}
                onPageChange={onPageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </Paper>
    );
};

export default UserTransactionsTable;
