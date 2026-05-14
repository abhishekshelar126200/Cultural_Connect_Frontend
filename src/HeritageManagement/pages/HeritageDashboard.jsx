import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllHeritageSites, deleteHeritageSite, updateSiteStatus } from "../Heritage.api";
import HeritageSiteList from "../component/HeritageSiteList";

export default function HeritageDashboard() {
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadSites = async () => {
        try {
            setLoading(true);
            const res = await getAllHeritageSites();
            setSites(res.data);
        } catch (err) {
            console.error("Error loading sites:", err);
        } finally {
            setLoading(false);
        }
    };

    const onStatusChange = async (siteId, newStatus) => {
        try {
            await updateSiteStatus(siteId, newStatus);

            // ✅ Update UI instantly (no reload needed)
            setSites(prev =>
                prev.map(site =>
                    site.siteId === siteId
                        ? { ...site, status: newStatus }
                        : site
                )
            );

        } catch (err) {
            console.error("Failed to update status:", err);
            alert("Failed to update site status");
        }
    };

    const handleDeleteSite = async (siteId) => {
        try {
            await deleteHeritageSite(siteId);
            setSites(prev => prev.filter(site => site.siteId !== siteId));
        } catch (err) {
            alert("Failed to delete heritage site");
        }
    };

    useEffect(() => {
        loadSites();
    }, []);

    return (
        <div className="container py-4">
            {/* 🔹 Header Section: Only Title and Add Button */}
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h3 className="fw-bold text-dark mb-0" style={{ letterSpacing: "-0.5px" }}>
                    Heritage Sites
                </h3>
                <Link
                    to="/culturalofficer/createHeritageSite"
                    className="btn btn-primary px-4 shadow-sm fw-bold"
                    style={{ borderRadius: "8px" }}
                >
                    + Add Heritage Site
                </Link>
            </div>

            {/* 🔹 Main Content: Just the Grid */}
            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <HeritageSiteList sites={sites} onDelete={handleDeleteSite} onStatusChange={onStatusChange} />
            )}
        </div>
    );
}