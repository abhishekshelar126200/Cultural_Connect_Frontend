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



export {
    httpCitizenClient,
    httpProgramClient,
    httpLoginClient
};