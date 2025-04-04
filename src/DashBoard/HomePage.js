import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaWallet,
    FaUsers,
    FaTasks,
    FaStar,
    FaMoneyBillWave,
    FaUserFriends,
    FaInfoCircle,
    FaUserCircle,
    FaUniversity, // Used for Link Account
    FaSignOutAlt
} from "react-icons/fa";
import "./css/HomePage.css";
import PurchasePopUp from "./PurchasePopUp";
import DepositeAmount from "../MoneyManagment/DepositeAmount";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
    const navigate = useNavigate();
    const [selectedInvestment, setSelectedInvestment] = useState(null);
    const [isDepositeModalOpen, setIsDepositeModalOpen] = useState(false);
    const [hotInvestments, setHotInvestments] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/products");
            setHotInvestments(response.data); // Store API response in state
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const getUserInfo = async () => {
        try {
            const response = await axios.get("http://localhost:5000/userInfo",{
                params: {
                    userId: JSON.parse(localStorage.getItem('data'))?._id
                }
            });

            setUserInfo(response.data.data); 
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    useEffect(() => {
        getUserInfo();
        fetchProducts();
    }, []);

    // const hotInvestments = [
    //     {
    //         vip: "VIP2",
    //         image: "https://dummyimage.com/600x400/000/fff",
    //         title: "Medtronic-2",
    //         dayIncome: "880",
    //         days: "3 Days",
    //         totalIncome: "2640",
    //         investAmount: "1600.00",
    //     },
    //     {
    //         vip: "VIP3",
    //         image: "https://dummyimage.com/600x400/000/fff",
    //         title: "Tesla-3",
    //         dayIncome: "1500",
    //         days: "5 Days",
    //         totalIncome: "7500",
    //         investAmount: "5000.00",
    //     },
    //     {
    //         vip: "VIP4",
    //         image: "https://dummyimage.com/600x400/000/fff",
    //         title: "Amazon-4",
    //         dayIncome: "2500",
    //         days: "7 Days",
    //         totalIncome: "17500",
    //         investAmount: "10000.00",
    //     },
    //     {
    //         vip: "VIP5",
    //         image: "https://dummyimage.com/600x400/000/fff",
    //         title: "Google-5",
    //         dayIncome: "4000",
    //         days: "10 Days",
    //         totalIncome: "40000",
    //         investAmount: "20000.00",
    //     },
    // ];

    return (
        <div className="homepage">
            {/* Logo */}
            <div className="logo-container">
                <img src="https://via.placeholder.com/120x50?text=LOGO" alt="Company Logo" className="logo" />
            </div>

            {/* User ID Section with Redeem Icon */}
            <div className="user-id-section">
                <FaUserCircle className="user-icon" />
                <div>
                    <h2 className="user-name">{userInfo.name}</h2>
                    <p className="user-id" style={{color:"#FFF"}}>ID: {userInfo._id}</p>
                </div>
                <FaSignOutAlt className="redeem-icon" />
            </div>

            {/* Amounts Section */}
            <div className="amount-container">
                <div className="amount-box">
                    <p className="amount-label">Withdraw Amount</p>
                    <p className="amount-value">₹{userInfo.withdrawAmount}</p>
                </div>
                <div className="amount-box">
                    <p className="amount-label">Deposit Amount</p>
                    <p className="amount-value">₹{userInfo.depositAmount}</p>
                </div>
            </div>

            {/* Feature Buttons (Main Options) */}
            <div className="features-grid">
                {[
                    { icon: <FaWallet />, label: "Deposit", funct: () => { setIsDepositeModalOpen(true) } },
                    { icon: <FaMoneyBillWave />, label: "Withdraw", funct: () => { navigate('/withdraw') } },
                    { icon: <FaStar />, label: "VIP Club", funct: () => { navigate('/vip-club') } },
                    { icon: <FaUniversity />, label: "Link Account", funct: () => { navigate('/link-account') } }
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        className="feature-box"
                        whileHover={{ scale: 1.1 }}
                        onClick={item.funct}
                    >
                        <div className="feature-icon">{item.icon}</div>
                        <p style={{ color: "#fff" }}>{item.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Extra Features Section */}
            <div className="extra-section">
                {[
                    { icon: <FaTasks />, label: "My Tasks", funct: () => { navigate('/my-task') } },
                    { icon: <FaUsers />, label: "My Team", funct: () => { navigate('/my-team') } },
                    { icon: <FaUserFriends />, label: "Invite Friends", funct: () => { navigate('/invite') } },
                    { icon: <FaInfoCircle />, label: "About Us", funct: () => { navigate('/about-us') } },
                ].map((item, index) => (
                    <motion.div
                        key={index}
                        className="extra-box"
                        whileHover={{ scale: 1.05 }}
                        onClick={item.funct}
                    >
                        <div className="feature-icon">{item.icon}</div>
                        <p >{item.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Hot Investment Section */}
            <div className="hot-investment-section">
                <h2 className="section-title">Hot Investments</h2>
                <div className="investment-grid">
                    {hotInvestments.map((investment, index) => (
                        <motion.div
                            key={index}
                            className="investment-card"
                            style={{ marginBottom: '20px' }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="vip-tag">VIP-{investment.vip}</span>
                            <div className="investment-header">
                                <div className="investment-image">
                                    <img src={investment.image} alt="Investment" />
                                </div>
                                <h3>{investment.heading}</h3>
                            </div>
                            <p>Day Income: <span className="bold">₹{investment.dayIncome}</span></p>
                            <p>Earnings Days: <span className="bold">{investment.earningsDays}</span></p>
                            <p>Total Income: <span className="bold">₹{investment.dayIncome * investment.earningsDays}</span></p>
                            <p>Invest Amount: <strong className="highlight" style={{color:'green'}}>₹{investment.investAmount}</strong></p>

                            {/* Purchase Button */}
                            <button
                                className="purchase-button"
                                onClick={() => { setSelectedInvestment(investment) }}
                            >
                                Purchase
                            </button>
                        </motion.div>
                    ))}
                </div>

            </div>
            {selectedInvestment && <PurchasePopUp investment={selectedInvestment} onClose={() => setSelectedInvestment(null)} />}
            <DepositeAmount isOpen={isDepositeModalOpen} onClose={() => setIsDepositeModalOpen(false)} />
        </div>
    );
};

export default HomePage;
