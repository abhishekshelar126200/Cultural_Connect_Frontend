import { httpEventClient } from "../Services/httpClient";

// 1. Get all events for a specific program
export const getEventsByProgramId = (programId) =>
    httpEventClient.get(`/getEventsByProgramId/${programId}`);

// 2. Get a single event details (Used for Editing)
export const getEventById = (id) => 
    httpEventClient.get(`/geteventbyid/${id}`);

// 3. Create a new event
export const createEvent = (eventData) =>
    httpEventClient.post("/addevent", eventData);

// 4. Update an existing event (Used for Editing)
export const updateEvent = (id, data) => 
    httpEventClient.put(`/updateevent/${id}`, data);

// 5. Delete an event
export const deleteEvent = (id) => 
    httpEventClient.delete(`/deleteevent/${id}`);