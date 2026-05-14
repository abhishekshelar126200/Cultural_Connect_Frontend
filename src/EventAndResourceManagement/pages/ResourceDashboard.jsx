import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllResources, deleteResource } from "../Resource.api";
import ResourceList from "../components/ResourceList";

export default function ResourceDashboard() {
    const [resources, setResources] = useState([]);
    const { programId, eventId } = useParams(); // Captured from App.js route

    const loadResources = async () => {
        try {
            const res = await getAllResources();
            // Filter resources belonging to this specific event
            const filtered = res.data.filter(r => r.eventId === Number(eventId));
            setResources(filtered);
        } catch (err) {
            console.error("Failed to fetch resources", err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this resource?")) return;
        try {
            await deleteResource(id);
            setResources(prev => prev.filter(r => r.resourceId !== id));
        } catch (err) {
            alert("Delete failed.");
        }
    };

    useEffect(() => {
        loadResources();
    }, [eventId]);

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-success">Event Resources</h3>
                <Link 
                    to={`/programmanager/createResource/${programId}/${eventId}`}
                    className="btn btn-success"
                >
                    ➕ Add Resource
                </Link>
            </div>

            {/* CRITICAL: Pass programId and eventId as props */}
            <ResourceList 
                resources={resources} 
                programId={programId} 
                eventId={eventId} 
                onDelete={handleDelete} 
            />

            {resources.length === 0 && (
                <div className="text-center mt-5 py-5 border rounded bg-light text-muted">
                    <p>No resources allocated for this event yet.</p>
                </div>
            )}
        </div>
    );
}