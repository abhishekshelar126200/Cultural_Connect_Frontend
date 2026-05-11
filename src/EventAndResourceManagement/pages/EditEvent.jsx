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

    // Load existing event data
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await getEventById(eventId);
                // Ensure we only set fields that the form uses
                setFormData({
                    title: res.data.title,
                    location: res.data.location,
                    date: res.data.date,
                    participants: res.data.participants,
                    status: res.data.status
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

        // ✅ IMPORTANT: Inject programId into the payload
        const payload = {
            ...formData,
            programId: Number(programId), // Backend validation requires this
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

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="card shadow border-0 p-4 mx-auto" style={{ maxWidth: "550px" }}>
                <h3 className="fw-bold mb-4">Edit Event</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 text-start">
                        <label className="form-label fw-bold">Title</label>
                        <input 
                            type="text" className="form-control" name="title"
                            value={formData.title} 
                            onChange={(e) => setFormData({...formData, title: e.target.value})} 
                            required 
                        />
                    </div>

                    <div className="mb-3 text-start">
                        <label className="form-label fw-bold">Location</label>
                        <input 
                            type="text" className="form-control" name="location"
                            value={formData.location} 
                            onChange={(e) => setFormData({...formData, location: e.target.value})} 
                            required 
                        />
                    </div>

                    <div className="mb-3 text-start">
                        <label className="form-label fw-bold">Date</label>
                        <input 
                            type="date" className="form-control" name="date"
                            value={formData.date} 
                            onChange={(e) => setFormData({...formData, date: e.target.value})} 
                            required 
                        />
                    </div>

                    <div className="mb-4 text-start">
                        <label className="form-label fw-bold">Participants</label>
                        <input 
                            type="number" className="form-control" name="participants"
                            value={formData.participants} 
                            onChange={(e) => setFormData({...formData, participants: e.target.value})} 
                            required 
                        />
                    </div>

                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary py-2">Update Event</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}