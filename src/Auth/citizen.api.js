import { httpProgramClient, httpCitizenClient, httpLoginClient } from "../Services/httpClient";

export const registerCitizen = (citizenData) =>
    httpCitizenClient.post("/register", citizenData);

export const loginCitizen = (citizenData) =>
    httpLoginClient.post("/login", citizenData);