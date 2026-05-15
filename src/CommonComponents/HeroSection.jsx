import React from "react";

function HeroSection() {
    return (
        <section style={{ 
            background: "radial-gradient(circle at top right, #1e293b, #0f172a)", 
            color: "white",
            padding: "100px 0 140px 0", // Extra bottom padding for floating cards
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Subtle background glow effect */}
            <div style={{
                position: "absolute", top: "-10%", right: "-5%", width: "400px", height: "400px",
                background: "rgba(59, 130, 246, 0.3)", filter: "blur(100px)", borderRadius: "50%", zIndex: 0
            }}></div>

            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                <div className="row align-items-center">
                    {/* Left Content */}
                    <div className="col-lg-7 text-center text-lg-start mb-5 mb-lg-0">
                        <span className="badge px-3 py-2 rounded-pill mb-3" style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fbbf24", letterSpacing: "1px" }}>
                            <i className="bi bi-bank me-2"></i> Official Government Portal
                        </span>
                        <h1 className="display-4 fw-bold mb-4" style={{ lineHeight: "1.2" }}>
                            Empowering Culture, <br />
                            <span style={{ color: "#fbbf24" }}>Preserving Heritage.</span>
                        </h1>
                        <p className="lead mb-5" style={{ color: "#94a3b8", maxWidth: "600px", margin: "0 auto 0 0" }}>
                            A centralized digital ecosystem for citizens and artists. Seamlessly access cultural programs, grants, and heritage initiatives with complete transparency.
                        </p>

                        <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3">
                            <button className="btn btn-lg fw-bold px-5" style={{ backgroundColor: "#fbbf24", color: "#0f172a", border: "none", borderRadius: "8px" }}>
                                Login to Portal <i className="bi bi-arrow-right ms-2"></i>
                            </button>
                            <button className="btn btn-outline-light btn-lg px-4" style={{ borderRadius: "8px" }}>
                                Citizen Registration
                            </button>
                        </div>
                    </div>

                    {/* Right Abstract Visual / Stats */}
                    <div className="col-lg-5 d-none d-lg-block">
                        <div className="p-4 rounded-4 shadow-lg" style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                            <div className="d-flex align-items-center mb-4">
                                <div className="p-3 rounded-circle me-3" style={{ background: "rgba(59, 130, 246, 0.2)", color: "#60a5fa" }}>
                                    <i className="bi bi-shield-check fs-3"></i>
                                </div>
                                <div>
                                    <h5 className="mb-0 fw-bold">Verified Grants</h5>
                                    <small style={{ color: "#94a3b8" }}>100% Transparent Process</small>
                                </div>
                            </div>
                            <hr style={{ borderColor: "rgba(255,255,255,0.1)" }}/>
                            <div className="d-flex align-items-center mt-4">
                                <div className="p-3 rounded-circle me-3" style={{ background: "rgba(16, 185, 129, 0.2)", color: "#34d399" }}>
                                    <i className="bi bi-people fs-3"></i>
                                </div>
                                <div>
                                    <h5 className="mb-0 fw-bold">Active Artists</h5>
                                    <small style={{ color: "#94a3b8" }}>Join 50,000+ creators nationwide</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;