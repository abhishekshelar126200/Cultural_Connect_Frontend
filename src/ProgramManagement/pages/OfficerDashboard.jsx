import React from "react";
import { Link } from "react-router-dom";

export default function OfficerDashboard() {
    const IMAGE_BASE_URL = "http://localhost:8086/uploads/";

    const heritageSites = [
        {
            siteId: "1778325932004",
            name: "Taj Mahal",
            location: "Agra",
            description: "Taj mahal",
            fileUri: "1778325932004/TajMahal.webp",
            status: "Active"
        },
        {
            siteId: "1778329096235",
            name: "Kailas Temple",
            location: "Ellora",
            description:
                "A megalith carved into a cliff face, it is considered one of the most remarkable cave temples in the world because of its size, architecture.",
            fileUri: "1778329096235/KailasTemple.jpg",
            status: "Active"
        }
    ];

    return (
        <div className="container my-5">

            <h2 className="fw-bold mb-4">Cultural Officer Dashboard</h2>

            {/* ✅ STAT CARDS */}
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card shadow-sm text-center p-3">
                        <h6 className="text-muted">Total Heritage Sites</h6>
                        <h3 className="fw-bold">{heritageSites.length}</h3>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm text-center p-3">
                        <h6 className="text-muted">Active Sites</h6>
                        <h3 className="fw-bold text-success">
                            {heritageSites.filter(s => s.status === "Active").length}
                        </h3>
                    </div>
                </div>
            </div>

            {/* ✅ HERITAGE SITES CARDS */}
            <div className="row g-4">
                {heritageSites.map(site => (
                    <div className="col-md-6" key={site.siteId}>
                        <div className="card shadow-sm h-100">

                            {site.fileUri && (
                                <img
                                    src={`${IMAGE_BASE_URL}${site.fileUri}`}
                                    alt={site.name}
                                    className="card-img-top"
                                    style={{ height: "220px", objectFit: "cover" }}
                                />
                            )}

                            <div className="card-body">
                                <h5 className="fw-bold">{site.name}</h5>

                                <p className="text-muted mb-1">
                                    📍 {site.location}
                                </p>

                                <p className="small">
                                    {site.description}
                                </p>

                                <span className="badge bg-success">
                                    {site.status}
                                </span>

                                <div className="mt-3">
                                    <Link
                                        to={`/heritage/${site.siteId}`}
                                        className="btn btn-sm btn-outline-primary"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}