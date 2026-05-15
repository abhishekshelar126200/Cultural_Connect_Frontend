import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { getAllEvents, deleteEvent } from "../Event.api.js"; 
import EventList from "../components/EventList";

// Correct path reaching from src/EventAndResourceManagement/pages to src/ProgramManagement/Services
import { getAllPrograms } from "../../ProgramManagement/Services/programManager.api.js"; 

export default function EventDashboard() {
    const { programId } = useParams();
    const location = useLocation();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const [headerData, setHeaderData] = useState({
        title: location.state?.title || "",
        description: location.state?.description || ""
    });

    useEffect(() => {
        const loadDashboardData = async () => {
            setLoading(true);
            try {
                // Fetch Events
                const eventRes = await getAllEvents();
                const filtered = eventRes.data.filter(e => e.programId === Number(programId));
                console.log("Fetched events:", filtered);
                setEvents(filtered);

                // Fallback for Title/Description if state is lost (on refresh/redirect)
                if (!headerData.title) {
                    const progRes = await getAllPrograms();
                    const current = progRes.data.find(p => p.programId === Number(programId));
                    if (current) {
                        setHeaderData({ title: current.title, description: current.description });
                    }
                }
            } catch (err) {
                console.error("Dashboard load error", err);
            } finally {
                setLoading(false);
            }
        };
        loadDashboardData();
    }, [programId]);

    const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
        try {
            // 1. Await the actual server-side deletion
            const res = await deleteEvent(id);
            
            // 2. Only update state if the status code indicates success (e.g., 200 OK or 204 No Content)
            if (res.status === 200 || res.status === 204) {
                setEvents(prev => prev.filter(e => e.eventId !== id));
                alert("Event deleted successfully ✅");
            } else {
                alert("Failed to delete from database. Status: " + res.status);
            }
        } catch (err) {
            // 3. Catch database constraints or network errors
            console.error("Delete error:", err.response?.data || err.message);
            
            // Helpful hint: Often 500 errors occur because of existing Resources linked to the Event
            const errorMessage = err.response?.status === 500 
                ? "Cannot delete event. Ensure all associated resources are deleted first." 
                : "Delete failed on server. ❌";
                
            alert(errorMessage);
        }
    }
};
    return (
        <div className="container mt-4 text-start">
            <div className="card shadow-sm border-0 border-start border-primary border-4 mb-4">
                <div className="card-body p-4">
                    <h2 className="fw-bold text-dark">{headerData.title || "Loading..."}</h2>
                    <p className="text-muted mb-0 mt-2">
                        <i className="bi bi-info-circle me-2"></i>
                        {headerData.description || "Loading description..."}
                    </p>
                </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold text-secondary m-0">Associated Events</h4>
                <Link to={`/programmanager/createEvent/${programId}`} className="btn btn-primary shadow-sm">+ Create New Event</Link>
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