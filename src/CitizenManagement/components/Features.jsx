import React from "react";

function Features() {
    return (
        <div className="container py-5">
            <h2 className="text-center fw-bold mb-4">
                What You Can Do on CultureConnect
            </h2>

            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Apply for Cultural Grants</h5>
                            <p className="card-text">
                                Explore government-funded cultural programs and apply for grants
                                with transparency and ease.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Participate in Cultural Events</h5>
                            <p className="card-text">
                                Register for national and regional cultural events and track
                                participation details.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card h-100 shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Heritage Preservation</h5>
                            <p className="card-text">
                                Learn about heritage sites, preservation activities, and cultural
                                conservation efforts.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Features;