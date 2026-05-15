import React, { useState } from "react";
import { createProgram } from "../Services/programManager.api";
import { useNavigate } from "react-router-dom";

export default function CreateProgram() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        budget: 0,      // Mandatory field
        status: "ACTIVE" // Mandatory field
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "budget" ? (value === "" ? 0 : Number(value)) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createProgram(formData);
            alert("Program Created Successfully ✅");
            navigate("/programmanager/programs");
        } catch (error) {
            console.error("Backend Error:", error.response?.data);
            alert("Error: " + (error.response?.data?.message || "Check details correctly ❌"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-4 text-start">
            <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "600px" }}>
                <h3 className="mb-4 text-center fw-bold">Create Program</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Title</label>
                        <input type="text" name="title" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Description</label>
                        <textarea name="description" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Start Date</label>
                            <input type="date" name="startDate" className="form-control" onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">End Date</label>
                            <input type="date" name="endDate" className="form-control" onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="form-label fw-bold">Budget</label>
                        <input type="number" name="budget" className="form-control" value={formData.budget} onChange={handleChange} required />
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn btn-success" disabled={loading}>
                            {loading ? "Creating..." : "Create Program"}
                        </button>
                        <button type="button" className="btn btn-light" onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}