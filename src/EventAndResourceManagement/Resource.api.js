import { httpResourceClient } from "../Services/httpClient";

export const createResource = (resourceData) =>
    httpResourceClient.post("/addresource", resourceData);

export const getAllResources = () =>
    httpResourceClient.get("/getallresource");

export const deleteResource = (id) =>
    httpResourceClient.delete(`/deleteresource/${id}`);

// Note: If you add an endpoint to fetch by Event ID later, update this.