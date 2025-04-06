import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import "./css/WithdrawPage.css";
import ReactNotificationAlert from "react-notification-alert";

const WithdrawPage = () => {
    const navigate = useNavigate();
    const [availableBalance, setAvailableBalance] = useState(0);
    const minWithdrawal = 100;
    const userId = JSON.parse(localStorage.getItem('data'))?._id;
    const [amount, setAmount] = useState("");
    const [upiId, setUpiId] = useState(null);
    const [method, setMethod] = useState("Bank Transfer");
    const [errorMessage, setErrorMessage] = useState("");
    const notifi = useRef();

    const notify = (msg, err) => {
        let color = err === false ? 'success' : 'danger';
        let options = {
            type: color,
            place: 'tr',
            message: (
                <div>
                    <b>{err === false ? 'Success' : 'Error'}</b> - {msg}.
                </div>
            ),
            icon: 'tim-icons icon-bell-55',
            autoDismiss: 6,
            closeButton: false,
        };
        if (notifi.current) {
            notifi.current.notificationAlert(options);
        }
    };

    // Fetch UPI ID and balance
    useEffect(() => {
        const fetchUpiId = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/upi?userId=${userId}`);
                setUpiId(response.data);
                setAvailableBalance(response.data.withdrawAmount); // Assuming API sends withdrawAmount
            } catch (error) {
                notify("Error fetching UPI ID", true);
                console.error("Error fetching UPI ID:", error);
            }
        };
        fetchUpiId();
    }, [userId]);

    const handleAmountChange = (e) => {
        const value = parseFloat(e.target.value);
        setAmount(value);

        if (!value || value <= 0) {
            setErrorMessage("Please enter a valid withdrawal amount.");
        } else if (value < minWithdrawal) {
            setErrorMessage(`Minimum withdrawal amount is ₹${minWithdrawal}.`);
        } else if (value > availableBalance) {
            setErrorMessage("Insufficient balance.");
        } else {
            setErrorMessage("");
        }
    };

    const handleWithdraw = async () => {
        if (!amount || amount < minWithdrawal || amount > availableBalance) return;

        try {
            const response = await axios.put("http://localhost:5000/withdraw-request", {
                userId,
                amount,
            });

            if (response.data.success) {
                notify("Withdrawal request submitted successfully", false);
                setAvailableBalance(prev => prev - amount);
                setAmount("");
            } else {
                notify(response.data.message || "Withdrawal failed", true);
            }
        } catch (error) {
            console.error("Withdrawal error:", error);
            notify(error.response?.data?.message || "Something went wrong", true);
        }
    };

    return (
        <div className="withdraw-container">
            <ReactNotificationAlert ref={notifi} />

            <div className="header">
                <IoArrowBack className="back-arrow" onClick={() => navigate(-1)} />
                <h2>Withdraw Funds</h2>
            </div>

            <h3>Available Balance: ₹{availableBalance}</h3>

            <div className="input-group">
                <label>Select Payment Method</label>
                <select value={method} onChange={(e) => setMethod(e.target.value)}>
                    <option value="UPI">{`UPI (${upiId?.upiId || "Not Linked"})`}</option>
                </select>
            </div>

            <p><strong>Minimum Withdrawal:</strong> ₹{minWithdrawal}</p>

            <div className="input-group">
                <label>Enter Amount (₹)</label>
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={handleAmountChange}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>

            <div className="balance-details">
                <p>Withdrawals take <strong>48 hours</strong> to reflect in your bank account.</p>
                <p> <strong>Note:</strong> 10% withdraw Charge</p>
            </div>

            {!upiId?.upiId ? (
                <button className="link-bank-button" onClick={() => navigate("/link-account")}>
                    Link UPI Account
                </button>
            ) : (
                <>
                    {method === "UPI" && (
                        <div className="input-group">
                            <label>UPI ID</label>
                            <input type="text" value={upiId?.upiId} readOnly />
                        </div>
                    )}

                    {amount && !errorMessage && (
                        <div className="withdraw-summary">
                            <h3>Withdrawal Summary</h3>
                            <p><strong>Amount:</strong> ₹{amount}</p>
                            <p><strong>Method:</strong> {method}</p>
                        </div>
                    )}

                    <button
                        className="withdraw-button"
                        onClick={handleWithdraw}
                        disabled={!!errorMessage}
                    >
                        Withdraw Now
                    </button>
                </>
            )}
        </div>
    );
};

export default WithdrawPage;
