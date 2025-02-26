import React from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import "./css/MyTaskList.css";

const tasks = [
    { id: 1, name: "Complete Profile", amount: "₹50" },
    { id: 2, name: "Refer a Friend", amount: "₹100" },
    { id: 3, name: "Daily Check-in", amount: "₹10" },
    { id: 4, name: "Write a Review", amount: "₹30" },
];

const MyTaskList = () => {
    const navigate = useNavigate();

    return (
        <div className="task-list-container">
            {/* Back Button & Title */}
            <div className="task-header">
                <IoArrowBack className="back-arrow" onClick={() => navigate(-1)} />
                <h2 className="task-title">📋 My Task List</h2>
            </div>

            <table className="task-table">
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Claim Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.name}</td>
                            <td>
                                <button className="claim-button" style={{ width: '100px' }}>Claim {task.amount}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyTaskList;
