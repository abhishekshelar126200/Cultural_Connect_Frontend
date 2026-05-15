import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginCitizen } from "../../citizen.api";
import logoImg from "../../../assets/logo.png";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (formData.email && formData.password) {
                const response = await loginCitizen(formData);
                const token = response.data.token;

                // ✅ store token
                localStorage.setItem("jwtToken", token);

                // ✅ decode JWT
                const payload = JSON.parse(atob(token.split('.')[1]));
                const userId = payload.userId;
                const username = payload.Username;
                localStorage.setItem("userId", userId); 
                localStorage.setItem("username", username); 
                localStorage.setItem("status", response.data.status);
 
                const role = payload.role;

                // ✅ redirect based on role
                if (role === "ADMIN") {
                    navigate("/admin/dashboard");
                } else if (role === "OFFICER") {
                    navigate("/culturalofficer/dashboard");
                } else if (role === "MANAGER") {
                    navigate("/programmanager/dashboard");
                } else if (role === "COMPLIANCE") {
                    navigate("/compliance-audit/new-programs");
                } else if (role === "AUDITOR") {
                    navigate("/audit/auditordashboard");
                } else {
                    navigate("/citizen/dashboard");
                }
                setLoading(false);
            } else {
                throw new Error();
            }
        } catch (err) {
            setLoading(false);
            setError("Invalid email or password");
        }
    };

    return (
        <div style={{ background: "radial-gradient(circle at top right, #1e293b, #0f172a)", minHeight: "100vh", display: "flex", alignItems: "center", padding: "40px 0" }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-5">
                        
                        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                            <div className="card-body p-5">
                                
                                <div className="text-center mb-4">
                                    <img 
                                    src={logoImg} 
                                    alt="CultureConnect Logo" 
                                     className="mb-3" 
                                     style={{ height: "70px", width: "auto", objectFit: "contain" }} 
                                      />
                                    <h3 className="fw-bold" style={{ color: "#0f172a" }}>Welcome Back</h3>
                                    <p className="text-muted">Sign in to access CultureConnect</p>
                                </div>

                                {error && (
                                    <div className="alert alert-danger d-flex align-items-center rounded-3 border-0" role="alert" style={{ backgroundColor: "#fef2f2", color: "#b91c1c" }}>
                                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                        <div>{error}</div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="form-label fw-medium text-muted small text-uppercase">Email Address</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0 text-muted"><i className="bi bi-envelope"></i></span>
                                            <input
                                                type="email"
                                                className="form-control form-control-lg bg-light border-start-0 ps-0"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter your email"
                                                required
                                                style={{ boxShadow: "none", borderColor: "#dee2e6" }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-medium text-muted small text-uppercase">Password</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0 text-muted"><i className="bi bi-key"></i></span>
                                            <input
                                                type="password"
                                                className="form-control form-control-lg bg-light border-start-0 ps-0"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Enter your password"
                                                required
                                                style={{ boxShadow: "none", borderColor: "#dee2e6" }}
                                            />
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-end mb-4">
                                        <Link to="/forgot-password" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: "500", fontSize: "0.9rem" }}>
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <div className="d-grid">
                                        <button
                                            type="submit"
                                            className="btn btn-lg fw-bold rounded-3"
                                            disabled={loading}
                                            style={{ backgroundColor: "#fbbf24", color: "#0f172a", border: "none", transition: "all 0.3s ease" }}
                                        >
                                            {loading ? (
                                                <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Authenticating...</>
                                            ) : (
                                                "Secure Login"
                                            )}
                                        </button>
                                    </div>
                                </form>

                                <div className="text-center mt-4 pt-3 border-top">
                                    <p className="mb-0 text-muted" style={{ fontSize: "0.95rem" }}>
                                        New to CultureConnect?{" "}
                                        <Link to="/register" style={{ color: "#1e293b", fontWeight: "600", textDecoration: "underline" }}>
                                            Register here
                                        </Link>
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;