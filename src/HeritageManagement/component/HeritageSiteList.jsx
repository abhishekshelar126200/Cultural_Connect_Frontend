import React from "react";
import { Link } from "react-router-dom";

export default function HeritageSiteList({ sites, onDelete }) {
    const IMAGE_BASE_URL = "http://localhost:8086/uploads/";

    const handleDelete = (e, siteId) => {
        e.preventDefault();  // Prevents <Link> from navigating
        e.stopPropagation(); // Prevents the card click event

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this heritage site?"
        );

        if (confirmDelete) {
            onDelete(siteId);
        }
    };

    return (
        <div className="row g-4">
            {sites.map((site) => (
                <div className="col-md-6 col-lg-4" key={site.siteId}>
                    <Link
                        to={`/culturalofficer/heritageSiteDetails/${site.siteId}`}
                        className="text-decoration-none text-dark h-100 d-block"
                    >
                        <div className="card shadow-sm h-100 position-relative">

                            {/* Delete Button */}
                            <button
                                className="btn btn-sm btn-danger position-absolute"
                                style={{ top: "10px", right: "10px", zIndex: 10 }}
                                onClick={(e) => handleDelete(e, site.siteId)}
                                title="Delete Site"
                            >
                                🗑
                            </button>

                            {/* Fix: Render an actual <img> tag */}
                            {site.fileUri ? (
                                <img
                                    src={`${IMAGE_BASE_URL}${site.fileUri}`}
                                    alt={site.name}
                                    className="card-img-top"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                            ) : (
                                <div
                                    className="bg-light d-flex align-items-center justify-content-center"
                                    style={{ height: "200px" }}
                                >
                                    <span className="text-muted">No Image Available</span>
                                </div>
                            )}

                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title fw-bold">{site.name}</h5>

                                <p className="text-muted mb-2 small">
                                    📍 {site.location}
                                </p>

                                {/* Added truncation for cleaner UI */}
                                <p className="card-text text-secondary small flex-grow-1">
                                    {site.description?.length > 100
                                        ? `${site.description.substring(0, 100)}...`
                                        : site.description}
                                </p>

                                <div>
                                    <span
                                        className={`badge ${site.status === "Active" ? "bg-success" : "bg-secondary"
                                            }`}
                                    >
                                        {site.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}

            {sites.length === 0 && (
                <div className="col-12 text-center py-5">
                    <p className="text-muted">No heritage sites available.</p>
                </div>
            )}
        </div>
    );
}