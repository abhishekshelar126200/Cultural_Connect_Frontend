import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const token = localStorage.getItem("jwtToken");
    const isLoggedIn = !!token;
    const userName = localStorage.getItem("username");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setShowDropdown(false);
        navigate("/login");
    };

    // --- Modern White Styling ---
    const navStyle = {
        background: "rgba(255, 255, 255, 0.9)", // White with slight transparency
        backdropFilter: "blur(12px)",           // Blur effect for scrolling
        borderBottom: "1px solid #eaeaea",      // Subtle separator
        padding: "0.7rem 0",
        transition: "all 0.3s ease"
    };

    const brandStyle = {
        fontSize: "1.4rem",
        fontWeight: "800",
        letterSpacing: "-0.5px",
        background: "linear-gradient(45deg, #1a1a1a, #4a4a4a)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
    };

    const dropdownMenuStyle = {
        display: showDropdown ? "block" : "none",
        position: "absolute",
        right: "0",
        top: "120%",
        minWidth: "210px",
        borderRadius: "12px",
        border: "1px solid #eee",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        background: "#ffffff",
        padding: "8px",
        zIndex: 1050
    };

    const avatarStyle = {
        width: "32px",
        height: "32px",
        background: "#f0f2f5",
        color: "#1a1a1a",
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        fontSize: "0.85rem",
        fontWeight: "600",
        border: "1px solid #ddd"
    };

    return (
        <nav className="navbar navbar-expand sticky-top" style={navStyle}>
            <div className="container">
                {/* Brand Logo */}
                <Link className="navbar-brand" style={brandStyle} to="/citizen">
                    CultureConnect
                </Link>

                <div className="ms-auto d-flex align-items-center">
                    {!isLoggedIn ? (
                        <div className="d-flex align-items-center gap-3">
                            <Link
                                className="text-decoration-none fw-medium"
                                style={{ color: "#444", fontSize: "0.95rem" }}
                                to="/login"
                            >
                                Sign In
                            </Link>
                            <Link
                                className="btn btn-dark btn-sm px-4 rounded-pill fw-bold"
                                style={{ fontSize: "0.9rem", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                                to="/register"
                            >
                                Join Now
                            </Link>
                        </div>
                    ) : (
                        <div className="position-relative" ref={dropdownRef}>
                            <button
                                className="btn d-flex align-items-center gap-2 border-0 bg-transparent"
                                style={{ padding: "4px 8px" }}
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <div style={avatarStyle}>
                                    {userName?.charAt(0).toUpperCase() || "U"}
                                </div>
                                <span className="fw-semibold d-none d-sm-inline" style={{ color: "#333" }}>
                                    {userName || "Profile"}
                                </span>
                                <span style={{ color: "#999", fontSize: "0.6rem" }}>▼</span>
                            </button>

                            {/* Dropdown Menu */}
                            <ul style={dropdownMenuStyle} className="list-unstyled m-0">
                                <li>
                                    <Link
                                        className="dropdown-item rounded-3 py-2 px-3 fw-medium"
                                        to="/profile"
                                        onClick={() => setShowDropdown(false)}
                                        style={{ color: "#444" }}
                                    >
                                        👤 Account Settings
                                    </Link>
                                </li>
                                <li className="my-1"><hr className="dropdown-divider opacity-50" /></li>
                                <li>
                                    <button
                                        className="dropdown-item rounded-3 py-2 px-3 text-danger fw-bold"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;