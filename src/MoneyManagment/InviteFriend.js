import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack, IoCopy } from "react-icons/io5";
import "./css/InviteFriend.css";

const InviteFriend = () => {
    const navigate = useNavigate();
    const referralLink = "https://example.com/referral?code=ABC123";

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
                <span className="referral-code">ABC123</span>
                <button className="copy-button" onClick={handleCopy}>
                    <IoCopy className="copy-icon" /> Copy Link
                </button>
            </div>
        </div>
    );
};

export default InviteFriend;
