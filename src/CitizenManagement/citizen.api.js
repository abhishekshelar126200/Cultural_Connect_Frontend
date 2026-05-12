import { httpProgramClient, httpCitizenClient, httpLoginClient,httpNotificationClient } from "../Services/httpClient";

export const getPrograms = () =>
    httpCitizenClient.get("/getAllCitizenProgram");

export const addProgram = (program) =>
    httpProgramClient.post("/programs", program);
export const updateProgram = (id, program) =>
    httpProgramClient.put(`/programs/${id}`, program);

export const deleteProgram = (id) =>
    httpProgramClient.delete(`/programs/${id}`);

// ✅ Notification APIs - Use httpLoginClient to reach /api/notifications directly
export const fetchNotifications = (userId) =>
    httpNotificationClient.get(`/user/${userId}`);

export const markAsRead = (id) => 
    httpNotificationClient.put(`/${id}/read`);

export const deleteNotification = (id) => 
    httpNotificationClient.delete(`/${id}`);