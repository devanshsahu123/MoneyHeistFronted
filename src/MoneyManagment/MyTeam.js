import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import "./css/MyTeam.css";

const MyTeam = () => {
    const navigate = useNavigate();
    const [referrals, setReferrals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem("data"))?._id;
                if (!userId) return;

                const res = await axios.get("http://localhost:5000/my-team", {
                    params: { userId },
                });

                console.log(res.data.data, "res.data.data");
                if (res.data.success) {
                    const formatted = res.data.data.map((member) => ({
                        id: member._id,
                        name: member.name,
                        earnings: `₹${member.totalDeposit*0.1 || 0}`,
                        status: member.totalDeposit > 0 ? "Successful" : "Progress",
                    }));
                    setReferrals(formatted);
                }
            } catch (error) {
                console.error("Error fetching team:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);

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

            {loading ? (
                <p style={{ textAlign: "center", marginTop: "20px" }}>Loading team members...</p>
            ) : (
                <table className="team-table">
                    <thead>
                        <tr>
                            <th>Team Member</th>
                            <th>Status</th>
                            <th>Earnings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {referrals.length === 0 ? (
                            <tr>
                                <td colSpan="3" style={{ textAlign: "center" }}>No team members found.</td>
                            </tr>
                        ) : (
                            referrals.map((member) => (
                                <tr key={member.id} className={member.status === "Successful" ? "success-row" : "in-progress-row"}>
                                    <td>{member.name}</td>
                                    <td>{member.status}</td>
                                    <td>{member.earnings}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyTeam;
