import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "./css/AboutUs.css";

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <div className="about-container">
            {/* Back Button */}
            <div className="about-header">
                <IoArrowBack className="back-arrow" onClick={() => navigate(-1)} />
                <h2 className="about-title">📌 About Medtronic</h2>
            </div>

            {/* Content Section */}
            <div className="about-content">
                <h3>Welcome to Medtronic – Your Investment Partner!</h3>
                <p>
                    At <strong>Medtronic</strong>, we believe in **smart investing**. Our mission is to provide a **safe, secure, and profitable** platform for individuals who want to grow their wealth without the complexities of traditional investing.
                </p>

                <h3>📈 How Medtronic Works?</h3>
                <p>
                    We carefully select **high-growth brands and companies** to invest in. Once you invest with us, your funds are strategically allocated into these **top-performing companies**, ensuring **maximum returns** while managing risk.
                </p>

                <h3>💰 Our Profit Model</h3>
                <p>
                    As a **service-based investment platform**, Medtronic provides users with **consistent and steady profits** from their investments. Here's how it works:
                </p>
                <ul>
                    <li>✅ **You Invest** – Choose the amount you want to invest.</li>
                    <li>✅ **We Invest for You** – Our team carefully selects high-yield brands.</li>
                    <li>✅ **You Earn Profits** – Get regular returns on your investment.</li>
                    <li>✅ **Service Charge** – We deduct **10% of your withdrawal amount** as a service fee.</li>
                </ul>

                <h3>🔐 Secure & Transparent</h3>
                <p>
                    Security and transparency are our top priorities. We ensure that all investments are backed by **thorough market research and analysis** to maximize your earnings while keeping risks at a minimum.
                </p>

                <h3>🚀 Why Choose Medtronic?</h3>
                <ul>
                    <li>🔹 **Expert Investment Strategies** – We invest in top brands and proven business models.</li>
                    <li>🔹 **High Returns** – Maximize your earnings with carefully selected opportunities.</li>
                    <li>🔹 **Secure Transactions** – Your funds and transactions are 100% safe.</li>
                    <li>🔹 **Easy Withdrawals** – Withdraw your profits anytime with a small service fee.</li>
                    <li>🔹 **24/7 Support** – Our team is available round-the-clock to assist you.</li>
                </ul>

                <h3>🚀 Start Your Investment Journey Today!</h3>
                <p>
                    Join **Medtronic** today and take the first step towards **financial freedom**. Whether you're a beginner or an experienced investor, our platform is designed to provide you with **stable, secure, and high-yield investments**.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
