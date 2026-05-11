import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createEvent } from "../Event.api";

export default function CreateEvent() {
    const { programId } = useParams(); // Captured from URL
    const navigate = useNavigate();

    // 1. Local state to store what the user types
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        date: "",
        participants: "",
        status: "PENDING"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 2. Combine form data with the programId from the URL
        const payload = {
            ...formData,
            programId: Number(programId),
            participants: Number(formData.participants)
        };

        try {
            await createEvent(payload);
            alert("Event created successfully!");
            navigate(`/programmanager/programEvents/${programId}`);
        } catch (err) {
            console.error("Backend Error:", err.response?.data);
            alert("Validation Failed. Check console for details.");
        }
    };

    return (
        <div className="container my-5">
            <div className="card shadow border-0 mx-auto" style={{ maxWidth: "600px" }}>
                <div className="card-body p-4">
                    <h3 className="text-center text-primary fw-bold mb-4">
                        Create Event for Program #{programId}
                    </h3>

                    {/* 3. The Form with Input Fields */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Event Title</label>
                            <input 
                                type="text" name="title" className="form-control" 
                                value={formData.title} onChange={handleChange} required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Location</label>
                            <input 
                                type="text" name="location" className="form-control" 
                                value={formData.location} onChange={handleChange} required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Event Date</label>
                            <input 
                                type="date" name="date" className="form-control" 
                                value={formData.date} onChange={handleChange} required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Planned Participants</label>
                            <input 
                                type="number" name="participants" className="form-control" 
                                value={formData.participants} onChange={handleChange} required 
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Status</label>
                            <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                                <option value="PENDING">PENDING</option>
                                <option value="APPROVED">APPROVED</option>
                            </select>
                        </div>

                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary btn-lg">
                                Save Event
                            </button>
                            <button type="button" className="btn btn-light" onClick={() => navigate(-1)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}