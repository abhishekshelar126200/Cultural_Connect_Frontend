import { httpPreservationClient } from "../Services/httpClient";
export const getActivitiesBySite = (siteId) =>
    httpPreservationClient.get(`/getActivitiesBySite/${siteId}`);

export const addPreservationActivity = (activityData) =>
    httpPreservationClient.post("/addActivity", activityData);

export const deletePreservationActivity = (activityId) =>
    httpPreservationClient.delete(`/deleteActivity/${activityId}`);
