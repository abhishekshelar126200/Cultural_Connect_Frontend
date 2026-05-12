import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getResourceById, updateResource } from "../Resource.api";

export default function EditResource() {
    const { programId, eventId, resourceId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        type: "EQUIPMENT",
        quantity: 1,
        status: "APPROVED"
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResource = async () => {
            try {
                const res = await getResourceById(resourceId);
                setFormData({
                    name: res.data.name,
                    type: res.data.type,
                    quantity: res.data.quantity,
                    status: res.data.status
                });
            } catch (err) {
                console.error("Fetch error:", err);
                alert("Failed to load resource data.");
            } finally {
                setLoading(false);
            }
        };
        fetchResource();
    }, [resourceId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // payload injected with eventId from URL to satisfy backend @NotNull
        const payload = {
            ...formData,
            eventId: Number(eventId), 
            quantity: Number(formData.quantity)
        };

        try {
            await updateResource(resourceId, payload);
            alert("Resource updated!");
            navigate(`/programmanager/eventResources/${programId}/${eventId}`);
        } catch (err) {
            console.error("Update failed:", err.response?.data);
            alert("Update failed. Check browser console.");
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container py-4">
            <div className="card shadow border-0 mx-auto" style={{ maxWidth: "500px" }}>
                <div className="card-body p-4 text-start">
                    <h3 className="fw-bold text-success mb-4 text-center">Edit Resource</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Resource Name</label>
                            <input 
                                type="text" className="form-control" 
                                value={formData.name} 
                                onChange={e => setFormData({...formData, name: e.target.value})} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Type</label>
                            <select className="form-select" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                                <option value="EQUIPMENT">EQUIPMENT</option>
                                <option value="FUNDS">FUNDS</option>
                                <option value="MATERIALS">MATERIALS</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-bold">Quantity</label>
                            <input 
                                type="number" className="form-control" 
                                value={formData.quantity} 
                                onChange={e => setFormData({...formData, quantity: e.target.value})} 
                                required 
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-success">Save Changes</button>
                            <button type="button" className="btn btn-light" onClick={() => navigate(-1)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}