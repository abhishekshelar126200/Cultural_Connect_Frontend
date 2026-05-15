import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../CommonComponents/Navbar";
import Sidebar from "../ProgramManagement/components/Sidebar";

function CulturalOfficerRoutes() {
    return (
        <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "#f8f9fa" }}>

            {/* 1. Top Navbar (Stays fixed at the top) */}
            <Navbar />

            {/* 2. Main Wrapper */}
            <div className="d-flex flex-grow-1">

                {/* Left Sidebar (Sticky-top handles its own scroll positioning) */}
                <Sidebar />

                {/* 3. Main Content Area */}
                <main className="flex-grow-1">
                    <div
                        className="container-fluid py-4 px-md-5"
                        style={{
                            minHeight: "calc(100vh - 70px)", // Ensures background covers full screen
                            animation: "fadeIn 0.3s ease-in-out"
                        }}
                    >
                        {/* Dynamic content renders here */}
                        <div className="card border-0 shadow-sm p-4" style={{ borderRadius: "15px" }}>
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>

            {/* CSS Animation for smooth page transitions */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default CulturalOfficerRoutes;