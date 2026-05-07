import React from "react";

function HeroSection() {
    return (
        <div className="bg-light py-5">
            <div className="container text-center">
                <h1 className="fw-bold mb-3">
                    Empowering Culture, Preserving Heritage
                </h1>
                <p className="lead text-muted mb-4">
                    A centralized platform for citizens and artists to access cultural
                    programs, grants, heritage initiatives, and events.
                </p>

                <div>
                    <button className="btn btn-primary btn-lg me-3">
                        Login
                    </button>
                    <button className="btn btn-outline-primary btn-lg">
                        Register as Citizen / Artist
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;