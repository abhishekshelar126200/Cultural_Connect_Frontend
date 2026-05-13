// import { httpProgramClient } from "../services/axiosConfig";
// import { httpProgramClient } from "../ from "axios";
import axios from "axios";
import { httpProgramClient } from "../../Services/httpClient";

// ✅ create application client
const httpApplicationClient = axios.create({
    baseURL: "http://localhost:8081/api/applications",
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ attach token
httpApplicationClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
};


// ✅ APIs
export const getAllPrograms = () => {
    return httpProgramClient.get("/getAllProgram");
};

export const getAllApplications = () => {
    return httpApplicationClient.get("/getAllApplicaiton");
};

export const updateApplicationStatus = (id, data) => {
    return httpApplicationClient.patch(`/status/${id}`, data);
};


export const createProgram = (data) => {
    return httpProgramClient.post("/createProgram", data);
}


export const deleteProgram = (id) => {
    return httpProgramClient.delete(`/deleteProgram/${id}`);
}

export const updateProgram = (id, data) => {
    const payload = {
        ...data,
        programId: id,
        startDate: formatDate(data.startDate),
        endDate: formatDate(data.endDate),
        status: data.status || "ACTIVE",
        applicationIds: data.applicationIds || []
    };

    console.log("✅ Sending Update Payload:", payload);

    return httpProgramClient.put(`/updateProgram/${id}`, payload);
};
// ✅ GET CITIZEN DOCUMENT
// ✅ GET ALL DOCUMENTS FOR CITIZEN
export const getCitizenDocuments = async (citizenId) => {

    const token = localStorage.getItem("jwtToken");

    const res = await axios.get(
        `http://localhost:8081/api/citizens/${citizenId}/documents`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return res.data;
};export const downloadDocument = async (fileUri) => {

    const token = localStorage.getItem("jwtToken");

    // ✅ FIX: add full URL
    const res = await axios.get(
        `http://localhost:8081${fileUri}`,   // ✅ IMPORTANT FIX
        {
            responseType: "blob",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return res.data;
};
export const getApplicationsByCitizen = (citizenId) => {
    return httpApplicationClient.get(`/citizen/${citizenId}`);
};



