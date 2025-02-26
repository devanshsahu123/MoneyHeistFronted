import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "./css/WithdrawPage.css";

const WithdrawPage = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState("");
    const [hasBankAccount, setHasBankAccount] = useState(false);
    const [upiId, setUpiId] = useState("upi@bank");
    const [method, setMethod] = useState("Bank Transfer");

    const handleWithdraw = () => {
        if (!amount || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }
        alert(`Withdraw Request: ₹${amount} via ${method}`);
    };

    return (
        <div className="withdraw-container">
            <div className="header">
                <IoArrowBack className="back-arrow" onClick={() => navigate(-1)} />
                <h2>Withdraw Funds</h2>
            </div>

            <div className="input-group">
                <label>Enter Amount (₹)</label>
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            {hasBankAccount ? (
                <>
                    <div className="input-group">
                        <label>Select Payment Method</label>
                        <select value={method} onChange={(e) => setMethod(e.target.value)}>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="UPI">UPI</option>
                        </select>
                    </div>

                    {method === "UPI" && (
                        <div className="input-group">
                            <label>UPI ID</label>
                            <input type="text" value={upiId} readOnly />
                        </div>
                    )}

                    <button className="withdraw-button" onClick={handleWithdraw}>
                        Withdraw Now
                    </button>
                </>
            ) : (
                <button className="link-bank-button" onClick={() => setHasBankAccount(true)}>
                    Link Bank Account
                </button>
            )}
        </div>
    );
};

export default WithdrawPage;
