import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteEvent, getEventsByProgramId } from "../Event.api";
import EventList from "../components/EventList";
    
export default function EventDashboard() {
    const [events, setEvents] = useState([]);
    const { programId } = useParams();
    
    const loadEvents = async () => {
        try {
            const res = await getEventsByProgramId(programId);
            setEvents(res.data || []); 
        } catch (err) {
            console.error("Failed to fetch events", err);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;

        try {
            await deleteEvent(eventId);
            setEvents(prev => prev.filter(event => event.eventId !== eventId));
        } catch (err) {
            alert("Failed to delete event");
        }
    };

    useEffect(() => {
        loadEvents();
    }, [programId]);

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-primary mb-0">Program Events</h3>

                {/* ✅ FIXED: Corrected template literal for programId */}
                <Link
                    to={`/programmanager/createEvent/${programId}`}
                    className="btn btn-primary"
                >
                    ➕ Add Event
                </Link>
            </div>

            {/* ✅ FIXED: Pass programId so the Edit buttons can build their URLs */}
            <EventList 
                events={events} 
                programId={programId} 
                onDelete={handleDeleteEvent} 
            />
            
            {events.length === 0 && (
                <div className="text-center mt-5 text-muted border p-5 rounded bg-light">
                    <p>No events found for this program.</p>
                </div>
            )}
        </div>
    );
}