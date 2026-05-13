import React, { useState } from "react"; // 1. Add useState
import { Link, useNavigate } from "react-router-dom";
 
function Navbar() {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false); // 2. Track state
 
    const token = localStorage.getItem("jwtToken");
    const isLoggedIn = !!token;
    const userName = localStorage.getItem("username");
 
    const handleLogout = () => {
        localStorage.clear(); // Clears all at once
        navigate("/login");
    };
 
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/citizen">CultureConnect</Link>
 
                <ul className="navbar-nav ms-auto align-items-center">
                    {!isLoggedIn && (
                        <>
                            <li className="nav-item">
                                <Link className="btn btn-outline-light" to="/login">Login</Link>
                            </li>
                            <li className="nav-item ms-2">
                                <Link className="btn btn-success" to="/register">Register</Link>
                            </li>
                        </>
                    )}
 
                    {isLoggedIn && (
                        <li className="nav-item dropdown">
                            {/* 3. Toggle state on click and remove data-bs-toggle */}
                            <button
                                className={`btn btn-outline-light dropdown-toggle ${showDropdown ? 'show' : ''}`}
                                onClick={() => setShowDropdown(!showDropdown)}
                                type="button"
                            >
                                👤 {userName || "Profile"}
                            </button>
 
                            {/* 4. Conditionally apply the 'show' class */}
                            <ul className={`dropdown-menu dropdown-menu-end ${showDropdown ? 'show' : ''}`}
                                style={{ position: 'absolute', right: 0 }}>
                                <li>
                                    <Link className="dropdown-item" to="/profile" onClick={() => setShowDropdown(false)}>
                                        View Profile
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
 
export default Navbar;
 