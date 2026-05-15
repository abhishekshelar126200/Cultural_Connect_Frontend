// Import the clients that have the TOKEN interceptor attached
import { httpAdminClient, httpAdminlogClient, httpReportClient, httpNotificationClient } from "../Services/httpClient";

// ✅ Fetch all users (Using AdminClient because it sends the Bearer Token)
export const getAllUsers = () => 
    httpAdminClient.get("/getAllUsers");

// ✅ Fetch all audit logs (Using AdminlogClient)
export const getAllAuditLogs = () => 
    httpAdminlogClient.get("/getAll");

// ✅ Deactivate a user by email
export const deactivateUser = (email) => 
    httpAdminClient.put(`/deactivateUser/${email}`);

// ✅ Get audit logs by specific user ID
export const getAuditLogsByUserId = (userId) => 
    httpAdminlogClient.get(`/getLogById/${userId}`);

// ✅ Get user by ID
export const getUserById = (userId) => 
    httpAdminClient.get(`/getUserById/${userId}`);


// ✅ Register a new user as Admin
export const registerUserByAdmin = (userData) => 
    httpAdminClient.post("/userRegisterByAdmin", userData);

// ✅ Delete a user by Admin
export const deleteUserByAdmin = (userId) => 
    httpAdminClient.delete(`/deleteUserByAdmin/${userId}`);

// ✅ Reports APIs
export const getDashboardSummary = () => 
    httpReportClient.get("/dashboard/summary");

// REMOVE the "/" to prevent double-slashes (e.g., /api/reports//)
export const getAllReports = () => 
    httpReportClient.get(""); 

// Use Axios 'params' object instead of string interpolation for the POST request
export const generateReport = (scope) => 
    httpReportClient.post("/generate", null, { 
        params: { scope: scope } 
    });

export const getReportById = (id) => 
    httpReportClient.get(`/${id}`);

//Notification

export const sendTargetedNotification = (data) => 
    httpNotificationClient.post("/send", data);

export const sendUniversalNotification = (data) => 
    httpNotificationClient.post("/universal", data);

export const getAllNotifications = () => 
    httpNotificationClient.get("");

export const deleteNotification = (id) => 
    httpNotificationClient.delete(`/${id}`);