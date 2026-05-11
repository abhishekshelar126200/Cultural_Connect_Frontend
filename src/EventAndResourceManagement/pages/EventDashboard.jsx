import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// Fixed imports: ensure deleteEvent is imported correctly
import { deleteEvent, getEventsByProgramId } from "../Event.api";
import EventList from "../components/EventList";

export default function EventDashboard() {
    const [events, setEvents] = useState([]);
    const { programId } = useParams();
    
    const loadEvents = async () => {
        try {
            const res = await getEventsByProgramId(programId);
            console.log("Fetched Events:", res.data);
            setEvents(res.data); 
        } catch (err) {
            console.error("Failed to fetch events", err);
        }
    };

    const handleDeleteEvent = async (eventId) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;

        try {
            await deleteEvent(eventId);

            // ✅ remove from UI
            setEvents(prev =>
                prev.filter(event => event.eventId !== eventId)
            );
        } catch (err) {
            alert("Failed to delete event");
        }
    };

    useEffect(() => {
        loadEvents();
    }, [programId]); // Added programId to dependencies

    return (
        <div className="container my-4">

            {/* 🔹 Header Row */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-primary mb-0">
                    Events {/* Updated from "Heritage Sites" */}
                </h3>

                {/* ✅ Add Event Button */}
                <Link
                    to="/programmanager/createEvent/${}"
                    className="btn btn-primary"
                >
                    ➕ Add Event
                </Link>
            </div>

            {/* 🔹 Events Grid */}
            {/* Fixed: Passed handleDeleteEvent instead of handleDeleteSite */}
            <EventList events={events} onDelete={handleDeleteEvent} />
            
            {events.length === 0 && (
                <div className="text-center mt-5 text-muted">
                    <p>No events found for this program.</p>
                </div>
            )}
        </div>
    );
}