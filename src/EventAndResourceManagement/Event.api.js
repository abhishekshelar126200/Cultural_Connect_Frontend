// src/EventAndResourceManagement/Event.api.js
import { httpEventClient } from "../Services/httpClient"; 

export const getAllEvents = () => 
    httpEventClient.get("/getallevents"); // ❌ Removed "/api/events" prefix

export const deleteEvent = (id) => 
    httpEventClient.delete(`/deleteevent/${id}`);

export const getEventById = (id) => 
    httpEventClient.get(`/geteventbyid/${id}`);

export const createEvent = (data) => 
    httpEventClient.post("/addevent", data);

export const updateEvent = (id, data) => 
    httpEventClient.put(`/updateevent/${id}`, data);