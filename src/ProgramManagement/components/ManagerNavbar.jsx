import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/ManagerNavbar.css"
function ManagerNavbar() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const userName = localStorage.getItem("username") || "User";

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    useEffect(() => {
        const handleClick = (e) => {
            if (!e.target.closest(".profile") && !e.target.closest(".dropdown")) {
                setOpen(false);
            }
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return (
    <div className="manager-navbar">

        {/* ✅ Title is now first child, so it goes to the left */}
        <div className="nav-center">
            Dashboard
        </div>

        {/* ✅ Right section containing status and profile */}
        <div className="nav-right">
            <div className="status">
                ● System Live
            </div>

            <div className="profile" onClick={() => setOpen(!open)}>
                👤 {userName}
            </div>

            <div className={`dropdown ${open ? "show" : ""}`}>
                <div>View Profile</div>
                <hr />
                <div className="logout-btn" onClick={logout}>
                    Logout
                </div>
            </div>
        </div>
    </div>
);
}

export default ManagerNavbar;
