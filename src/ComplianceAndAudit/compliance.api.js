import { httpComplianceClient } from "../Services/httpClient";

export const getNewPrograms = () =>
    httpComplianceClient.get("/new-programs");

export const createCompliance = (complianceData) =>
    httpComplianceClient.post("/create", complianceData);

export const getAllCompliance = () =>
    httpComplianceClient.get(`/list`);