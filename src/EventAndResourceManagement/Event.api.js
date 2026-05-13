import { httpEventClient } from "../Services/httpClient"; 

export const getAllEvents = () => 
    httpEventClient.get("/getallevents");

export const deleteEvent = (id) => 
    httpEventClient.delete(`/deleteevent/${id}`);

export const getEventById = (id) => 
    httpEventClient.get(`/geteventbyid/${id}`);

// Added this export to resolve CreateEvent.jsx error
export const createEvent = (data) => 
    httpEventClient.post("/addevent", data);

export const updateEvent = (id, data) => 
    httpEventClient.put(`/updateevent/${id}`, data);