import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoCopy } from "react-icons/io5";
import axios from "axios"; // Import axios for API calls
import "./css/InviteFriend.css";

const InviteFriend = () => {
    const apiUrl = process.env.REACT_APP_API_URL; // Get API URL from environment variables
    const navigate = useNavigate();
    const [referralCode, setReferralCode] = useState("");
    const userId = JSON.parse(localStorage.getItem("data"))?._id; // Get userId from localStorage

    useEffect(() => {
        if (userId) {
            fetchReferralCode();
        }
    }, [userId]);

    // Function to fetch referral code from the API
    const fetchReferralCode = async () => {
        try {
            const response = await axios.get(`${apiUrl}/refferal-code?userId=${userId}`);
            if (response.data && response.data.data) {
                setReferralCode(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching referral code:", error);
        }
    };

    const referralLink = `http://localhost:3000/signup?code=${referralCode}`;

    // Function to copy the referral link
    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        alert("Referral link copied to clipboard! ✅");
    };

    return (
        <div className="invite-container">
            {/* Back Button & Title */}
            <div className="invite-header">
                <IoArrowBack className="back-arrow" onClick={() => navigate(-1)} />
                <h2 className="invite-title">🎉 Invite Friends</h2>
            </div>

            {/* Referral Info */}
            <p className="invite-info">
                Invite your friends and earn rewards! Once your friend purchases any product, you will get ₹100 credited to your account.
            </p>

            {/* Referral Code Box */}
            <div className="referral-box">
                <span className="referral-code">{referralCode || "Loading..."}</span>
                <button className="copy-button" onClick={handleCopy} disabled={!referralCode}>
                    <IoCopy className="copy-icon" /> Copy Link
                </button>
            </div>
        </div>
    );
};

export default InviteFriend;
