import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogInPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/login", formData);
            console.log("Response:", response.data);

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('data', JSON.stringify(response.data.data));
                navigate("/home");
            }
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || "Invalid email or password!");
        }
    };

    return (
        <>
            <style>
                {`
                    .login-container {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 100vh;
                        background: linear-gradient(to bottom, #7e57c2, #3f51b5);
                        padding: 20px;
                    }
                    .login-box {
                        width: 100%;
                        max-width: 400px;
                        padding: 24px;
                        background: white;
                        border-radius: 16px;
                        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
                        text-align: center;
                    }
                    .login-icon {
                        color: #3f51b5;
                        font-size: 2.5rem;
                        margin-bottom: 10px;
                    }
                    .login-title {
                        font-size: 1.8rem;
                        font-weight: bold;
                        color: #333;
                    }
                    .login-subtitle {
                        color: #666;
                        font-size: 0.9rem;
                        margin-bottom: 20px;
                    }
                    .login-input {
                        width: 100%;
                        padding: 10px;
                        margin-bottom: 10px;
                        border: 1px solid #ccc;
                        border-radius: 8px;
                        font-size: 1rem;
                    }
                    .login-button {
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
                    .login-button:hover {
                        transform: scale(1.05);
                    }
                    .login-button:active {
                        transform: scale(0.95);
                    }
                    .forgot-password {
                        color: #3f51b5;
                        font-size: 0.9rem;
                        cursor: pointer;
                        margin-top: 10px;
                    }
                    .forgot-password:hover {
                        text-decoration: underline;
                    }
                    .error-message {
                        color: red;
                        font-size: 0.9rem;
                        margin-bottom: 10px;
                    }
                `}
            </style>

            <div className="login-container">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="login-box">
                        <FaSignInAlt className="login-icon" />
                        <h2 className="login-title">Log In</h2>
                        <p className="login-subtitle">Welcome back! Please enter your details.</p>
                        {error && <p className="error-message">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="login-input"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="login-input"
                            />
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <button type="submit" className="login-button">
                                    Log In
                                </button>
                            </motion.div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default LogInPage;
