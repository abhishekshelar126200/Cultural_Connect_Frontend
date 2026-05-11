import { httpResourceClient } from "../Services/httpClient";

// 1. Create a resource
export const createResource = (resourceData) =>
    httpResourceClient.post("/addresource", resourceData);

// 2. Get all resources (Dashboard filters these by eventId)
export const getAllResources = () =>
    httpResourceClient.get("/getallresource");

// 3. Get a single resource (Used for Editing)
export const getResourceById = (id) =>
    httpResourceClient.get(`/getresourcebyid/${id}`);

// 4. Update a resource
export const updateResource = (id, data) =>
    httpResourceClient.put(`/updateresource/${id}`, data);

// 5. Delete a resource
export const deleteResource = (id) =>
    httpResourceClient.delete(`/deleteresource/${id}`);