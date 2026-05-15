import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
    // --- Modern Styling ---
    const sidebarStyle = {
        width: "260px",
        height: "calc(100vh - 70px)", // Fits exactly under your Navbar
        position: "sticky",
        top: "70px",                 // Adjust based on your Navbar's height
        background: "#ffffff",
        borderRight: "1px solid #eee",
        padding: "1.5rem 1rem",
        display: "flex",
        flexDirection: "column",
        zIndex: 999
    };

    // Function to handle dynamic active link styling
    const navLinkClasses = ({ isActive }) =>
        `nav-link d-flex align-items-center px-3 py-2 rounded-3 mb-2 transition-all ${isActive
            ? "bg-dark text-white shadow-sm fw-bold"
            : "text-secondary bg-transparent hover-bg-light"
        }`;

    return (
        <div style={sidebarStyle} className="sidebar-container">
            {/* Section Label */}
            <p className="text-uppercase text-muted fw-bold mb-3 ps-2" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>
                Officer Portal
            </p>

            <ul className="nav nav-pills flex-column">
                <li className="nav-item">
                    <NavLink
                        to="/culturalofficer/dashboard"
                        end
                        className={navLinkClasses}
                    >
                        <span className="me-2 fs-5">📊</span>
                        <span>Dashboard</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/culturalofficer/citizens"
                        className={navLinkClasses}
                    >
                        <span className="me-2 fs-5">👥</span>
                        <span>Citizens</span>
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/culturalofficer/heritage"
                        className={navLinkClasses}
                    >
                        <span className="me-2 fs-5">🎭</span>
                        <span>Heritage</span>
                    </NavLink>
                </li>
            </ul>

            {/* Footer space inside sidebar */}
            <div className="mt-auto ps-2">
                <div className="p-3 bg-light rounded-3 text-center border">
                    <small className="text-muted d-block">System Status</small>
                    <span className="badge bg-success mt-1">Online</span>
                </div>
            </div>

            {/* In-line CSS for the hover effect that Bootstrap doesn't provide by default */}
            <style>{`
                .hover-bg-light:hover {
                    background-color: #f8f9fa !important;
                    color: #000 !important;
                }
                .transition-all {
                    transition: all 0.2s ease-in-out;
                }
            `}</style>
        </div>
    );
}

export default Sidebar;