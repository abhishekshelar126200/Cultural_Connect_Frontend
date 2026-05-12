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
                        to="/citizen/dashboard"
                        end
                        className="nav-link text-white"
                    >
                        📊 Dashboard Stats
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/citizen/programs"
                        className="nav-link text-white"
                    >
                        📚 Programs
                    </NavLink>
                </li>


                <li className="nav-item">
                    <NavLink
                        to="/citizen/grants"
                        className="nav-link text-white"
                    >
                        💰 My Grants
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/citizen/events"
                        className="nav-link text-white"
                    >
                        🎭 My Events
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/citizen/notifications"
                        className="nav-link text-white"
                    >
                        🔔 Notifications
                    </NavLink>
                </li>

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