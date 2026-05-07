import React from "react";

function Notifications() {
    return (
        <div className="container my-4">
            <h4 className="fw-bold mb-3">Notifications</h4>

            <div className="alert alert-info">
                Your grant application has been approved.
            </div>

            <div className="alert alert-warning">
                New cultural event registrations are now open.
            </div>
        </div>
    );
}

export default Notifications;