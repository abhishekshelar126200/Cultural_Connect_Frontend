// Import the clients that have the TOKEN interceptor attached
import { httpAdminClient, httpAdminlogClient } from "../Services/httpClient";

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