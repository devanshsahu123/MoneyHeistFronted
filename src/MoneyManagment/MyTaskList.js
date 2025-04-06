import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import axios from "axios";
import "./css/MyTaskList.css";
import ReactNotificationAlert from "react-notification-alert";

const MyTaskList = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [taskChange, setTaskChange] = useState(false);

    const notifi = useRef();

    const toggleTaskChange = () => setTaskChange((prev) => !prev);

    const notify = (msg, err) => {
        let color = err ? "danger" : "success";
        let options = {
            type: color,
            place: "tr",
            message: (
                <div>
                    <b>{err ? "Error" : "Success"}</b> - {msg}.
                </div>
            ),
            icon: "tim-icons icon-bell-55",
            autoDismiss: 6,
            closeButton: false,
        };
        if (notifi.current) {
            notifi.current.notificationAlert(options);
        }
    };

    const fetchTasks = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("data"))?._id;
            const res = await axios.get(`${apiUrl}/task-list`, {
                params: { userId },
            });

            if (res.data?.success && Array.isArray(res.data.data)) {
                setTasks(res.data.data);
            } else {
                setTasks([]); // fallback
                console.warn("Unexpected response format:", res.data);
            }
        } catch (err) {
            console.error("Error fetching tasks:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [taskChange]);

    const claimTask = async (task) => {
        try {
            const userId = JSON.parse(localStorage.getItem("data"))?._id;

            const res = await axios.put(`${apiUrl}/claim-task`, {
                taskId: task._id,
                userId,
                productId: task.productId._id,
            });

            notify("Task claimed successfully!", false);
            toggleTaskChange(); // refresh only on success
        } catch (err) {
            console.error("Error claiming task:", err);
            notify(
                err?.response?.data?.error || "Error claiming task. Please try again",
                true
            );
        }
    };

    return (
        <div className="task-list-container">
            <ReactNotificationAlert ref={notifi} />

            <div className="task-header">
                <IoArrowBack className="back-arrow" onClick={() => navigate(-1)} />
                <h2 className="task-title">📋 My Task List</h2>
            </div>

            {loading ? (
                <p className="loading-text">Loading tasks...</p>
            ) : (
                
               tasks.length >0 ? <table className="task-table">
                    <thead>
                        <tr>
                            <th>Task Name</th>
                            <th>Claim Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks?.map((task) => (
                            <tr key={task._id}>
                                <td>{task?.productId?.heading}</td>
                                <td>
                                    <button
                                        disabled={task.isClaimedToday}
                                        onClick={() => claimTask(task)}
                                        className={`claim-button ${task.isClaimedToday ? "disabled-claim-button" : ""}`}
                                    >
                                        Claim ₹{task.dayIncome}
                                    </button>

                                    {task.isClaimedToday && (
                                        <span className="claimed-info" onClick={() => notify("Already Claimed – Come back tomorrow",false)}>
                                            <span className="info-icon" title="Already Claimed – Come back tomorrow">ℹ️</span>
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>:<div style={{ textAlign: "center", marginTop: "20px" }}>
                    <h3 className="no-tasks-message">No tasks available.</h3>
                    <p className="no-tasks-info">Complete your first purchase to unlock tasks!</p>
                </div>

            )}
        </div>
    );
};

export default MyTaskList;
