import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("jwtToken");
    const isLoggedIn = !!token;

    // ✅ Get user display name
    const userName = localStorage.getItem("username"); // ✅ Retrieve username from localStorage    

    const handleLogout = () => {
        // ✅ Clear auth data
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");

        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container">

                {/* Brand */}
                <Link className="navbar-brand fw-bold" to="/citizen">
                    CultureConnect
                </Link>

                <ul className="navbar-nav ms-auto align-items-center">

                    {/* ✅ LOGGED OUT */}
                    {!isLoggedIn && (
                        <>
                            <li className="nav-item">
                                <Link className="btn btn-outline-light" to="/login">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item ms-2">
                                <Link className="btn btn-success" to="/register">
                                    Register
                                </Link>
                            </li>
                        </>
                    )}

                    {/* ✅ LOGGED IN */}
                    {isLoggedIn && (
                        <li className="nav-item dropdown">

                            {/* ✅ Profile button with name */}
                            <button
                                className="btn btn-outline-light dropdown-toggle"
                                data-bs-toggle="dropdown"
                            >
                                👤 {userName || "Profile"}
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end">

                                <li>
                                    <Link className="dropdown-item" to="/profile">
                                        View Profile
                                    </Link>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <button
                                        className="dropdown-item text-danger"
                                        onClick={handleLogout}
                                    >
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