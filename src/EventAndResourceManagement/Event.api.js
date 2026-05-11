import { httpEventClient } from "../Services/httpClient";

export const getAllEvents = () =>
    httpEventClient.get("/getallevents");

export const createEvent = (eventData) =>
    httpEventClient.post("/addevent", eventData);

    
export const getEventById = (eventId) =>
    httpEventClient.get(`/${eventId}`);

export const getEventsByProgramId = (programId) =>
    httpEventClient.get(`/getEventsByProgramId/${programId}`);

export const deleteEvent = (eventId) =>
    httpEventClient.delete(`/${eventId}`);  