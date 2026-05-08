import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("jwtToken");

    const handleLogout = () => {
        // ✅ 1. Remove JWT
        localStorage.removeItem("jwtToken");

        // ✅ 2. Redirect
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container">

                <Link className="navbar-brand fw-bold" to="/citizen">
                    CultureConnect
                </Link>

                <ul className="navbar-nav ms-auto align-items-center">

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

                    {isLoggedIn && (
                        <>
                            <li className="nav-item">
                                <Link className="btn btn-outline-light" to="/citizen/dashboard">
                                    Dashboard
                                </Link>
                            </li>

                            <li className="nav-item ms-2">
                                <button
                                    className="btn btn-danger"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}

                </ul>
            </div>
        </nav>
    );
}

export default Navbar;