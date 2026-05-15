import React from "react";

function About() {
    return (
        <section className="py-5 my-4">
            <div className="container">
                <div className="row align-items-center">
                    {/* Left Side: Typography */}
                    <div className="col-lg-6 pe-lg-5 mb-5 mb-lg-0">
                        <h6 className="fw-bold text-uppercase mb-2" style={{ color: "#3b82f6", letterSpacing: "1.5px" }}>
                            About The Initiative
                        </h6>
                        <h2 className="display-6 fw-bold mb-4" style={{ color: "#0f172a" }}>
                            Bridging Citizens and Cultural Governance.
                        </h2>
                        <p className="lead mb-4" style={{ color: "#475569", fontSize: "1.1rem" }}>
                            CultureConnect is a government-driven digital platform designed to create transparency, accountability, and citizen participation in the arts.
                        </p>
                        <p className="mb-0" style={{ color: "#64748b" }}>
                            Our mission is to democratize access to cultural resources. Whether you are a local artisan seeking a grant or a citizen wanting to protect a heritage site, this portal provides the secure infrastructure to make it happen.
                        </p>
                        <hr className="my-4" style={{ width: "80px", border: "2px solid #fbbf24", opacity: 1 }} />
                    </div>

                    {/* Right Side: Visual Data Box */}
                    <div className="col-lg-6">
                        <div className="p-5 rounded-4 position-relative" style={{ backgroundColor: "#f8fafc", border: "1px solid #e2e8f0" }}>
                            <div className="d-flex align-items-start mb-4">
                                <i className="bi bi-check-circle-fill text-primary fs-4 me-3"></i>
                                <div>
                                    <h5 className="fw-bold" style={{ color: "#1e293b" }}>Real-time Notifications</h5>
                                    <p className="small mb-0" style={{ color: "#64748b" }}>Get SMS and email alerts regarding your grant approvals and event schedules.</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-start mb-4">
                                <i className="bi bi-shield-lock-fill text-primary fs-4 me-3"></i>
                                <div>
                                    <h5 className="fw-bold" style={{ color: "#1e293b" }}>End-to-End Encryption</h5>
                                    <p className="small mb-0" style={{ color: "#64748b" }}>Your data and documents are protected under strict government cybersecurity guidelines.</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-start">
                                <i className="bi bi-globe-central-south-asia text-primary fs-4 me-3"></i>
                                <div>
                                    <h5 className="fw-bold" style={{ color: "#1e293b" }}>Digital Inclusion</h5>
                                    <p className="small mb-0" style={{ color: "#64748b" }}>Available in multiple regional languages to support artists from every corner of the country.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;