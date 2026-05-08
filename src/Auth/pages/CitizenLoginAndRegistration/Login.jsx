// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginCitizen } from "../../citizen.api";
// import toast from 'react-hot-toast';
// function Login() {

//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         email: "",
//         password: ""
//     });

//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);

//     // ✅ AUTO-REDIRECT IF TOKEN EXISTS
//     useEffect(() => {
//         const token = localStorage.getItem("jwtToken");
//         if (token) {
//             navigate("/citizen/dashboard");
//         }
//     }, [navigate]);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setLoading(true);

//         try {
//             const response = await loginCitizen(formData);

//             // ✅ Store JWT
//             localStorage.setItem("jwtToken", response.data.token);

//             setLoading(false);

//             const decodedToken = JSON.parse(atob(token.split('.')[1]));
//             const userRole = decodedToken.role;

//             if (userRole === 'ADMIN') {
//                 console.log("Admin logged in");
//                 navigate('/admin/dashboard');
//             } else {
//                 console.log("Citizen logged in");
//                 navigate('/citizen/dashboard');
//             }

//         } catch (err) {
//             setLoading(false);
//             setError("Invalid email or password");
//         }
//     };

//     return (
//         <div className="container my-5">
//             <div className="row justify-content-center">
//                 <div className="col-md-5">

//                     <div className="card shadow-lg border-0">
//                         <div className="card-body p-4">

//                             <h3 className="text-center fw-bold text-primary mb-2">
//                                 Welcome Back
//                             </h3>
//                             <p className="text-center text-muted mb-4">
//                                 Login to access CultureConnect
//                             </p>

//                             {error && (
//                                 <div className="alert alert-danger">
//                                     {error}
//                                 </div>
//                             )}

//                             <form onSubmit={handleSubmit}>

//                                 <div className="mb-3">
//                                     <label className="form-label">Email Address</label>
//                                     <input
//                                         type="email"
//                                         className="form-control"
//                                         name="email"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         placeholder="Enter your email"
//                                         required
//                                     />
//                                 </div>

//                                 <div className="mb-3">
//                                     <label className="form-label">Password</label>
//                                     <input
//                                         type="password"
//                                         className="form-control"
//                                         name="password"
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                         placeholder="Enter your password"
//                                         required
//                                     />
//                                 </div>

//                                 <div className="d-flex justify-content-between mb-3">
//                                     <Link to="/forgot-password" className="text-decoration-none">
//                                         Forgot Password?
//                                     </Link>
//                                 </div>

//                                 <div className="d-grid">
//                                     <button
//                                         type="submit"
//                                         className="btn btn-primary btn-lg"
//                                         disabled={loading}
//                                     >
//                                         {loading ? "Signing in..." : "Login"}
//                                     </button>
//                                 </div>

//                             </form>

//                             <hr className="my-4" />

//                             <p className="text-center mb-0">
//                                 New to CultureConnect?{" "}
//                                 <Link to="/citizen/register" className="fw-semibold">
//                                     Register here
//                                 </Link>
//                             </p>

//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginCitizen } from "../../citizen.api";
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

                const role = payload.role;   // ✅ IMPORTANT

                console.log("User Role:", role);

                // ✅ redirect based on role
                if (role === "ADMIN") {
                    navigate("/admin/dashboard");
                } else if (role === "OFFICER") {
                    navigate("/culturalofficer/dashboard");
                } else if (role === "MANAGER") {
                    navigate("/programmanager/dashboard");
                } else if (role === "COMPLIANCE") {
                    navigate("/compliance-audit/dashboard");
                } else if (role === "AUDITOR") {
                    navigate("/auditor/dashboard");
                } else {
                    navigate("/citizen/dashboard");  // default
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
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-5">

                    <div className="card shadow-lg border-0">
                        <div className="card-body p-4">

                            <h3 className="text-center fw-bold text-primary mb-2">
                                Welcome Back
                            </h3>
                            <p className="text-center text-muted mb-4">
                                Login to access CultureConnect
                            </p>

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>

                                <div className="d-flex justify-content-between mb-3">
                                    <Link to="/forgot-password" className="text-decoration-none">
                                        Forgot Password?
                                    </Link>
                                </div>

                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        disabled={loading}
                                    >
                                        {loading ? "Signing in..." : "Login"}
                                    </button>
                                </div>

                            </form>

                            <hr className="my-4" />

                            <p className="text-center mb-0">
                                New to CultureConnect?{" "}
                                <Link to="/register" className="fw-semibold">
                                    Register here
                                </Link>
                            </p>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;


