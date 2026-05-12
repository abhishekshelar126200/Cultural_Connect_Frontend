import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchNotifications } from "../citizen.api";

function Sidebar() {
    const [unreadCount, setUnreadCount] = useState(0);
    const navigate = useNavigate();

    // ✅ DYNAMIC ID: Pull from localStorage
    const citizenId = localStorage.getItem("userId");

    const getUnreadCount = async () => {
        if (!citizenId) return;
        try {
            const res = await fetchNotifications(citizenId);
            const unread = res.data.data.filter(n => n.status === "SENT").length;
            setUnreadCount(unread);
        } catch (error) {
            console.error("Sidebar count error:", error);
        }
    };

    useEffect(() => {
        getUnreadCount();
        const interval = setInterval(getUnreadCount, 60000);
        return () => clearInterval(interval);
    }, [citizenId]);

    const handleLogout = () => {
        localStorage.clear(); // ✅ Clear userId, username, and token
        navigate("/login");
    };

    return (
        <div className="bg-dark text-white p-3 d-flex flex-column" style={{ width: "260px", height: "100vh" }}>
            <h4 className="mb-4 text-center fw-bold text-success">CultureConnect</h4>
            <ul className="nav nav-pills flex-column gap-2">
                <li className="nav-item">
                    <NavLink to="/citizen/dashboard" end className="nav-link text-white">📊 Dashboard Stats</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/citizen/grants" className="nav-link text-white">💰 My Grants</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/citizen/events" className="nav-link text-white">🎭 My Events</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink 
                     to="/citizen/notifications" className="nav-link text-white d-flex align-items-center"> <span>🔔 Notifications</span>
                     {unreadCount > 0 && (<span className="notif-badge">{unreadCount > 9 ? '9+' : unreadCount} </span>)}
                    </NavLink>
                </li>
            </ul>
            <div className="mt-auto">
                <button className="btn btn-outline-light btn-sm w-100" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;