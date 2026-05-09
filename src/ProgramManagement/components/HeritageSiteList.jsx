import React from "react";
import { Link } from "react-router-dom";

export default function HeritageSiteList({ sites }) {
    const IMAGE_BASE_URL = "http://localhost:8086/uploads/";

    return (
        <div className="row g-4">
            {sites.map((site) => (
                <div className="col-md-6 col-lg-4" key={site.siteId}>

                    {/* ✅ Clickable Card */}
                    <Link
                        to={`/culturalofficer/heritageSiteDetails/${site.siteId}`}
                        className="text-decoration-none text-dark"
                    >
                        <div className="card shadow-sm h-100">

                            {site.fileUri && (
                                <img
                                    src={`${IMAGE_BASE_URL}${site.fileUri}`}
                                    className="card-img-top"
                                    alt={site.name}
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                            )}

                            <div className="card-body">
                                <h5 className="card-title fw-bold">
                                    {site.name}
                                </h5>

                                <p className="text-muted mb-2">
                                    📍 {site.location}
                                </p>

                                <p className="card-text">
                                    {site.description}
                                </p>

                                <span
                                    className={`badge ${site.status === "Active"
                                        ? "bg-success"
                                        : "bg-secondary"
                                        }`}
                                >
                                    {site.status}
                                </span>
                            </div>
                        </div>
                    </Link>

                </div>
            ))}

            {sites.length === 0 && (
                <p className="text-muted">No heritage sites available.</p>
            )}
        </div>
    );
}