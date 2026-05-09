import { httpHeritageClient, httpFileUploadClient } from "../Services/httpClient";

export const getAllHeritageSites = () =>
    httpHeritageClient.get("/getAllSites");

export const createHeritageSite = (siteData) =>
    httpHeritageClient.post("/addSite", siteData);

export const uploadImage = (siteId, imageFile) =>
    httpFileUploadClient.post(`/uploadImage/${siteId}`, imageFile);

export const getHeritageSiteById = (siteId) =>
    httpHeritageClient.get(`/getSitebyId/${siteId}`);

