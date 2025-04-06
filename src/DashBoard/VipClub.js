import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "./css/VipClub.css";
import { color } from "framer-motion";

const vipPlans = [
    { id: 1, name: "Silver VIP", price: "₹199", vip: "1" },
    { id: 2, name: "Gold VIP", price: "₹499", vip: "2" },
    { id: 3, name: "Platinum VIP", price: "₹999", vip: "3" },
];

const VipClub = () => {
    const navigate = useNavigate();

    return (
        <div className="vip-club-container">
            {/* Back Button & Title */}
            <div className="vip-header">
                <IoArrowBack className="back-arrow" onClick={() => navigate(-1)} />
                <h2 className="vip-title">🔥 VIP Club Comming Soon..</h2>
            </div>
            {/* <p className="vip-subtitle">Unlock exclusive benefits with our VIP plans</p> */}

            {/* <div className="vip-list">
                {vipPlans.map((plan) => (
                    <div className="vip-card" key={plan.id}>
                        <span className="vip-tag">VIP-{plan.vip}</span>
                        <h3 style={{color:'black'}}>{plan.name}</h3>
                        <p className="vip-price">{plan.price}</p>
                        <button className="purchase-button">Purchase</button>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default VipClub;
