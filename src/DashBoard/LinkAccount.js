import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "./css/LinkAccount.css";

const LinkAccount = () => {
    const navigate = useNavigate();
    const [upiId, setUpiId] = useState("");
    const [isLinked, setIsLinked] = useState(false);

    const handleLinkAccount = () => {
        if (upiId === "") {
            alert("Please enter a valid UPI ID.");
            return;
        }
        setIsLinked(true);
    };

    return (
        <div className="link-account-container">
            <div className="header">
                <IoArrowBack className="back-arrow" onClick={() => navigate(-1)} />
                <h2>Link Your Account</h2>
            </div>

            {!isLinked ? (
                <>
                    <div className="input-group">
                        <label>UPI ID</label>
                        <input
                            type="text"
                            placeholder="Enter UPI ID"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                        />
                    </div>

                    <button className="link-button" onClick={handleLinkAccount}>
                        Link Account
                    </button>
                </>
            ) : (
                <div className="linked-account">
                    <h3>Account Linked Successfully ✅</h3>
                    <p><strong>UPI ID:</strong> {upiId}</p>
                    <button className="edit-button" onClick={() => setIsLinked(false)}>
                        Edit Account
                    </button>
                </div>
            )}
        </div>
    );
};

export default LinkAccount;
