import React from "react";

function Features() {
    return (
        <section className="container pb-5" style={{ marginTop: "-60px", position: "relative", zIndex: 10 }}>
            <div className="row g-4 justify-content-center">
                {/* Feature 1 */}
                <div className="col-lg-4 col-md-6">
                    <div className="card h-100 border-0 p-4 text-center custom-feature-card">
                        <div className="card-body">
                            <div className="icon-wrapper mb-4 mx-auto">
                                <i className="bi bi-file-earmark-text"></i>
                            </div>
                            <h5 className="fw-bold mb-3" style={{ color: "#1e293b" }}>Apply for Grants</h5>
                            <p className="mb-0" style={{ color: "#64748b", fontSize: "0.95rem" }}>
                                Securely apply for government-funded cultural programs and track your application status in real-time.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Feature 2 */}
                <div className="col-lg-4 col-md-6">
                    <div className="card h-100 border-0 p-4 text-center custom-feature-card">
                        <div className="card-body">
                            <div className="icon-wrapper mb-4 mx-auto">
                                <i className="bi bi-calendar3-event"></i>
                            </div>
                            <h5 className="fw-bold mb-3" style={{ color: "#1e293b" }}>Cultural Events</h5>
                            <p className="mb-0" style={{ color: "#64748b", fontSize: "0.95rem" }}>
                                Discover, register, and participate in national and regional cultural heritage festivals easily.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Feature 3 */}
                <div className="col-lg-4 col-md-6">
                    <div className="card h-100 border-0 p-4 text-center custom-feature-card">
                        <div className="card-body">
                            <div className="icon-wrapper mb-4 mx-auto">
                                <i className="bi bi-building"></i>
                            </div>
                            <h5 className="fw-bold mb-3" style={{ color: "#1e293b" }}>Heritage Preservation</h5>
                            <p className="mb-0" style={{ color: "#64748b", fontSize: "0.95rem" }}>
                                Engage with local communities to map, protect, and volunteer for regional heritage conservation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS for minimalist hover states */}
            <style>{`
                .custom-feature-card {
                    background: #ffffff;
                    border-radius: 16px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease-in-out;
                }
                .custom-feature-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 15px 30px rgba(15, 23, 42, 0.1);
                }
                .icon-wrapper {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: #f1f5f9;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.8rem;
                    color: #3b82f6; /* Unified Blue Icon */
                    transition: all 0.3s ease;
                }
                .custom-feature-card:hover .icon-wrapper {
                    background: #3b82f6;
                    color: white;
                }
            `}</style>
        </section>
    );
}

export default Features;