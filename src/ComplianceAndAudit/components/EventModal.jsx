import React from "react";

export default function EventModal({ data }) {
    return (
        <div className="modal fade" id="eventsModal" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Events</h5>
                        <button className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body">

                        {data.length === 0 && <p>No events found</p>}

                        {data.map(event => (
                            <div key={event.eventId} className="card mb-3 shadow-sm">
                                <div className="card-body">

                                    <h5 className="fw-bold text-primary">
                                        {event.title}
                                    </h5>

                                    <p className="text-muted">📍 {event.location}</p>
                                    <p>📅 {event.date}</p>

                                    <span className={`badge ${event.status === "ACTIVE"
                                            ? "bg-success"
                                            : "bg-warning text-dark"
                                        }`}>
                                        {event.status}
                                    </span>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}