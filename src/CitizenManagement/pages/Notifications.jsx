import React, { useEffect, useState } from "react";
import { fetchNotifications, markAsRead, deleteNotification } from "../citizen.api";
import "./Notifications.css";

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ DYNAMIC ID: Pull from localStorage
    const citizenId = localStorage.getItem("userId");

    useEffect(() => {
        if (citizenId) {
            setLoading(true);
            fetchNotifications(citizenId)
                .then((res) => {
                    // Sort: Newest first
                    console.log(citizenId);
                    const sorted = (res.data.data || []).sort(
                        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
                    );
                    setNotifications(sorted);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [citizenId]);

    const handleMarkAsRead = (id) => {
        markAsRead(id).then(() => {
            setNotifications(prev =>
                prev.map(n => n.notificationId === id ? { ...n, status: "READ" } : n)
            );
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this notification?")) {
            deleteNotification(id).then(() => {
                setNotifications(prev => prev.filter(n => n.notificationId !== id));
            });
        }
    };

    if (!citizenId) return <div className="alert alert-warning m-5">Please log in to view notifications.</div>;
    if (loading) return <div className="text-center my-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="container my-4 notifications-container">
            <h4 className="fw-bold mb-4">Your Notifications</h4>
            {notifications.length === 0 ? (
                <div className="card p-5 text-center shadow-sm">
                    <p className="text-muted">No new notifications.</p>
                </div>
            ) : (
                notifications.map((n) => (
                    <div key={n.notificationId} 
                         className={`card notification-card mb-3 shadow-sm ${n.status === 'SENT' ? 'unread' : ''}`}
                         style={{ borderLeft: n.status === 'SENT' ? '5px solid #0d6efd' : '5px solid #dee2e6' }}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <span className={`category-badge badge-${n.category || 'GENERAL'}`}>{n.category}</span>
                                <div className="d-flex align-items-center gap-3">
                                    <small className="text-muted">{new Date(n.createdDate).toLocaleString()}</small>
                                    <button className="btn btn-link text-danger p-0" onClick={() => handleDelete(n.notificationId)}>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            </div>
                            <p className="mt-2 mb-3">{n.message}</p>
                            {n.status === "SENT" && (
                                <button className="btn btn-sm btn-outline-primary mark-read-btn" onClick={() => handleMarkAsRead(n.notificationId)}>
                                    Mark as Read
                                </button>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Notifications;