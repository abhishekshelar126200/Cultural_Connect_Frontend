import React from "react";

export default function ApplicationModal({ data }) {
    return (
        <div className="modal fade" id="applicationsModal" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">

                    {/* ✅ HEADER */}
                    <div className="modal-header">
                        <h5 className="modal-title">Applications</h5>
                        <button className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    {/* ✅ BODY */}
                    <div className="modal-body">

                        {data.length === 0 && (
                            <p className="text-muted">No applications found</p>
                        )}

                        {data.map((app) => (
                            <div key={app.applicationId} className="card mb-3 shadow-sm">
                                <div className="card-body">

                                    {/* ✅ Program Name */}
                                    <h5 className="fw-bold text-primary">
                                        {app.programName}
                                    </h5>

                                    {/* ✅ Citizen */}
                                    <p className="mb-1 text-muted">
                                        👤 Citizen ID: {app.citizenId}
                                    </p>

                                    {/* ✅ Submitted Date */}
                                    <p className="mb-1">
                                        📅 Submitted:{" "}
                                        {new Date(app.submittedDate).toLocaleString()}
                                    </p>

                                    {/* ✅ Status Badge */}
                                    <span
                                        className={`badge ${app.status === "APPROVED"
                                                ? "bg-success"
                                                : app.status === "PENDING"
                                                    ? "bg-warning text-dark"
                                                    : app.status === "REJECTED"
                                                        ? "bg-danger"
                                                        : "bg-secondary"
                                            }`}
                                    >
                                        {app.status}
                                    </span>

                                    {/* ✅ ID */}
                                    <div className="mt-2 text-muted small">
                                        Application ID: #{app.applicationId}
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </div>
    );
}