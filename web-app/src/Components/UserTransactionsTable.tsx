import { Transaction } from "../api";
import { TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Table, styled } from "@mui/material";

const StyledTable = styled(Table)({
    minWidth: 650,
});

interface Props {
    transactions: Transaction[];
    userId: number;
}

const UserTransactionsTable: React.FC<Props> = ({ transactions, userId }) => {
    return (
        <TableContainer component={Paper}>
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
                    {transactions.map(row => (
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
    );
};

export default UserTransactionsTable;
