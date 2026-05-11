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
                    <Link
                        to={`/events/${event.eventId}`}
                        className="text-decoration-none text-dark h-100 d-block"
                    >
                        <div className="card shadow-sm h-100 position-relative">

                            {/* Delete Button */}
                            <button
                                className="btn btn-sm btn-danger position-absolute"
                                style={{ top: "10px", right: "10px", zIndex: 10 }}
                                onClick={(e) => handleDelete(e, event.eventId)}
                                title="Delete Event"
                            >
                                🗑
                            </button>

                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title fw-bold">
                                    {event.title}
                                </h5>

                                <p className="text-muted mb-2 small">
                                    📍 {event.location}
                                </p>

                                <p className="small text-secondary mb-1">
                                    📅 {event.date}
                                </p>

                                <p className="small text-secondary flex-grow-1">
                                    Program ID: {event.programId}
                                </p>

                                <div>
                                    <span
                                        className={`badge ${
                                            event.status === "ACTIVE"
                                                ? "bg-success"
                                                : "bg-secondary"
                                        }`}
                                    >
                                        {event.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
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