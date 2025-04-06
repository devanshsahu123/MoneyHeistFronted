import React, { useEffect, useState, useCallback } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    IconButton, TablePagination, Select, MenuItem, FormControl, InputLabel, TextField,
    Box, Typography, CircularProgress
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

const TransactionHistory = () => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filter, setFilter] = useState({
        type: "",
        transactionType: "",
        depositStatus: "0", // Default to "Pending"
        search: "",
    });

    // Fetch Transactions based on Filters
    const fetchTransactions = useCallback(async () => {
        if (!filter.depositStatus) return; // Mandatory condition

        setLoading(true);
        try {
            const queryParams = new URLSearchParams(filter).toString();
            const response = await fetch(`${apiUrl}/admin/transaction?${queryParams}`);
            const data = await response.json();

            if (data.success) {
                setTransactions(data.data);
                setError("");
            } else {
                setError("Failed to fetch transactions.");
            }
        } catch (err) {
            setError("Error fetching data.");
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    // Handle Approve / Reject actions
    const handleAction = async (id, userId, action, transactionType) => {
        try {
            const response = await fetch(`${apiUrl}/admin/transaction`, {
                method: action === "reject" ? "DELETE" : "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: id, userId, transactionType })
            });

            const data = await response.json();
            if (data.success) {
                alert(`Transaction ${action}ed successfully!`);
                fetchTransactions(); // Refresh data
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert(`Error ${action}ing transaction.`);
        }
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

                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>Deposit Status</InputLabel>
                    <Select
                        value={filter.depositStatus}
                        onChange={(e) => setFilter({ ...filter, depositStatus: e.target.value })}
                    >
                        <MenuItem value="0">Pending</MenuItem>
                        <MenuItem value="1">Approved</MenuItem>
                        <MenuItem value="2">Rejected</MenuItem>
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
                                    <TableCell>Deposit Status</TableCell>
                                    <TableCell>Created At</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((txn) => (
                                        <TableRow key={txn._id}>
                                            <TableCell>{txn.userId?.name || "N/A"}</TableCell>
                                            <TableCell>{txn.userId?.email || "N/A"}</TableCell>
                                            <TableCell>{txn.transactionId}</TableCell>
                                            <TableCell>{txn.type}</TableCell>
                                            <TableCell>${txn.amount}</TableCell>
                                            <TableCell>{txn.transactionType}</TableCell>
                                            <TableCell>
                                                {txn.depositStatus === 0 ? "Pending" :
                                                    txn.depositStatus === 1 ? "Approved" : "Rejected"}
                                            </TableCell>
                                            <TableCell>{new Date(txn.createdAt).toLocaleString()}</TableCell>
                                            <TableCell>
                                                {txn.depositStatus === 0 && (
                                                    <>
                                                        <IconButton
                                                            color="success"
                                                            onClick={() => handleAction(txn._id, txn.userId._id, "approve", txn.transactionType)}
                                                        >
                                                            <CheckCircle />
                                                        </IconButton>
                                                        <IconButton
                                                            color="error"
                                                            onClick={() => handleAction(txn._id, txn.userId._id, "reject", txn.transactionType)}
                                                        >
                                                            <Cancel />
                                                        </IconButton>
                                                    </>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Pagination */}
                    <TablePagination
                        component="div"
                        count={transactions.length}
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
