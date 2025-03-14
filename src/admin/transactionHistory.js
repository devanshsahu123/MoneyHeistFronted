import React, { useEffect, useState } from "react";

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    return (
        <div>
            <h2>Transaction History</h2>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <table border="1">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Transaction ID</th>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Transaction Type</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((txn) => (
                            <tr key={txn._id}>
                                <td>{txn.userId?.name || "N/A"}</td>
                                <td>{txn.userId?.email || "N/A"}</td>
                                <td>{txn.transactionId}</td>
                                <td>{txn.type}</td>
                                <td>{txn.amount}</td>
                                <td>{txn.transactionType}</td>
                                <td>{new Date(txn.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TransactionHistory;
