import React from "react";
import { Link } from "react-router-dom";

// ✅ Added programId to the props destructuring
export default function EventList({ events, programId, onDelete }) {
    return (
        <div className="row g-4">
            {events.map((event) => (
                <div className="col-md-6 col-lg-4" key={event.eventId}>
                    <div className="card shadow-sm h-100 position-relative">
                        
                        {/* Delete Icon (Top Right) */}
                        <button
                            className="btn btn-sm text-danger position-absolute"
                            style={{ top: "10px", right: "10px", zIndex: 10 }}
                            onClick={() => onDelete(event.eventId)}
                        >
                            🗑
                        </button>

                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title fw-bold text-dark">{event.title}</h5>
                            <p className="text-muted mb-2 small">📍 {event.location}</p>
                            <p className="small text-secondary mb-3">📅 {event.date}</p>
                            
                            <div className="mt-auto d-flex flex-wrap gap-2 pt-3 border-top">
                                {/* Resources Link */}
                                <Link
                                    to={`/programmanager/eventResources/${programId}/${event.eventId}`}
                                    className="btn btn-sm btn-success flex-fill"
                                >
                                    📦 Resources
                                </Link>

                                {/* ✅ EDIT BUTTON: Now visible and using programId */}
                                <Link
                                    to={`/programmanager/editEvent/${programId}/${event.eventId}`}
                                    className="btn btn-sm btn-warning text-white flex-fill"
                                >
                                    ✏️ Edit
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}