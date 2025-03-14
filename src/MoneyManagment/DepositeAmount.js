import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaWallet, FaTimes } from "react-icons/fa";
import NotificationAlert from "react-notification-alert";
import "react-notification-alert/dist/animate.css";
import "./css/DepositeAmount.css";
import axios from "axios"; // Import Axios

const DepositeAmount = ({ isOpen, onClose }) => {
    const [amount, setAmount] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [upiId, setUpiId] = useState("");
    const [step, setStep] = useState(1);
    const notifi = useRef();

    const notify = (msg, err) => {
        let color = err == false ? 'success' : 'danger';
        let options = {
            type: color,
            place: 'tr',
            message: (
                <div >
                    <div >
                        <b >{err == false ? 'Success' : 'Error'}</b> - {msg}.
                    </div>
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

    const handleAmountSubmit = () => {
        const depositAmount = parseFloat(amount);

        if (!depositAmount || depositAmount < 500) {
            notify("Minimum deposit amount is ₹500.", true);
            return;
        }

        setUpiId("upi123@bank"); // Example UPI ID, replace with dynamic value if needed
        setStep(2);
    };

    const validateTransactionId = (id) => {
        const upiRegex = /^[a-zA-Z0-9]{12,30}$/;
        return upiRegex.test(id);
    };

    const handleDeposit = async () => {
        if (!transactionId.trim() || !validateTransactionId(transactionId)) {
            notify("Invalid transaction ID! Enter a valid transaction ID.", true);
            return;
        }

        const userId =JSON.parse(localStorage.getItem('data'))?._id;

        try {
            const { data } = await axios.put("http://localhost:5000/deposit", {
                userId,
                transactionId,
                amount: parseFloat(amount),
            });

            notify(`Deposit Successful! Transaction ID: ${transactionId}`, false);

            // Reset fields after deposit
            setAmount("");
            setTransactionId("");
            setUpiId("");
            setStep(1);

            onClose();
        } catch (error) {
            console.error("Deposit Error:", error);
            const errorMessage = error.response?.data?.message || "Deposit failed. Please try again.";
            notify(errorMessage, true);
        }
    };

    const addAmount = (value) => {
        setAmount((prev) => (prev ? (parseFloat(prev) + value).toString() : value.toString()));
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <NotificationAlert ref={notifi} />

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
