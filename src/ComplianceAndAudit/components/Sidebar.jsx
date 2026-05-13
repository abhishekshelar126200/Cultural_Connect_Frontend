import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <div
            className="bg-dark text-white p-3 d-flex flex-column vh-100"
            style={{ width: "260px" }}
        >
            <h4 className="text-center mb-4 fw-bold">📌 Officer Panel</h4>
            <ul className="nav nav-pills flex-column gap-2">

                <li className="nav-item">
                    <NavLink
                        to="/compliance-audit/new-programs"
                        className="nav-link text-white"
                    >
                        🆕 New Programs
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/compliance-audit/compliance-programs"
                        className="nav-link text-white"
                    >
                        ✅ Compliance Programs
                    </NavLink>
                </li>


            </ul>
        </div>
    );
}

export default Sidebar;
