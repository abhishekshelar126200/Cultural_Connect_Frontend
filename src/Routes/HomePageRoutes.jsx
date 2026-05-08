import React from "react";
import { Outlet } from "react-router-dom";
import HomePage from "../Homepage/pages/HomePage";
import Navbar from "../CommonComponents/Navbar";
function HomePageRoutes() {
    return (
        <div className="min-vh-100 d-flex flex-column">

            {/* Top Navbar */}
            <Navbar />

            {/* Content Area */}
            <div className="">
                {/* <Sidebar /> */}



                <HomePage />


            </div>

            {/* <Footer /> */}
        </div>
    );
}

export default HomePageRoutes;