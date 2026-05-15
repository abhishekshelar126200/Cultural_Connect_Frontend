import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../ProgramManagement/components/ManagerNavbar"
import ProgramManagerSidebar from "../ProgramManagement/components/ProgramManagerSidebar";

function ProgramManagerRoutes() {

    return (
       <div style={{ display: "flex", height: "100vh" }}>

    {/* ✅ Sidebar */}
    <ProgramManagerSidebar />

    {/* ✅ Content Area */}
    <div style={{
        marginLeft: "260px",   // ✅ VERY IMPORTANT FIX
        width: "100%",
        display: "flex",
        flexDirection: "column"
    }}>

        {/* ✅ Navbar */}
        <Navbar />

        {/* ✅ Pages */}
        <div style={{
            padding: "25px",
            background: "#f3f4f6",
            minHeight: "100vh"
        }}>
            <Outlet />
        </div>

    </div>

</div>


    );
}

export default ProgramManagerRoutes;
