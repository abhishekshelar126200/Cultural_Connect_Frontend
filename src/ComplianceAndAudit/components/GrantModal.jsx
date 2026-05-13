import React from "react";

export default function GrantModal({ data }) {
    return (
        <div className="modal fade" id="grantsModal" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">Grants</h5>
                        <button className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body">

                        {data.length === 0 && <p>No grants found</p>}

                        {data.map(grant => (
                            <div key={grant.grantId} className="card mb-3 shadow-sm">
                                <div className="card-body">

                                    <h5 className="fw-bold text-success">
                                        ₹ {grant.amount}
                                    </h5>

                                    <p>📅 Granted On: {grant.date}</p>

                                    <span className={`badge ${grant.status === "APPROVED"
                                            ? "bg-success"
                                            : "bg-secondary"
                                        }`}>
                                        {grant.status}
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