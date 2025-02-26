import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "./css/MyTeam.css";

const referrals = [
    { id: 1, name: "Alice Johnson", earnings: "₹500", status: "Successful" },
    { id: 2, name: "Bob Smith", earnings: "₹750", status: "Successful" },
    { id: 3, name: "Charlie Brown", earnings: "₹0", status: "Progress" },
    { id: 4, name: "David Wilson", earnings: "₹0", status: "Progress" },
];

const MyTeam = () => {
    const navigate = useNavigate();

    return (
        <div className="team-container">
            {/* Back Button & Title */}
            <div className="team-header">
                <IoArrowBack className="back-arrow" onClick={() => navigate(-1)} />
                <h2 className="team-title">👥 My Team</h2>
            </div>

            <p className="referral-info">
                Once a friend purchases any product, the referral amount will be credited to your account.
            </p>

            <table className="team-table">
                <thead>
                    <tr>
                        <th>Team Member</th>
                        <th>Status</th>
                        <th>Earnings</th>
                    </tr>
                </thead>
                <tbody>
                    {referrals.map((member) => (
                        <tr key={member.id} className={member.status === "Successful" ? "success-row" : "in-progress-row"}>
                            <td>{member.name}</td>
                            <td>{member.status}</td>
                            <td>{member.earnings}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyTeam;
