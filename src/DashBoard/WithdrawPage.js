import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios"; // Import Axios for API calls
import "./css/WithdrawPage.css";

const WithdrawPage = () => {
    const navigate = useNavigate();
const [availableBalance, setAvailableBalance] = useState(0);

    const minWithdrawal = 100;
    const userId = JSON.parse(localStorage.getItem('data'))?._id; // Replace with dynamic user ID

    const [amount, setAmount] = useState("");
    const [upiId, setUpiId] = useState(null);
    const [method, setMethod] = useState("Bank Transfer");
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch UPI ID from API
    useEffect(() => {
        const fetchUpiId = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/upi?userId=${userId}`);
                console.log(response.data,"response.data");
                setUpiId(response.data);
                setAvailableBalance(response.data.withdrawAmount); // Assuming the API returns available balance
            } catch (error) {
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

    const handleWithdraw = () => {
        if (!amount || amount < minWithdrawal || amount > availableBalance) return;
        alert(`Withdraw Request: ₹${amount} via ${method}. Your request will be processed within 48 hours.`);
    };

    return (
        <div className="withdraw-container">
            {/* Header */}
            <div className="header">
                <IoArrowBack className="back-arrow" onClick={() => navigate(-1)} />
                <h2>Withdraw Funds</h2>
            </div>

            {/* Balance & Minimum Withdrawal Info */}

            {/* Amount Input */}
                <h3>Available Balance: ₹{availableBalance}</h3>
                    <div className="input-group">
                        <label>Select Payment Method</label>
                        <select value={method} onChange={(e) => setMethod(e.target.value)}>
                            <option value="UPI">{`UPI (${upiId?.upiId})`}</option>
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
            </div>

            {/* If UPI is NOT linked, show "Link UPI" button */}
            {!upiId?.upiId ? (
                <button className="link-bank-button" onClick={() => navigate("/link-account")}>
                    Link UPI Account
                </button>
            ) : (
                <>
                    {/* Payment Method Selection */}

                    {method === "UPI" && (
                        <div className="input-group">
                            <label>UPI ID</label>
                            <input type="text" value={upiId} readOnly />
                        </div>
                    )}

                    {/* Withdrawal Summary */}
                    {amount && !errorMessage && (
                        <div className="withdraw-summary">
                            <h3>Withdrawal Summary</h3>
                            <p><strong>Amount:</strong> ₹{amount}</p>
                            <p><strong>Method:</strong> {method}</p>
                        </div>
                    )}

                    {/* Withdraw Button */}
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
