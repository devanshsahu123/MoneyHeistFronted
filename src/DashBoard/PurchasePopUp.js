import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa"; // Import close icon
import "./css/PurchasePopUp.css";

const PurchasePopUp = ({ investment, onClose }) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleConfirmPurchase = () => {
        alert(`Purchased ${quantity} of ${investment.heading} for ₹${(quantity * parseFloat(investment.investAmount)).toFixed(2)}`);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <motion.div
                className="modal-content"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <div>

             

                {/* Close Icon */}
                <button className="close-icon" onClick={onClose}>
                    <FaTimes />
                </button>

                {/* Product Details */}
                <h2>{investment.heading}</h2>
                <img className="product-image" src={investment.image} alt={investment.heading} />

                    <p><strong>Invest Amount:</strong> ₹{investment.investAmount}</p>
                    <p><strong>Day Income:</strong> ₹{investment.dayIncome}</p>
                    <p><strong>Total Income:</strong> ₹{investment.dayIncome * investment.earningsDays}</p>
                <p><strong>Earnings Days:</strong> {investment.earningsDays}</p>

                {/* Quantity Selector */}
                <div className="quantity-container">
                    <button className="quantity-btn" onClick={handleDecrease}>-</button>
                    <span className="quantity">{quantity}</span>
                    <button className="quantity-btn" onClick={handleIncrease}>+</button>
                </div>
                {console.log('checking', quantity, investment)}
                <p><strong>Total Price:</strong> ₹{(quantity * parseFloat(investment.investAmount)).toFixed(2)}</p>

                </div>
                <div className="button-container">
                    <button className="confirm-button" onClick={handleConfirmPurchase}>
                        Confirm Purchase
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default PurchasePopUp;
