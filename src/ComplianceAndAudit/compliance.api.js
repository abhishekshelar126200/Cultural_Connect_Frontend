import { httpComplianceClient, httpProgramClient, httpEventClient } from "../Services/httpClient";

export const getNewPrograms = () =>
    httpComplianceClient.get("/new-programs");

export const createCompliance = (complianceData) =>
    httpComplianceClient.post("/create", complianceData);

// compliance.api.js
export const updateCompliance = (id, complianceData) =>
    httpComplianceClient.patch(`/update/${id}`, complianceData);
export const getAllCompliance = () =>
    httpComplianceClient.get(`/list`);

export const deleteCompliance = (id) =>
    httpComplianceClient.delete(`/${id}/delete`);

export const getProgramDetails = (programId) =>
    httpComplianceClient.get(`/getProgramById/${programId}`);

export const getAllApplications = () =>
    httpComplianceClient.get("/getAllApplications");

// export const getGrantsByIds = (ids) =>
//     httpComplianceClient.post("/api/grants/byIds", ids);

export const getEventsByIds = (ids) =>
    httpComplianceClient.post("/api/events/byIds", ids);

export const getAllEvents = () =>
    httpEventClient.get("/getallevents");

export const get = () =>
    httpEventClient.get("/getallevents");
export const getGrantsByIds = (ids) => 
    httpComplianceClient.post("/api/applications/byIds", ids);