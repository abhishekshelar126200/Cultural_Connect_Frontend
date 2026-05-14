import React from "react";
import { Outlet } from "react-router-dom";

function AdminRoutes() {
    return (
        // ✅ Removed Navbar and changed to a simple full-screen wrapper
        <div className="vw-100 vh-100 m-0 p-0 overflow-hidden bg-light">
            <Outlet />
        </div>
    );
}

export default AdminRoutes;