import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerCitizen } from "../../citizen.api";
import logoImg from "../../../assets/logo.png"; // Assuming you want the logo here too!

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "", dob: "", gender: "", address: "", email: "", phone: "", password: ""
    });

    const [status, setStatus] = useState({ success: "", error: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // ✅ Added loading state

    // ✅ VALIDATION LOGIC
    const validateForm = () => {
        let newErrors = {};

        // Name: Requires at least First and Last name (checks for a space)
        if (!/^[A-Za-z]+(\s[A-Za-z]+)+$/.test(formData.name.trim())) {
            newErrors.name = "Please enter your full name (First and Last).";
        }
        // Email: Must contain @ and valid domain
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        // Phone: Exactly 10 digits
        if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be exactly 10 digits.";
        }
        // Password: Min 6 chars, 1 Uppercase, 1 Symbol
        if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/.test(formData.password)) {
            newErrors.password = "Must contain 6+ chars, 1 uppercase, and 1 symbol.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear specific error when user starts typing again
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ success: "", error: "" });

        if (!validateForm()) return;

        setLoading(true); // ✅ Start loading

        try {
            await registerCitizen(formData);
            
            setStatus({ success: "Registration successful! Redirecting to login...", error: "" });
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setLoading(false); // ✅ Stop loading on error
            setStatus({ success: "", error: "Registration failed. Please check your details and try again." });
            console.error(err.response?.data);
        }
    };

    return (
        <div style={{ background: "radial-gradient(circle at top right, #1e293b, #0f172a)", minHeight: "100vh", display: "flex", alignItems: "center", padding: "60px 0" }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8">
                        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
                            
                            <div className="card-body p-4 p-md-5">
                                {/* Sleek Header matching Login Page */}
                                <div className="text-center mb-4">
                                    <img src={logoImg} alt="CultureConnect Logo" className="mb-3" style={{ height: "60px", width: "auto", objectFit: "contain" }} />
                                    <h3 className="fw-bold" style={{ color: "#0f172a" }}>Citizen Registration</h3>
                                    <p className="text-muted">Join CultureConnect today to access grants and events.</p>
                                </div>

                                {status.success && (
                                    <div className="alert alert-success d-flex align-items-center rounded-3 border-0" style={{ backgroundColor: "#dcfce7", color: "#166534" }}>
                                        <i className="bi bi-check-circle-fill me-2 fs-5"></i> {status.success}
                                    </div>
                                )}
                                {status.error && (
                                    <div className="alert alert-danger d-flex align-items-center rounded-3 border-0" style={{ backgroundColor: "#fef2f2", color: "#b91c1c" }}>
                                        <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i> {status.error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    {/* Row 1: Name & Gender */}
                                    <div className="row g-3 mb-3">
                                        <div className="col-md-8">
                                            <label className="form-label small fw-medium text-muted text-uppercase">Full Name</label>
                                            <input type="text" name="name" required
                                                className={`form-control bg-light px-3 py-2 ${errors.name ? 'is-invalid border-danger' : 'border-0 shadow-none'}`}
                                                placeholder="e.g. Rahul Sharma"
                                                value={formData.name} onChange={handleChange} style={{ border: "1px solid #e2e8f0" }} />
                                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small fw-medium text-muted text-uppercase">Gender</label>
                                            <select name="gender" required
                                                className="form-select bg-light px-3 py-2 shadow-none"
                                                value={formData.gender} onChange={handleChange} style={{ border: "1px solid #e2e8f0" }}>
                                                <option value="" disabled>Select...</option>
                                                <option value="MALE">Male</option>
                                                <option value="FEMALE">Female</option>
                                                <option value="OTHER">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Row 2: DOB & Address */}
                                    <div className="row g-3 mb-3">
                                        <div className="col-md-4">
                                            <label className="form-label small fw-medium text-muted text-uppercase">Date of Birth</label>
                                            <input type="date" name="dob" required
                                                className="form-control bg-light px-3 py-2 shadow-none"
                                                value={formData.dob} onChange={handleChange} style={{ border: "1px solid #e2e8f0" }} />
                                        </div>
                                        <div className="col-md-8">
                                            <label className="form-label small fw-medium text-muted text-uppercase">Address</label>
                                            <input type="text" name="address" required
                                                className="form-control bg-light px-3 py-2 shadow-none"
                                                placeholder="City, State, PIN"
                                                value={formData.address} onChange={handleChange} style={{ border: "1px solid #e2e8f0" }} />
                                        </div>
                                    </div>

                                    {/* Row 3: Email & Phone */}
                                    <div className="row g-3 mb-4">
                                        <div className="col-md-6">
                                            <label className="form-label small fw-medium text-muted text-uppercase">Email Address</label>
                                            <input type="email" name="email" required
                                                className={`form-control bg-light px-3 py-2 ${errors.email ? 'is-invalid border-danger' : 'border-0 shadow-none'}`}
                                                placeholder="name@example.com"
                                                value={formData.email} onChange={handleChange} style={{ border: "1px solid #e2e8f0" }} />
                                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-medium text-muted text-uppercase">Phone Number</label>
                                            <div className="input-group overflow-hidden" style={{ borderRadius: "0.375rem" }}>
                                                <span className="input-group-text bg-white fw-bold text-secondary border-end-0" style={{ border: "1px solid #e2e8f0" }}>+91</span>
                                                <input type="tel" name="phone" required maxLength="10"
                                                    className={`form-control bg-light px-3 py-2 border-start-0 ${errors.phone ? 'is-invalid' : 'shadow-none'}`}
                                                    placeholder="10-digit number"
                                                    value={formData.phone} onChange={handleChange} style={{ border: "1px solid #e2e8f0" }} />
                                                {errors.phone && <div className="invalid-feedback d-block">{errors.phone}</div>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 4: Password */}
                                    <div className="mb-5">
                                        <label className="form-label small fw-medium text-muted text-uppercase">Secure Password</label>
                                        <input type="password" name="password" required
                                            className={`form-control bg-light px-3 py-2 ${errors.password ? 'is-invalid border-danger' : 'border-0 shadow-none'}`}
                                            placeholder="Create a strong password"
                                            value={formData.password} onChange={handleChange} style={{ border: "1px solid #e2e8f0" }} />
                                        {errors.password
                                            ? <div className="invalid-feedback">{errors.password}</div>
                                            : <small className="text-muted mt-2 d-block" style={{ fontSize: "0.8rem" }}>Requires 6+ characters, 1 uppercase letter, and 1 symbol (!@#$)</small>
                                        }
                                    </div>

                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-lg fw-bold rounded-3 py-3" disabled={loading} style={{ backgroundColor: "#fbbf24", color: "#0f172a", border: "none" }}>
                                            {loading ? (
                                                <><span className="spinner-border spinner-border-sm me-2"></span> Submitting...</>
                                            ) : (
                                                "Complete Registration"
                                            )}
                                        </button>
                                    </div>
                                    
                                    <div className="text-center mt-4 pt-3 border-top">
                                        <p className="mb-0 text-muted" style={{ fontSize: "0.95rem" }}>
                                            Already have an account?{" "}
                                            <Link to="/login" style={{ color: "#1e293b", fontWeight: "600", textDecoration: "underline" }}>
                                                Login here
                                            </Link>
                                        </p>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;