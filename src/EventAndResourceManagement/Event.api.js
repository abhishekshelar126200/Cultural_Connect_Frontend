import { httpEventClient } from "../Services/httpClient"; 

// Get all events for the dashboard (filtered by programId in the component)
export const getAllEvents = () => 
    httpEventClient.get("/getallevents");

// Delete an event by ID
export const deleteEvent = (id) => 
    httpEventClient.delete(`/deleteevent/${id}`);

// Get single event for editing
export const getEventById = (id) => 
    httpEventClient.get(`/geteventbyid/${id}`);

// Create a new event
export const createEvent = (data) => 
    httpEventClient.post("/addevent", data);

// Update an existing event
export const updateEvent = (id, data) => 
    httpEventClient.put(`/updateevent/${id}`, data);