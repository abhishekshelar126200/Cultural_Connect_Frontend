import React from "react";
import { Outlet } from "react-router-dom";
import CitizenNavbar from "../CitizenManagement/components/CitizenNavbar";  
import Sidebar from "../CitizenManagement/components/Sidebar";

function CitizenRoutes() {
    return (
        <div className="min-vh-100 d-flex flex-column">

            {/* Top Navbar */}
            <CitizenNavbar />

            {/* Content Area */}
            <div className="d-flex flex-grow-1">
                <Sidebar />

                <main className="flex-grow-1 bg-light">
                    <div className="container py-4">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* <Footer /> */}
        </div>
    );
}

export default CitizenRoutes;