import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllEvents, deleteHeritageSite } from "../Event.api";
import EventList from "../component/EventList";
export default function EventDashboard() {
    const [sites, setSites] = useState([]);

    const loadSites = async () => {
        const res = await getAllEvents();
        console.log("Fetched Events:", res.data);
        setSites(res.data); 
    };

    const handleDeleteSite = async (siteId) => {
        try {
            await deleteHeritageSite(siteId);

            // ✅ remove from UI
            setSites(prev =>
                prev.filter(site => site.siteId !== siteId)
            );

        } catch (err) {
            alert("Failed to delete heritage site");
        }
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
                    ➕ Add Event
                </Link>
            </div>

            {/* 🔹 Sites Grid */}
            <EventList sites={sites} onDelete={handleDeleteSite} />
        </div>
    );
}