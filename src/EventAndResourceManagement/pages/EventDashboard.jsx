import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { getAllEvents, deleteEvent } from "../Event.api"; 
import EventList from "../components/EventList";

// ✅ EXACT RELATIVE PATH based on your project structure
import { getAllPrograms } from "../../ProgramManagement/Services/programManager.api.js"; 

export default function EventDashboard() {
    const { programId } = useParams();
    const location = useLocation();
    
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initialize with location state if available (immediate display)
    const [headerData, setHeaderData] = useState({
        title: location.state?.title || "",
        description: location.state?.description || ""
    });

    useEffect(() => {
        const loadDashboardData = async () => {
            setLoading(true);
            try {
                // 1. Fetch Events
                const eventRes = await getAllEvents();
                const filtered = eventRes.data.filter(e => e.programId === Number(programId));
                setEvents(filtered);

                // 2. Fallback: If title is missing (after update/refresh), fetch from Program API
                if (!headerData.title) {
                    const programRes = await getAllPrograms();
                    const currentProgram = programRes.data.find(p => p.programId === Number(programId));
                    if (currentProgram) {
                        setHeaderData({
                            title: currentProgram.title,
                            description: currentProgram.description
                        });
                    }
                }
            } catch (err) {
                console.error("Dashboard data load error:", err);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, [programId]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteEvent(id);
                setEvents(prev => prev.filter(e => e.eventId !== id));
            } catch (err) {
                alert("Delete failed.");
            }
        }
    };

    if (loading && events.length === 0) {
        return <div className="text-center mt-5"><h5>Loading dashboard...</h5></div>;
    }

    return (
        <div className="container mt-4 text-start">
            {/* Header section that now persists through updates */}
            <div className="mb-4 p-4 bg-white shadow-sm rounded border-start border-primary border-4">
                <h2 className="fw-bold text-dark">{headerData.title || `Program Details (#${programId})`}</h2>
                <p className="text-muted mb-0 mt-2">
                    <i className="bi bi-info-circle me-2"></i>
                    {headerData.description || "No description available for this program."}
                </p>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold text-secondary m-0">Associated Events</h4>
                <Link to={`/programmanager/createEvent/${programId}`} className="btn btn-primary shadow-sm">
                    + Create New Event
                </Link>
            </div>

            {events.length > 0 ? (
                <EventList events={events} programId={programId} onDelete={handleDelete} />
            ) : (
                <div className="text-center py-5 bg-white rounded border border-dashed mt-3">
                    <p className="text-muted mb-0">No events found for this program.</p>
                </div>
            )}
        </div>
    );
}