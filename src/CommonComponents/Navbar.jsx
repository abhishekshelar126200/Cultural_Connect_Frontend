import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null); // Used to detect clicks outside the dropdown

    const token = localStorage.getItem("jwtToken");
    const isLoggedIn = !!token;
    const userName = localStorage.getItem("username");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    // Close dropdown when clicking anywhere outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg sticky-top shadow-sm" style={{ backgroundColor: "#0f172a", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="container py-2">
                
                {/* Brand / Logo */}
                <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center" to="/citizen">
                    <i className="bi bi-bank2 me-2" style={{ color: "#fbbf24" }}></i>
                    <span className="text-white">Culture</span>
                    <span style={{ color: "#fbbf24" }}>Connect</span>
                </Link>

                {/* Mobile Hamburger Toggle */}
                <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" style={{ filter: "invert(1)" }}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links & Controls */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center mt-3 mt-lg-0">
                        {!isLoggedIn ? (
                            <>
                                <li className="nav-item me-lg-3 mb-2 mb-lg-0">
                                    <Link className="nav-link text-light fw-medium custom-nav-link" to="/login">
                                        Sign In
                                    </Link>
                                </li>
                                <li className="nav-item w-100 w-lg-auto">
                                    <Link className="btn fw-bold px-4 rounded-pill w-100" style={{ backgroundColor: "#fbbf24", color: "#0f172a" }} to="/register">
                                        Get Started
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item dropdown w-100 w-lg-auto mt-2 mt-lg-0" ref={dropdownRef}>
                                {/* Profile Avatar Button */}
                                <button
                                    className="btn d-flex align-items-center justify-content-between w-100 gap-2 border-0 user-profile-btn"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    type="button"
                                    style={{ background: "rgba(255,255,255,0.08)", color: "white", borderRadius: "50px", padding: "5px 15px 5px 5px" }}
                                >
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: "35px", height: "35px", backgroundColor: "#3b82f6", color: "white", fontWeight: "bold" }}>
                                            {userName ? userName.charAt(0).toUpperCase() : "U"}
                                        </div>
                                        <span className="fw-medium">{userName || "Profile"}</span>
                                    </div>
                                    <i className={`bi bi-chevron-${showDropdown ? 'up' : 'down'} ms-2`} style={{ fontSize: "0.8rem", color: "#94a3b8" }}></i>
                                </button>

                                {/* Dropdown Menu */}
                                <ul className={`dropdown-menu dropdown-menu-end shadow-lg border-0 mt-3 rounded-4 ${showDropdown ? 'show' : ''}`}
                                    style={{ position: 'absolute', right: 0, minWidth: "220px", backgroundColor: "#ffffff" }}>
                                    
                                    {/* User Info Header */}
                                    <li className="px-4 py-3 border-bottom bg-light rounded-top-4" style={{ marginTop: "-8px" }}>
                                        <p className="mb-0 text-muted small">Signed in as</p>
                                        <p className="mb-0 fw-bold text-truncate" style={{ color: "#0f172a", maxWidth: "180px" }}>{userName || "Citizen"}</p>
                                    </li>
                                    
                                    {/* Links */}
                                    <li>
                                        <Link className="dropdown-item py-2 mt-2 d-flex align-items-center gap-3 custom-dropdown-item" to="/profile" onClick={() => setShowDropdown(false)}>
                                            <i className="bi bi-person text-primary fs-5"></i> My Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item py-2 d-flex align-items-center gap-3 custom-dropdown-item" to="/dashboard" onClick={() => setShowDropdown(false)}>
                                            <i className="bi bi-grid text-primary fs-5"></i> Dashboard
                                        </Link>
                                    </li>
                                    
                                    <li><hr className="dropdown-divider my-2" /></li>
                                    
                                    <li>
                                        <button className="dropdown-item py-2 text-danger d-flex align-items-center gap-3 custom-dropdown-item" onClick={handleLogout}>
                                            <i className="bi bi-box-arrow-right fs-5"></i> Log out
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Component Scoped Styles */}
            <style>{`
                .custom-nav-link {
                    transition: color 0.3s ease;
                }
                .custom-nav-link:hover {
                    color: #fbbf24 !important;
                }
                .user-profile-btn {
                    transition: background-color 0.3s ease;
                }
                .user-profile-btn:hover {
                    background-color: rgba(255,255,255,0.15) !important;
                }
                .custom-dropdown-item {
                    transition: all 0.2s ease;
                    font-weight: 500;
                    color: #475569;
                    padding-left: 20px;
                    padding-right: 20px;
                }
                .custom-dropdown-item:hover {
                    background-color: #f8fafc;
                    color: #0f172a;
                    padding-left: 24px; /* Slight indent effect on hover */
                }
                
                /* Mobile fixes for absolute dropdown */
                @media (max-width: 991px) {
                    .dropdown-menu {
                        position: relative !important;
                        margin-top: 10px !important;
                        border-radius: 12px !important;
                    }
                }
            `}</style>
        </nav>
    );
}

export default Navbar;