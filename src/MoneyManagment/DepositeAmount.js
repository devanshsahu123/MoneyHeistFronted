import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaWallet, FaTimes } from "react-icons/fa";
import "./css/DepositeAmount.css";

const DepositeAmount = ({ isOpen, onClose }) => {
    const [amount, setAmount] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [upiId, setUpiId] = useState(""); // UPI ID will be shown after amount entry
    const [step, setStep] = useState(1); // Step-wise process

    const handleAmountSubmit = () => {
        if (!amount || parseFloat(amount) <= 0) {
            alert("Please enter a valid deposit amount.");
            return;
        }

        // Generate or fetch UPI ID (Here, using a static UPI ID for example)
        setUpiId("upi123@bank"); // Replace this with a dynamic UPI ID if needed

        // Move to step 2 (Enter transaction ID)
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
        setStep(1); // Reset to first step

        onClose(); // Close modal after deposit
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

                        {/* Quick Add Amount Buttons */}
                        <div className="quick-add-buttons">
                            {[100, 500, 1000, 5000].map((value, index) => (
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
