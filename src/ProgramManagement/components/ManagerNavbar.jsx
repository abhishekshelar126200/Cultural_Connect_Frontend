import React, { useState, useEffect } from "react";
import { fetchNotifications, markAsRead } from "../citizen.api";
import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const [showNotif, setShowNotif] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const citizenId = localStorage.getItem("userId");

    // ✅ LOAD NOTIFICATIONS
    const loadNotifications = async () => {
        if (!citizenId) return;

        const res = await fetchNotifications(citizenId);

        setNotifications(
            (res.data.data || []).sort(
                (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
            )
        );
    };

    useEffect(() => {
        loadNotifications();
    }, []);

    // ✅ MARK ALL AS READ WHEN OPENED
    const handleBellClick = async () => {

        setShowNotif(!showNotif);

        // mark all as read
        notifications.forEach(async (n) => {
            if (n.status === "SENT") {
                await markAsRead(n.notificationId);
            }
        });

        // reload after marking
        loadNotifications();
    };

    // ✅ COUNT UNREAD
    const unreadCount = notifications.filter(n => n.status === "SENT").length;

    return (
        <nav className="navbar navbar-dark bg-dark px-3">

            <h5 className="text-white">CultureConnect</h5>

            <div className="d-flex align-items-center gap-3">

                {/* ✅ NOTIFICATION BELL */}
                <div className="position-relative">

                    <button
                        className="btn btn-outline-warning"
                        onClick={handleBellClick}
                    >
                        🔔
                    </button>

                    {unreadCount > 0 && (
                        <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                            {unreadCount}
                        </span>
                    )}

                    {/* ✅ DROPDOWN POPUP */}
                    {showNotif && (
                        <div
                            className="position-absolute bg-white shadow p-3 rounded"
                            style={{ right: 0, width: "300px", zIndex: 1000 }}
                        >
                            <h6>Notifications</h6>

                            {notifications.length === 0 && (
                                <p className="text-muted">No notifications</p>
                            )}

                            {notifications.slice(0, 5).map(n => (
                                <div key={n.notificationId} className="border-bottom mb-2 pb-2">
                                    <small>{n.message}</small>
                                </div>
                            ))}

                        </div>
                    )}

                </div>

                {/* ✅ USER */}
                <div className="text-white">
                    {localStorage.getItem("username")}
                </div>

                {/* ✅ LOGOUT */}
                <button className="btn btn-danger" onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                }}>
                    Logout
                </button>

            </div>
        </nav>
    );
}

export default Navbar;