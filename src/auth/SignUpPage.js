import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUserPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    
    console.log(location,'checkLocation');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        upiId: "",
        inviteCode: "",
    });
    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        const code = params.get("code");

        setFormData({ ...formData, inviteCode: code })
    },[])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        const requestData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            upiId: formData.upiId || null,
            vip: false,
            referredBy: formData.inviteCode || null,
        };

        try {
            const response = await axios.post("http://localhost:5000/sign-up", requestData);
            console.log("Response:", response.data);

            if (response.status === 201) {
                navigate("/login");
            }
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <>
            <style>
                {`
                    .signup-container {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 100vh;
                        background: linear-gradient(to bottom, #7e57c2, #3f51b5);
                        padding: 20px;
                    }
                    .signup-box {
                        width: 100%;
                        max-width: 400px;
                        padding: 24px;
                        background: white;
                        border-radius: 16px;
                        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                        text-align: center;
                    }
                    .signup-icon {
                        color: #3f51b5;
                        font-size: 2.5rem;
                        margin-bottom: 10px;
                    }
                    .signup-title {
                        font-size: 1.8rem;
                        font-weight: bold;
                        color: #333;
                    }
                    .signup-subtitle {
                        color: #666;
                        font-size: 0.9rem;
                        margin-bottom: 20px;
                    }
                    .signup-input {
                        width: 100%;
                        padding: 10px;
                        margin-bottom: 10px;
                        border: 1px solid #ccc;
                        border-radius: 8px;
                        font-size: 1rem;
                    }
                    .signup-button {
                        width: 100%;
                        background: #3f51b5;
                        color: white;
                        padding: 10px;
                        border: none;
                        border-radius: 8px;
                        font-size: 1rem;
                        font-weight: bold;
                        cursor: pointer;
                        transition: transform 0.2s ease-in-out;
                    }
                    .signup-button:hover {
                        transform: scale(1.05);
                    }
                    .signup-button:active {
                        transform: scale(0.95);
                    }
                    .error-message {
                        color: red;
                        font-size: 0.9rem;
                        margin-bottom: 10px;
                    }
                `}
            </style>

            <div className="signup-container">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="signup-box">
                        <FaUserPlus className="signup-icon" />
                        <h2 className="signup-title">Sign Up</h2>
                        <p className="signup-subtitle">Join Investment Daily now!</p>
                        {error && <p className="error-message">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="signup-input"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="signup-input"
                            />
  
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="signup-input"
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="signup-input"
                            />
                            <input
                                type="text"
                                name="upiId"
                                placeholder="UPI ID (Optional)"
                                value={formData.upiId}
                                onChange={handleChange}
                                className="signup-input"
                            />
                            <input
                                type="text"
                                name="inviteCode"
                                placeholder="Invite Code (Optional)"
                                value={formData.inviteCode}
                                onChange={handleChange}
                                className="signup-input"
                            />
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <button type="submit" className="signup-button">
                                    Sign Up
                                </button>
                            </motion.div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default SignUpPage;
