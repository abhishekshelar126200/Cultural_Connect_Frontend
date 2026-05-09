import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <div
            className="bg-dark text-white p-3 d-flex flex-column"
            style={{ width: "260px" }}
        >
            <ul className="nav nav-pills flex-column gap-2">

                <li className="nav-item">
                    <NavLink
                        to="/culturalofficer/dashboard"
                        end
                        className="nav-link text-white"
                    >
                        📊 Dashboard
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/culturalofficer/allcitizens"
                        className="nav-link text-white"
                    >
                        💰 Citizen Management
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/culturalofficer/heritage"
                        className="nav-link text-white"
                    >
                        🎭 Heritage Management
                    </NavLink>
                </li>

                {/* <li className="nav-item">
                    <NavLink
                        to="/officer/notifications"
                        className="nav-link text-white"
                    >
                        🔔 Notifications
                    </NavLink>
                </li> */}

            </ul>

            <div className="mt-auto">
                <button className="btn btn-outline-light btn-sm w-100">
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;