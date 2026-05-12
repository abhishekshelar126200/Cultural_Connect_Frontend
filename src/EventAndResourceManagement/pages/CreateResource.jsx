import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createResource } from "../Resource.api";

export default function CreateResource() {
    const { programId, eventId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        type: "EQUIPMENT", // Default from your Enum
        quantity: 1,
        status: "APPROVED" // Default from your Status Enum
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const payload = {
            ...formData,
            eventId: Number(eventId), // Long in Java
            quantity: Number(formData.quantity) // int in Java
        };

        try {
            await createResource(payload);
            alert("Resource allocated!");
            navigate(`/programmanager/eventResources/${programId}/${eventId}`);
        } catch (err) {
            console.error("Backend Error:", err.response?.data);
            alert("Failed to create resource. Check console for DTO validation errors.");
        }
    };

    return (
        <div className="container py-4">
            <div className="card shadow mx-auto border-0" style={{ maxWidth: "550px" }}>
                <div className="card-body p-4">
                    <h3 className="text-center text-success mb-4">Allocate Resource</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Resource Name</label>
                            <input type="text" className="form-control" required
                                onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Resource Type</label>
                            <select className="form-select" value={formData.type} 
                                onChange={e => setFormData({...formData, type: e.target.value})}>
                                <option value="FUNDS">FUNDS</option>
                                <option value="VENUE">VENUE</option>
                                <option value="MATERIALS">MATERIALS</option>
                                <option value="EQUIPMENT">EQUIPMENT</option>
                                <option value="STAFF">STAFF</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Quantity</label>
                            <input type="number" className="form-control" min="1" value={formData.quantity}
                                onChange={e => setFormData({...formData, quantity: e.target.value})} />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Initial Status</label>
                            <select className="form-select" value={formData.status}
                                onChange={e => setFormData({...formData, status: e.target.value})}>
                                <option value="APPROVED">APPROVED</option>
                                <option value="PENDING">PENDING</option>
                                <option value="ALLOCATED">ALLOCATED</option>
                            </select>
                        </div>
                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-success w-100">Confirm Allocation</button>
                            <button type="button" className="btn btn-light w-100" onClick={() => navigate(-1)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}