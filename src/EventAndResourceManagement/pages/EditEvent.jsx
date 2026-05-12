import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, updateEvent } from "../Event.api";

export default function EditEvent() {
    const { programId, eventId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        location: "",
        date: "",
        participants: 0,
        status: "PENDING"
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await getEventById(eventId);
                // Map API response to local state
                setFormData({
                    title: res.data.title || "",
                    location: res.data.location || "",
                    date: res.data.date || "",
                    participants: res.data.participants || 0,
                    status: res.data.status || "PENDING"
                });
            } catch (err) {
                console.error("Fetch error:", err);
                alert("Failed to load event data.");
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [eventId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construct payload with required ID types for Spring Boot
        const payload = {
            ...formData,
            programId: Number(programId), 
            participants: Number(formData.participants)
        };

        try {
            await updateEvent(eventId, payload);
            alert("Event updated successfully!");
            navigate(`/programmanager/programEvents/${programId}`);
        } catch (err) {
            console.error("Update failed:", err.response?.data);
            alert("Update failed. Check console for details.");
        }
    };

    if (loading) return <div className="text-center mt-5"><h5>Loading Event Details...</h5></div>;

    return (
        <div className="container-fluid py-4">
            <div className="card shadow-sm border-0 mx-auto" style={{ maxWidth: "600px" }}>
                <div className="card-header bg-white border-0 pt-4 text-center">
                    <h3 className="fw-bold text-primary">Edit Event</h3>
                    <p className="text-muted small">Update details for Event #{eventId}</p>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Event Title</label>
                            <input 
                                type="text" className="form-control"
                                value={formData.title} 
                                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                                required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Location</label>
                            <input 
                                type="text" className="form-control"
                                value={formData.location} 
                                onChange={(e) => setFormData({...formData, location: e.target.value})} 
                                required 
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Date</label>
                                <input 
                                    type="date" className="form-control"
                                    value={formData.date} 
                                    onChange={(e) => setFormData({...formData, date: e.target.value})} 
                                    required 
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Participants</label>
                                <input 
                                    type="number" className="form-control"
                                    value={formData.participants} 
                                    onChange={(e) => setFormData({...formData, participants: e.target.value})} 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold">Status</label>
                            <select 
                                className="form-select"
                                value={formData.status}
                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                            >
                                <option value="PENDING">PENDING</option>
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="COMPLETED">COMPLETED</option>
                            </select>
                        </div>

                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary py-2 shadow-sm">
                                Save Changes
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-light py-2" 
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}