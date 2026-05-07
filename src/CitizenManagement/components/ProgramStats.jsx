import React from 'react'

export default function ProgramStats({ programStats }) {
    const { appliedPrograms, approvedGrants, upcomingEvents, notifications } = programStats;

    return (
        <div className="row g-4">

            <div className="col-md-3">
                <div className="card text-center shadow-sm">
                    <div className="card-body">
                        <h6 className="text-muted">Applied Programs</h6>
                        <h3 className="fw-bold">{appliedPrograms}</h3>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card text-center shadow-sm">
                    <div className="card-body">
                        <h6 className="text-muted">Approved Grants</h6>
                        <h3 className="fw-bold">{approvedGrants}</h3>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card text-center shadow-sm">
                    <div className="card-body">
                        <h6 className="text-muted">Upcoming Events</h6>
                        <h3 className="fw-bold">{upcomingEvents}</h3>
                    </div>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card text-center shadow-sm">
                    <div className="card-body">
                        <h6 className="text-muted">Notifications</h6>
                        <h3 className="fw-bold">{notifications}</h3>
                    </div>
                </div>
            </div>

        </div>
    )
}
