import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container">

                {/* Brand */}
                <Link className="navbar-brand fw-bold" to="/">
                    CultureConnect
                </Link>

                <div className="collapse navbar-collapse justify-content-end">
                    <ul className="navbar-nav align-items-center">

                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                About
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/programs">
                                Programs
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/heritage">
                                Heritage
                            </Link>
                        </li>

                        {/* Login */}
                        <li className="nav-item ms-3">
                            <Link className="btn btn-outline-light" to="/login">
                                Login
                            </Link>
                        </li>

                        {/* Register */}
                        <li className="nav-item ms-2">
                            <Link className="btn btn-success" to="/citizen/register">
                                Register
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;