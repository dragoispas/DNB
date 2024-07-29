import { TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Table, styled } from "@mui/material";
import { Transaction } from "../api/transactions";

const StyledTable = styled(Table)({
    minWidth: 650,
});

interface Props {
    transactions: Transaction[]
}

const TransactionsTable: React.FC<Props> = ({ transactions }) => {
    return (
        <TableContainer component={Paper}>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>Transaction ID</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Currency</TableCell>
                        <TableCell align="right">Date Time</TableCell>
                        <TableCell align="right">Sender ID</TableCell>
                        <TableCell align="right">Receiver ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map(row => (
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">{row.id}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                            <TableCell align="right">{row.currency}</TableCell>
                            <TableCell align="right">{row.date_time}</TableCell>
                            <TableCell align="right">{row.sender_id}</TableCell>
                            <TableCell align="right">{row.receiver_id}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </TableContainer>
    )
}

export default TransactionsTable;
