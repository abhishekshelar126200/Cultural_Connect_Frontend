import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProgramManagerSidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="bg-white p-3 border-end" style={{ width: "220px" }}>
            <h6 className="fw-bold mb-3">
                {localStorage.getItem("username")}
            </h6>

            <Link to="/programmanager/dashboard" className="btn btn-success w-100 mb-2">
                Dashboard
            </Link>

            <Link to="/programmanager/programs" className="btn btn-outline-secondary w-100 mb-2">
                Programs
            </Link>

            <button className="btn btn-danger w-100 mt-5" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}
