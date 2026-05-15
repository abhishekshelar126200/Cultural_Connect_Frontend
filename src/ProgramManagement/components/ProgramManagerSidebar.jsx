import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../style/Managersidebar.css"

export default function ProgramManagerSidebar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="manager-sidebar">

            {/* ✅ Logo */}
            <div className="logo-area">
                <h4>CultureConnect</h4>
                <small>MANAGER PORTAL</small>
            </div>

            {/* ✅ Menu */}
            <div className="menu">

                <NavLink to="/programmanager/dashboard"
                    className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
                >
                    📊 Dashboard
                </NavLink>

                <NavLink to="/programmanager/programs"
                    className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
                >
                    📚 Programs
                </NavLink>

                <NavLink to="/programmanager/applications"
                    className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
                >
                    📄 Applications
                </NavLink>

            </div>

            {/* ✅ Logout */}
            <div className="logout" onClick={logout}>
                ⏻ Logout
            </div>

        </div>
    );
}
