import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllHeritageSites } from "../../ProgramManagement/Heritage.api";
import HeritageSiteList from "../component/HeritageSiteList";

export default function HeritageDashboard() {
    const [sites, setSites] = useState([]);

    const loadSites = async () => {
        const res = await getAllHeritageSites();
        console.log("Fetched Heritage Sites:", res.data);
        setSites(res.data);
    };

    useEffect(() => {
        loadSites();
    }, []);

    return (
        <div className="container my-4">

            {/* 🔹 Header Row */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-primary mb-0">
                    Heritage Sites
                </h3>

                {/* ✅ Add Heritage Button */}
                <Link
                    to="/culturalofficer/createHeritageSite"
                    className="btn btn-primary"
                >
                    ➕ Add Heritage Site
                </Link>
            </div>

            {/* 🔹 Sites Grid */}
            <HeritageSiteList sites={sites} />
        </div>
    );
}