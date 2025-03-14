import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaWallet, FaTimes } from "react-icons/fa";
import "./css/DepositeAmount.css";

const DepositeAmount = ({ isOpen, onClose }) => {
    const [amount, setAmount] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [upiId, setUpiId] = useState("");
    const [step, setStep] = useState(1);

    const handleAmountSubmit = () => {
        const depositAmount = parseFloat(amount);

        if (!depositAmount || depositAmount < 500) {
            alert("Minimum deposit amount is ₹500.");
            return;
        }

        setUpiId("upi123@bank"); // Example UPI ID, replace with dynamic value if needed
        setStep(2);
    };

    const handleDeposit = () => {
        if (!transactionId.trim()) {
            alert("Please enter a valid UPI Transaction ID.");
            return;
        }

        alert(`Depositing ₹${amount} with Transaction ID: ${transactionId}`);

        // Reset fields after deposit
        setAmount("");
        setTransactionId("");
        setUpiId("");
        setStep(1);

        onClose();
    };

    const addAmount = (value) => {
        setAmount((prev) => (prev ? (parseFloat(prev) + value).toString() : value.toString()));
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <motion.div
                className="modal-content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
            >
                {/* Close Button */}
                <button className="close-button" onClick={onClose}>
                    <FaTimes />
                </button>

                {/* Header */}
                <div className="deposit-header">
                    <FaWallet className="wallet-icon" />
                    <h2>Deposit Amount</h2>
                </div>

                {/* Step 1: Enter Amount */}
                {step === 1 && (
                    <>
                        <div className="input-section">
                            <input
                                type="number"
                                placeholder="Enter amount (₹)"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="amount-input"
                            />
                        </div>

                        <p className="error-text">
                            {amount && parseFloat(amount) < 500 ? "Minimum deposit is ₹500" : ""}
                        </p>

                        {/* Quick Add Amount Buttons */}
                        <div className="quick-add-buttons">
                            {[500, 1000, 5000].map((value, index) => (
                                <motion.div
                                    key={index}
                                    className="extra-deposit-box"
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => addAmount(value)}
                                >
                                    <p>+₹{value}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Proceed Button */}
                        <motion.button
                            className="deposit-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleAmountSubmit}
                            disabled={!amount || parseFloat(amount) < 500}
                        >
                            Proceed to Payment
                        </motion.button>
                    </>
                )}

                {/* Step 2: Show UPI ID & Enter Transaction ID */}
                {step === 2 && (
                    <>
                        <div className="upi-info">
                            <p className="upi-instruction">
                                Send ₹{amount} to the following UPI ID:
                            </p>
                            <div className="upi-id-box">{upiId}</div>
                            <p className="upi-instruction">
                                After payment, enter the UPI Transaction ID below:
                            </p>
                        </div>

                        {/* Transaction ID Input Field */}
                        <div className="input-section">
                            <input
                                type="text"
                                placeholder="Enter UPI Transaction ID"
                                value={transactionId}
                                onChange={(e) => setTransactionId(e.target.value)}
                                className="transaction-input"
                            />
                        </div>

                        {/* Deposit Button */}
                        <motion.button
                            className="deposit-button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleDeposit}
                        >
                            Deposit
                        </motion.button>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default DepositeAmount;
