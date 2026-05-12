import React from "react";
import { Link } from "react-router-dom";

export default function ResourceList({ resources, programId, eventId, onDelete }) {
    return (
        <div className="row g-4">
            {resources.map((res) => (
                <div className="col-md-6 col-lg-4" key={res.resourceId}>
                    <div className="card shadow-sm h-100 border-start border-success border-4">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start">
                                <h5 className="fw-bold text-dark">{res.name}</h5>
                                <span className="badge bg-light text-success border border-success">
                                    {res.type}
                                </span>
                            </div>
                            <p className="text-muted small mt-2 mb-3">Quantity: <strong>{res.quantity}</strong></p>
                            
                            <div className="d-flex gap-2 pt-2 border-top">
                                <Link 
                                    to={`/programmanager/editResource/${programId}/${eventId}/${res.resourceId}`} 
                                    className="btn btn-sm btn-outline-warning flex-fill"
                                >
                                    ✏️ Edit
                                </Link>
                                <button 
                                    onClick={() => onDelete(res.resourceId)} 
                                    className="btn btn-sm btn-outline-danger flex-fill"
                                >
                                    🗑 Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}