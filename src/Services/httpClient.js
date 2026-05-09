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


export {
    httpCitizenClient,
    httpProgramClient,
    httpLoginClient,
    httpHeritageClient,
    httpFileUploadClient,
    httpPreservationClient
};