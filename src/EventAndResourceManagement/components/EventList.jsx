import React from "react";
import { Link } from "react-router-dom";

export default function EventList({ events, onDelete }) {
    const handleDelete = (e, eventId) => {
        e.preventDefault();
        e.stopPropagation();

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (confirmDelete) {
            onDelete(eventId);
        }
    };

    return (
        <div className="row g-4">
            {events.map((event) => (
                <div className="col-md-6 col-lg-4" key={event.eventId}>
                    {/* The main card Link - leads to Event Details */}
                    <div className="card shadow-sm h-100 position-relative">
                        
                        {/* Delete Button */}
                        <button
                            className="btn btn-sm btn-danger position-absolute"
                            style={{ top: "10px", right: "10px", zIndex: 10 }}
                            onClick={(e) => handleDelete(e, event.eventId)}
                        >
                            🗑
                        </button>

                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title fw-bold">{event.title}</h5>
                            <p className="text-muted mb-2 small">📍 {event.location}</p>
                            <p className="small text-secondary mb-1">📅 {event.date}</p>
                            
                            <div className="mt-auto">
                                <span className={`badge ${event.status === "ACTIVE" ? "bg-success" : "bg-secondary"} mb-3`}>
                                    {event.status}
                                </span>

                                {/* ✅ ADDED THIS LINK HERE ✅ */}
                                <div className="d-grid border-top pt-2">
                                    <Link
                                        to={`/programmanager/eventResources/${event.programId}/${event.eventId}`}
                                        className="btn btn-sm btn-outline-primary"
                                    >
                                        📦 Manage Resources
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {events.length === 0 && (
                <div className="col-12 text-center py-5">
                    <p className="text-muted">No events available.</p>
                </div>
            )}
        </div>
    );
}