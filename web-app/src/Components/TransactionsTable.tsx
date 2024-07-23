import { Transaction } from "../api";
import { TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Table, styled } from "@mui/material";

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
                        <TableCell>Transaction</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Currency</TableCell>
                        <TableCell align="right">Transaction Type</TableCell>
                        <TableCell align="right">Date Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map(row => (
                        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">{row.id}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                            <TableCell align="right">{row.currency}</TableCell>
                            <TableCell align="right">{row.is_incoming ? "Incoming" : "Outgoing"}</TableCell>
                            <TableCell align="right">{row.date_time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </TableContainer>
    )
}

export default TransactionsTable;