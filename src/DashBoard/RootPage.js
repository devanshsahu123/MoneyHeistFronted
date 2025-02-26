import React from "react";
import { motion } from "framer-motion";
import { FaWallet, FaGift, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RootPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <style>
                {`
                    body {
                        margin: 0;
                        font-family: 'Arial', sans-serif;
                    }
                    .home-container {
                        text-align: center;
                        min-height: 100vh;
                        background: linear-gradient(to bottom, #7e57c2, #3f51b5);
                        color: white;
                        padding: 50px 20px;
                        position: relative;
                    }
                    .nav-buttons {
                        position: absolute;
                        top: 20px;
                        right: 20px;
                        display: flex;
                        gap: 10px;
                    }
                    .nav-button {
                        background: white;
                        color: #3f51b5;
                        padding: 8px 16px;
                        font-size: 1rem;
                        font-weight: bold;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: background 0.2s ease-in-out;
                    }
                    .nav-button:hover {
                        background: #e0e0e0;
                    }
                    .hero-section {
                        max-width: 800px;
                        margin: auto;
                    }
                    .hero-title {
                        font-size: 2.8rem;
                        font-weight: bold;
                    }
                    .hero-subtitle {
                        font-size: 1.2rem;
                        margin-top: 10px;
                        color: #e0e0e0;
                    }
                    .cta-button {
                        background: #ffcc00;
                        color: #333;
                        padding: 12px 24px;
                        font-size: 1.2rem;
                        font-weight: bold;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        margin-top: 20px;
                        transition: transform 0.2s ease-in-out;
                    }
                    .cta-button:hover {
                        transform: scale(1.05);
                        background: #ffb300;
                    }
                    .features-section {
                        margin-top: 50px;
                        display: flex;
                        justify-content: center;
                        gap: 20px;
                        flex-wrap: wrap;
                    }
                    .feature-card {
                        background: white;
                        color: #333;
                        padding: 20px;
                        border-radius: 12px;
                        width: 250px;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                        text-align: center;
                    }
                    .feature-icon {
                        font-size: 2.5rem;
                        color: #3f51b5;
                        margin-bottom: 10px;
                    }
                    .footer {
                        margin-top: 50px;
                        font-size: 0.9rem;
                        color: #e0e0e0;
                    }
                `}
            </style>

            <div className="home-container">
                {/* Top Right Buttons */}
                <div className="nav-buttons">
                    <button className="nav-button" onClick={() => navigate('/login')}>Login</button>
                    <button className="nav-button" onClick={() => navigate('/signup')}>Signup</button>
                </div>

                {/* Hero Section */}
                <motion.div
                    className="hero-section"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="hero-title">Start Earning with Investment Daily</h1>
                    <p className="hero-subtitle">
                        Deposit funds, purchase investment products, and claim daily rewards!
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="cta-button"
                        onClick={() => navigate('/login')}
                    >
                        Start Investing
                    </motion.button>
                </motion.div>

                {/* Features Section */}
                <div className="features-section">
                    <motion.div
                        className="feature-card"
                        whileHover={{ scale: 1.05 }}
                    >
                        <FaWallet className="feature-icon" />
                        <h3>Deposit Funds</h3>
                        <p>Securely deposit money into your account to start investing.</p>
                    </motion.div>

                    <motion.div
                        className="feature-card"
                        whileHover={{ scale: 1.05 }}
                    >
                        <FaGift className="feature-icon" />
                        <h3>Claim Daily Rewards</h3>
                        <p>Earn daily rewards on your purchased investment products.</p>
                    </motion.div>

                    <motion.div
                        className="feature-card"
                        whileHover={{ scale: 1.05 }}
                    >
                        <FaMoneyBillWave className="feature-icon" />
                        <h3>Redeem Earnings</h3>
                        <p>Withdraw your profits anytime and enjoy financial freedom.</p>
                    </motion.div>
                </div>

                {/* Footer */}
                <div className="footer">
                    © 2025 Investment Daily | Secure Investments, Daily Rewards, Easy Withdrawals.
                </div>
            </div>
        </>
    );
};

export default RootPage;
