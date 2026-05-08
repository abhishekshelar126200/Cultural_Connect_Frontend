import React from "react";

function Footer() {
    return (
        <footer className="bg-dark text-light py-3">
            <div className="container text-center">
                <small>
                    © {new Date().getFullYear()} CultureConnect | Government Cultural
                    Governance Platform
                </small>
            </div>
        </footer>
    );
}

export default Footer;
