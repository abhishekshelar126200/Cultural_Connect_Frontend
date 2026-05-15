import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import { getCitizenById, fetchNotifications, markAsRead } from "../citizen.api";

function CitizenNavbar() {

    const [showProfile, setShowProfile] = useState(false);
    const [status, setStatus] = useState("");
    const [showNotif, setShowNotif] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const navigate = useNavigate();
    const userName = localStorage.getItem("username");
    const citizenId = localStorage.getItem("userId");

    // ✅ ✅ IMPORTANT
    const notifRef = useRef(null);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    // ✅ LOAD STATUS + NOTIFICATIONS
    useEffect(() => {
        loadStatus();
        loadNotifications();
    }, []);

    const loadStatus = async () => {
        try {
            const res = await getCitizenById(citizenId);
            setStatus(res.data.status);
        } catch (err) {
            console.error(err);
        }
    };

    const loadNotifications = async () => {
        try {
            const res = await fetchNotifications(citizenId);

            const sorted = (res.data.data || []).sort(
                (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
            );

            setNotifications(sorted);

        } catch (err) {
            console.error(err);
        }
    };

    // ✅ CLICK BELL
    const handleBellClick = async () => {

        setShowNotif(prev => !prev);

        // ✅ mark all as read
        notifications.forEach(async (n) => {
            if (n.status === "SENT") {
                await markAsRead(n.notificationId);
            }
        });

        loadNotifications();
    };

    // ✅ ✅ OUTSIDE CLICK HANDLER (MAIN FIX)
    useEffect(() => {

        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotif(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    // ✅ unread count
    const unreadCount = notifications.filter(n => n.status === "SENT").length;

    return (
        <>
            <nav className="navbar navbar-dark bg-dark px-4" 
style={{
    position: "sticky",   // ✅ FIX
    top: 0,               // ✅ stay at top
    zIndex: 1000          // ✅ stay above content
  }}
>

                <span className="navbar-brand fw-bold">
                    CultureConnect
                </span>

                <div className="d-flex align-items-center">

                    {/* ✅ PROFILE */}
                    <button
                        className="btn btn-outline-light me-2"
                        onClick={() => setShowProfile(true)}
                    >
                        <div className="text-start">
                            <div>👤 {userName}</div>
                            <small className="text-warning">{status}</small>
                        </div>
                    </button>

                    {/* ✅ 🔔 NOTIFICATION */}
                    <div className="position-relative" ref={notifRef}>

                        <button
                            className="btn btn-outline-warning me-2"
                            onClick={handleBellClick}
                        >
                            🔔
                        </button>

                        {unreadCount > 0 && (
                            <span
                                className="badge bg-danger position-absolute"
                                style={{ top: "-5px", right: "5px" }}
                            >
                                {unreadCount}
                            </span>
                        )}

                        {/* ✅ POPUP */}
                        {showNotif && (
                            <div
                                className="position-absolute bg-white text-dark shadow p-3 rounded"
                                style={{
                                    right: 0,
                                    top: "40px",
                                    width: "300px",
                                    zIndex: 1000
                                }}
                            >
                                <h6>Notifications</h6>

                                {notifications.length === 0 ? (
                                    <p>No notifications</p>
                                ) : (
                                    notifications.slice(0, 5).map(n => (
                                        <div
                                            key={n.notificationId}
                                            className="border-bottom mb-2 pb-2"
                                        >
                                            <small>{n.message}</small>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                    </div>

                    {/* ✅ LOGOUT */}
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                    </button>

                </div>
            </nav>

            {/* ✅ PROFILE MODAL */}
            {showProfile && (
                <ProfileModal onClose={() => setShowProfile(false)} />
            )}
        </>
    );
}

export default CitizenNavbar;
