import React, { useState, useEffect, useRef } from "react";
import ProfileModal from "./ProfileModal";
import { getCitizenById, fetchNotifications, markAsRead } from "../citizen.api";

function CitizenNavbar() {

    const [showProfile, setShowProfile] = useState(false);
    const [status, setStatus] = useState("");
    const [showNotif, setShowNotif] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const userName = localStorage.getItem("username");
    const citizenId = localStorage.getItem("userId");

    const notifRef = useRef(null);

    // ✅ LOAD DATA
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

    // ✅ Notifications click
    const handleBellClick = async () => {

        setShowNotif(prev => !prev);

        notifications.forEach(async (n) => {
            if (n.status === "SENT") {
                await markAsRead(n.notificationId);
            }
        });

        loadNotifications();
    };

    // ✅ Close outside click
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

    const unreadCount = notifications.filter(n => n.status === "SENT").length;

    return (
        <>
            <nav
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                    background: "#1f232a",
                    padding: "10px 25px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                {/* ✅ LEFT EMPTY (NO TITLE NOW) */}
                <div></div>

                {/* ✅ RIGHT SIDE */}
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>

                    {/* ✅ USER BOX */}
                    <div
                        onClick={() => setShowProfile(true)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            border: "1px solid #444",
                            padding: "6px 15px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            color: "white"
                        }}
                    >
                        <span>👤</span>

                        <div>
                            <div>{userName}</div>
                            <small style={{ color: "#ffc107" }}>{status}</small>
                        </div>
                    </div>

                    {/* ✅ NOTIFICATION */}
                    <div className="position-relative" ref={notifRef}>

                        <button
                            className="btn btn-outline-warning"
                            onClick={handleBellClick}
                        >
                            🔔
                        </button>

                        {/* ✅ UNREAD COUNT */}
                        {unreadCount > 0 && (
                            <span
                                className="badge bg-danger position-absolute"
                                style={{ top: "-5px", right: "5px" }}
                            >
                                {unreadCount}
                            </span>
                        )}

                        {/* ✅ DROP DOWN */}
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