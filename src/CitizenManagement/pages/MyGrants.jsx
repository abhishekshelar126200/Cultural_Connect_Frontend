import React from "react";

function MyGrants() {
    return (
        <div className="container my-4">
            <h4 className="fw-bold mb-3">My Grant Applications</h4>

            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Program Name</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>National Art Promotion Scheme</td>
                            <td>12 Mar 2026</td>
                            <td>
                                <span className="badge bg-success">Approved</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Folk Heritage Preservation Grant</td>
                            <td>22 Apr 2026</td>
                            <td>
                                <span className="badge bg-warning text-dark">
                                    Under Review
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyGrants;