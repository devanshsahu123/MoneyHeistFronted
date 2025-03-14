import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    IconButton, TablePagination, Select, MenuItem, FormControl, InputLabel, TextField,
    Box, Typography, CircularProgress
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filter, setFilter] = useState({
        type: "",
        transactionType: "",
        search: "",
    });

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch("http://localhost:5000/admin/transaction");
                const data = await response.json();

                if (data.success) {
                    setTransactions(data.data);
                } else {
                    setError("Failed to fetch transactions.");
                }
            } catch (err) {
                setError("Error fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    // Filter transactions
    const filteredTransactions = transactions.filter(txn =>
        (filter.type ? txn.type === filter.type : true) &&
        (filter.transactionType ? txn.transactionType === filter.transactionType : true) &&
        (filter.search ? txn.transactionId.includes(filter.search) || txn.userId?.name?.toLowerCase().includes(filter.search.toLowerCase()) : true)
    );

    // Handle Approve / Reject actions
    const handleAction = (id, action) => {
        alert(`Transaction ${id} ${action}d`);
        // Here you can implement an API call to approve/reject transaction
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
                Transaction History
            </Typography>

            {/* Filters */}
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={filter.type}
                        onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="credit">Credit</MenuItem>
                        <MenuItem value="debit">Debit</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Transaction Type</InputLabel>
                    <Select
                        value={filter.transactionType}
                        onChange={(e) => setFilter({ ...filter, transactionType: e.target.value })}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="referral">Referral</MenuItem>
                        <MenuItem value="deposit">Deposit</MenuItem>
                        <MenuItem value="withdraw">Withdraw</MenuItem>
                        <MenuItem value="claim">Claim</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="Search by Name or ID"
                    variant="outlined"
                    value={filter.search}
                    onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                />
            </Box>

            {/* Table */}
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <Paper sx={{ width: "100%", overflow: "hidden" }}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>User Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Transaction ID</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Transaction Type</TableCell>
                                    <TableCell>Created At</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredTransactions
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((txn) => (
                                        <TableRow key={txn._id}>
                                            <TableCell>{txn.userId?.name || "N/A"}</TableCell>
                                            <TableCell>{txn.userId?.email || "N/A"}</TableCell>
                                            <TableCell>{txn.transactionId}</TableCell>
                                            <TableCell>{txn.type}</TableCell>
                                            <TableCell>${txn.amount}</TableCell>
                                            <TableCell>{txn.transactionType}</TableCell>
                                            <TableCell>{new Date(txn.createdAt).toLocaleString()}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    color="success"
                                                    onClick={() => handleAction(txn._id, "approve")}
                                                >
                                                    <CheckCircle />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleAction(txn._id, "reject")}
                                                >
                                                    <Cancel />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    <TablePagination
                        component="div"
                        count={filteredTransactions.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />
                </Paper>
            )}
        </Box>
    );
};

export default TransactionHistory;
