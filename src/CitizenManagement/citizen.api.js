import { httpProgramClient, httpCitizenClient, httpLoginClient,httpNotificationClient } from "../Services/httpClient";

export const getPrograms = () =>
    httpCitizenClient.get("/getAllCitizenProgram");

export const addProgram = (program) =>
    httpProgramClient.post("/programs", program);
export const updateProgram = (id, program) =>
    httpProgramClient.put(`/programs/${id}`, program);

export const deleteProgram = (id) =>
    httpProgramClient.delete(`/programs/${id}`);

export const getProgramById = (id) =>
    httpProgramClient.get(`/getProgram/${id}`);


export const applyForProgram = (data) => {
    return httpCitizenClient.post("/applyProgram", data);
};

export const checkApplied = (citizenId, programId) => {
    return httpCitizenClient.get(
        `/checkApplication/${citizenId}/${programId}`
    );
};

export const getApplicationsByCitizen = (citizenId) =>
    httpCitizenClient.get(`/applications/${citizenId}`);

export const getCitizenById = (id) =>
    httpCitizenClient.get(`/${id}`);

export const getDocuments = (citizenId) =>
    httpCitizenClient.get(`/${citizenId}/documents`);

export const uploadDocument = (citizenId, file, docType) => {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("docType", docType);

    return httpCitizenClient.post(
        `/${citizenId}/documents`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
    );
};

export const deleteDocument = (docId) => {
    return httpCitizenClient.delete(`/documents/${docId}`);
};
// ✅ Notification APIs - Use httpLoginClient to reach /api/notifications directly
export const fetchNotifications = (userId) =>
    httpNotificationClient.get(`/user/${userId}`);

export const markAsRead = (id) => 
    httpNotificationClient.put(`/${id}/read`);

export const deleteNotification = (id) => 
    httpNotificationClient.delete(`/${id}`);