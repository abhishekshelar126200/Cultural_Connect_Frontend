import axios from "axios";

// --------------- Citizen Client ---------------
const httpCitizenClient = axios.create({
    baseURL: "http://localhost:8081/api/citizens",
    headers: {
        "Content-Type": "application/json",
    },
});

// --------------- Program Client ---------------
const httpProgramClient = axios.create({
    baseURL: "http://localhost:8081/api/programs",
    headers: {
        "Content-Type": "application/json",
    },
});

// --------------- Login Client (NO TOKEN) ---------------
const httpLoginClient = axios.create({
    baseURL: "http://localhost:8081/cultureconnect",
    headers: {
        "Content-Type": "application/json",
    },
});


// --------------- Heritage Client ---------------
const httpHeritageClient = axios.create({
    baseURL: "http://localhost:8081/api/heritage-sites",
    headers: {
        "Content-Type": "application/json",
    },
});

// --------------- Preservation Client ---------------
const httpPreservationClient = axios.create({
    baseURL: "http://localhost:8081/api/activities",
    headers: {
        "Content-Type": "application/json",
    },
});


// --------------- Upload File Client ---------------
const httpFileUploadClient = axios.create({
    baseURL: "http://localhost:8081/api/heritage-sites",
});

// --------------- EventAndResource Client ---------------
const httpEventClient = axios.create({
    baseURL: "http://localhost:8081/api/events",
    headers: {
        "Content-Type": "application/json",
    },
});

// --------------- EventAndResource Client ---------------
const httpResourceClient = axios.create({
    baseURL: "http://localhost:8081/api/resources",
    headers: {
        "Content-Type": "application/json",
    },
});


// --------------- EventAndResource Client ---------------
const httpComplianceClient = axios.create({
    baseURL: "http://localhost:8081/compliance",
    headers: {
        "Content-Type": "application/json",
    },
});
// --------------- EventAndResource Client ---------------
const httpAuditClient = axios.create({
    baseURL: "http://localhost:8081/compliance",
    headers: {
        "Content-Type": "application/json",
    },
});
// --------------- Admin  Client ---------------
const httpAdminClient = axios.create({
    baseURL: "http://localhost:8081/cultureconnect",
    headers: {
        "Content-Type": "application/json",
    },
});

// --------------- Admin/audit logs  Client ---------------
const httpAdminlogClient = axios.create({
    baseURL: "http://localhost:8081/audit_log",
    headers: {
        "Content-Type": "application/json",
    },
});

// --------------- Admin/audit logs  Client ---------------
const httpNotificationClient = axios.create({
    baseURL: "http://localhost:8081/api/notifications",
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Attach interceptor ONLY to protected APIs
const attachToken = (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

httpCitizenClient.interceptors.request.use(attachToken);
httpProgramClient.interceptors.request.use(attachToken);
httpHeritageClient.interceptors.request.use(attachToken);
httpFileUploadClient.interceptors.request.use(attachToken);
httpPreservationClient.interceptors.request.use(attachToken);
httpEventClient.interceptors.request.use(attachToken);
httpResourceClient.interceptors.request.use(attachToken);
httpComplianceClient.interceptors.request.use(attachToken);
httpAdminClient.interceptors.request.use(attachToken);
httpNotificationClient.interceptors.request.use(attachToken);
httpAdminlogClient.interceptors.request.use(attachToken);
httpAuditClient.interceptors.request.use(attachToken);
export {
    httpCitizenClient,
    httpProgramClient,
    httpLoginClient,
    httpHeritageClient,
    httpFileUploadClient,
    httpPreservationClient,
    httpEventClient,
    httpResourceClient,
    httpComplianceClient,
    httpAdminClient,
    httpAdminlogClient,
    httpNotificationClient,
    httpAuditClient
}