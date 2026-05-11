import React from "react";

export default function ResourceList({ resources = [], onDelete }) {
    const handleDelete = (e, resourceId) => {
        e.preventDefault();
        e.stopPropagation();

        if (window.confirm("Are you sure you want to remove this resource allocation?")) {
            onDelete(resourceId);
        }
    };

    return (
        <div className="row g-4">
            {resources.map((resource) => (
                <div className="col-md-6 col-lg-4" key={resource.resourceId}>
                    <div className="card shadow-sm h-100 border-start border-success border-4">
                        <button
                            className="btn btn-sm btn-outline-danger position-absolute"
                            style={{ top: "10px", right: "10px" }}
                            onClick={(e) => handleDelete(e, resource.resourceId)}
                        >
                            🗑
                        </button>

                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title fw-bold text-success">
                                {resource.name || "Unnamed Resource"}
                            </h5>
                            <div className="mb-2">
                                <span className="badge bg-info text-dark me-2">
                                    Type: {resource.type}
                                </span>
                            </div>
                            <p className="text-muted mb-2 small">🔢 Quantity: <strong>{resource.quantity}</strong></p>
                            <p className="small text-secondary mb-3">🆔 Event ID: {resource.eventId}</p>
                            <div className="mt-auto">
                                <span className={`badge ${resource.status === "APPROVED" ? "bg-success" : "bg-warning text-dark"}`}>
                                    {resource.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {resources.length === 0 && (
                <div className="col-12 text-center py-5 bg-light rounded border">
                    <p className="text-muted">No resources allocated for this event.</p>
                </div>
            )}
        </div>
    );
}