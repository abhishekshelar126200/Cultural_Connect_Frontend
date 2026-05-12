import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../CommonComponents/Navbar";
import ProgramManagerSidebar from "../ProgramManagement/components/ProgramManagerSidebar";

function ProgramManagerRoutes() {
    return (
        <div className="min-vh-100 d-flex flex-column">

            <Navbar />

            <div className="d-flex flex-grow-1">
                <ProgramManagerSidebar />

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
