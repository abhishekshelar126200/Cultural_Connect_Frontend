import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeritageSiteList({ sites, onDelete, onStatusChange }) {
    const [activeTab, setActiveTab] = useState("Active");

    const handleDelete = (e, siteId) => {
        e.preventDefault();
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this heritage site?")) {
            onDelete(siteId);
        }
    };

    const filteredSites = sites.filter((site) => site.status === activeTab);

    const statusCount = (status) =>
        sites.filter((s) => s.status === status).length;

    return (
        <div className="container py-4">

            {/* Tabs */}
            <div className="d-flex gap-3 mb-4">
                {["Active", "Inactive"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`btn rounded-pill px-4 fw-semibold ${activeTab === tab
                            ? "btn-primary shadow-sm"
                            : "btn-light border"
                            }`}
                    >
                        {tab} ({statusCount(tab)})
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="row g-4">
                {filteredSites.map((site) => (
                    <div className="col-md-6 col-lg-4" key={site.siteId}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div
                                className="text-decoration-none text-dark"
                            >
                                <div className="card h-100 shadow-sm border-0 rounded-4 position-relative hover-shadow">
                                    <div className="card-body d-flex flex-column justify-content-between">

                                        {/* Delete Button */}
                                        <button
                                            onClick={(e) => handleDelete(e, site.siteId)}
                                            className="btn btn-danger btn-sm position-absolute top-0 end-0 m-3 rounded-circle"
                                            style={{ width: "32px", height: "32px" }}
                                        >
                                            ×
                                        </button>

                                        {/* Content */}
                                        <div>
                                            <h5 className="fw-bold mb-2">{site.name}</h5>

                                            <p className="text-muted small mb-2">
                                                📍 {site.location}
                                            </p>

                                            <p className="text-secondary small">
                                                {site.description?.length > 100
                                                    ? `${site.description.substring(0, 100)}...`
                                                    : site.description}
                                            </p>
                                        </div>

                                        {/* Footer */}
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <select
                                                value={site.status}
                                                onChange={(e) => {
                                                    const newStatus = e.target.value;
                                                    if (!window.confirm("Change site status?")) return;
                                                    onStatusChange(site.siteId, newStatus);
                                                }}
                                                className={`form-select form-select-sm fw-semibold border-0 rounded-pill px-2 py-1 ${site.status === "Active"
                                                    ? "bg-success-subtle text-success"
                                                    : "bg-secondary-subtle text-secondary"
                                                    }`}
                                                style={{ width: "110px" }}
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>

                                            <Link to={`/culturalofficer/heritageSiteDetails/${site.siteId}`}><span className="text-primary small fw-semibold">
                                                View →
                                            </span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredSites.length === 0 && (
                <div className="text-center py-5">
                    <p className="text-muted">
                        No {activeTab.toLowerCase()} sites found.
                    </p>
                </div>
            )}
        </div>
    );
}
