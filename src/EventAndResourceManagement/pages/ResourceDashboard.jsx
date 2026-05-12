import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllResources, deleteResource } from "../Resource.api";
import ResourceList from "../components/ResourceList"; // Import your new component

export default function ResourceDashboard() {
    const { programId, eventId } = useParams();
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            const res = await getAllResources();
            // Filter global resources to only show those belonging to this event
            const filtered = res.data.filter(r => String(r.eventId) === String(eventId));
            setResources(filtered);
        } catch (err) {
            console.error("Error loading resources", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [eventId]);

    const handleDelete = async (id) => {
        try {
            await deleteResource(id);
            // Optimization: Remove from local state instead of re-fetching everything
            setResources(prev => prev.filter(r => r.resourceId !== id));
        } catch (err) {
            alert("Delete failed on server");
        }
    };

    if (loading) return <div className="text-center mt-5"><h5>Loading Resources...</h5></div>;

    return (
        <div className="container">
            {/* Breadcrumb Navigation */}
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/programmanager/programs">Programs</Link></li>
                    <li className="breadcrumb-item"><Link to={`/programmanager/programEvents/${programId}`}>Events</Link></li>
                    <li className="breadcrumb-item active">Resources</li>
                </ol>
            </nav>

            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="fw-bold text-success mb-0">Event Resources</h3>
                    <p className="text-muted small">Managing resources for Event #{eventId}</p>
                </div>
                <Link to={`/programmanager/createResource/${programId}/${eventId}`} className="btn btn-success shadow-sm">
                    ➕ Add Resource
                </Link>
            </div>

            {/* Use the ResourceList component to render the grid */}
            <ResourceList resources={resources} onDelete={handleDelete} />
        </div>
    );
}