import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import "./css/LinkAccount.css";

const LinkAccount = () => {
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem("data"))?._id;
    const [upiId, setUpiId] = useState("");
    const [isLinked, setIsLinked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch UPI ID if already exists
        if (!userId) {
            alert("User not found. Please login again.");
            return;
        }

        axios.get(`http://localhost:5000/upi?userId=${userId}`)
            .then((response) => {
                if (response.data?.upiId) {
                    setUpiId(response.data.upiId);
                    setIsLinked(true);
                }
            })
            .catch((error) => console.error("Error fetching UPI ID:", error))
            .finally(() => setLoading(false));
    }, [userId]);

    const handleLinkAccount = () => {
        if (upiId.trim() === "") {
            alert("Please enter a valid UPI ID.");
            return;
        }

        axios.put("http://localhost:5000/upi", { userId, upiId })
            .then((response) => {
                setIsLinked(true);
                alert("UPI ID added successfully.");
            })
            .catch((error) => console.error("Error adding UPI ID:", error));
    };

    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="link-account-container">
            <div className="header">
                <IoArrowBack className="back-arrow" onClick={() => navigate(-1)} />
                <h2>Link Your UPI Account</h2>
            </div>

            {!isLinked ? (
                <>
                    <p className="info-text">
                        Once your UPI ID is added, it <strong>cannot be changed</strong>. Please enter it correctly.
                    </p>
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
                    <h3>UPI Linked Successfully ✅</h3>
                    <p><strong>UPI ID:</strong> {upiId}</p>
                    <p className="locked-warning">🔒 This UPI ID cannot be edited.</p>
                </div>
            )}
        </div>
    );
};

export default LinkAccount;
