import { httpHeritageClient, httpFileUploadClient } from "../Services/httpClient";

export const getAllHeritageSites = () =>
    httpHeritageClient.get("/getAllSites");

export const createHeritageSite = (siteData) =>
    httpHeritageClient.post("/addSite", siteData);

export const uploadImage = (siteId, imageFile) =>
    httpFileUploadClient.post(`/uploadImage/${siteId}`, imageFile);

export const getHeritageSiteById = (siteId) =>
    httpHeritageClient.get(`/getSitebyId/${siteId}`);

export const deleteHeritageSite = (siteId) =>
    httpHeritageClient.delete(`/deleteSite/${siteId}`);

export const updateSiteStatus = (siteId, status) =>
    httpHeritageClient.put(
        `/updateSiteStatus/${siteId}`,
        null, // ✅ no request body
        {
            params: { status } // ✅ send as query parameter
        }
    );