import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResourceById, updateResource } from "../Resource.api";

export default function EditResource() {
    // 1. Capture IDs from the URL
    const { programId, eventId, resourceId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        type: "EQUIPMENT",
        quantity: 1,
        status: "APPROVED"
    });

    const [loading, setLoading] = useState(true);

    // 2. Load existing data on component mount
    useEffect(() => {
        const fetchResource = async () => {
            try {
                const res = await getResourceById(resourceId);
                // Pre-fill form with existing backend data
                setFormData({
                    name: res.data.name,
                    type: res.data.type,
                    quantity: res.data.quantity,
                    status: res.data.status
                });
            } catch (err) {
                console.error("Failed to load resource:", err);
                alert("Could not load resource data.");
            } finally {
                setLoading(false);
            }
        };
        fetchResource();
    }, [resourceId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 3. Construct the payload
        // We MUST include eventId because the backend's ResourceRequestDTO requires it (@NotNull)
        const payload = {
            ...formData,
            eventId: Number(eventId),
            quantity: Number(formData.quantity)
        };

        console.log("Submitting Update:", payload);

        try {
            await updateResource(resourceId, payload);
            alert("Resource updated successfully!");
            // Navigate back to the resource list for this event
            navigate(`/programmanager/eventResources/${programId}/${eventId}`);
        } catch (err) {
            console.error("Update failed:", err.response?.data);
            alert("Update failed. Please check your inputs.");
        }
    };

    if (loading) return <div className="text-center mt-5">Loading resource details...</div>;

    return (
        <div className="container mt-5">
            <div className="card shadow border-0 mx-auto" style={{ maxWidth: "550px" }}>
                <div className="card-body p-4">
                    <h3 className="text-success fw-bold mb-4">Edit Resource Allocation</h3>
                    
                    <form onSubmit={handleSubmit}>
                        {/* Resource Name */}
                        <div className="mb-3">
                            <label className="form-label fw-bold">Resource Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={formData.name} 
                                onChange={e => setFormData({...formData, name: e.target.value})} 
                                required 
                            />
                        </div>

                        {/* Resource Type */}
                        <div className="mb-3">
                            <label className="form-label fw-bold">Resource Type</label>
                            <select 
                                className="form-select" 
                                value={formData.type} 
                                onChange={e => setFormData({...formData, type: e.target.value})}
                            >
                                <option value="FUNDS">FUNDS</option>
                                <option value="VENUE">VENUE</option>
                                <option value="MATERIALS">MATERIALS</option>
                                <option value="EQUIPMENT">EQUIPMENT</option>
                                <option value="STAFF">STAFF</option>
                            </select>
                        </div>

                        {/* Quantity */}
                        <div className="mb-3">
                            <label className="form-label fw-bold">Quantity</label>
                            <input 
                                type="number" 
                                className="form-control" 
                                min="1"
                                value={formData.quantity} 
                                onChange={e => setFormData({...formData, quantity: e.target.value})} 
                                required 
                            />
                        </div>

                        {/* Status */}
                        <div className="mb-4">
                            <label className="form-label fw-bold">Status</label>
                            <select 
                                className="form-select" 
                                value={formData.status} 
                                onChange={e => setFormData({...formData, status: e.target.value})}
                            >
                                <option value="APPROVED">APPROVED</option>
                                <option value="PENDING">PENDING</option>
                                <option value="ALLOCATED">ALLOCATED</option>
                            </select>
                        </div>

                        {/* Action Buttons */}
                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-success w-100 py-2">
                                Save Changes
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-outline-secondary w-100 py-2" 
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="text-center mt-3 text-muted">
                <small>Linked to Event ID: {eventId}</small>
            </div>
        </div>
    );
}