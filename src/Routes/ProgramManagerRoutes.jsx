import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../CommonComponents/Navbar";
import ProgramManagerSidebar from "../ProgramManagement/components/ProgramManagerSidebar";

function ProgramManagerRoutes() {
    return (
        <div className="min-vh-100 d-flex flex-column">
            {/* Top Navbar stays static */}
            <Navbar />

            <div className="d-flex flex-grow-1">
                {/* Sidebar stays static on the left */}
                <ProgramManagerSidebar />

                {/* Content area changes based on route */}
                <main className="flex-grow-1 bg-light">
                    <div className="container py-4">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ProgramManagerRoutes;