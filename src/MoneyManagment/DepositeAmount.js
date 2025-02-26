import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaWallet, FaTimes } from "react-icons/fa";
import "./css/DepositeAmount.css";

const DepositeAmount = ({ isOpen, onClose }) => {
    const [amount, setAmount] = useState("");

    const handleDeposit = () => {
        if (amount && parseFloat(amount) > 0) {
            alert(`Depositing ₹${amount}`);
            setAmount("");
            onClose(); // Close modal after deposit
        } else {
            alert("Please enter a valid amount");
        }
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

                {/* Input Field */}
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

                {/* Deposit Button */}
                <motion.button
                    className="deposit-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDeposit}
                >
                    Deposit
                </motion.button>
            </motion.div>
        </div>
    );
};

export default DepositeAmount;
