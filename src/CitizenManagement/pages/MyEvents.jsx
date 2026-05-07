import React from "react";

function MyEvents() {
    return (
        <div className="container my-4">
            <h4 className="fw-bold mb-3">My Events</h4>

            <ul className="list-group shadow-sm">
                <li className="list-group-item d-flex justify-content-between">
                    <div>
                        <h6 className="mb-0">Cultural Fest – Chennai</h6>
                        <small className="text-muted">20 June 2026</small>
                    </div>
                    <span className="badge bg-primary align-self-center">
                        Registered
                    </span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                    <div>
                        <h6 className="mb-0">Heritage Awareness Workshop</h6>
                        <small className="text-muted">10 July 2026</small>
                    </div>
                    <span className="badge bg-secondary align-self-center">
                        Upcoming
                    </span>
                </li>
            </ul>
        </div>
    );
}

export default MyEvents;