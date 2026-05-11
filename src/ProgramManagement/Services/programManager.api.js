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

// ✅ APIs
export const getAllPrograms = () => {
    return httpProgramClient.get("/getAllProgram");
};

export const getAllApplications = () => {
    return httpApplicationClient.get("/getAllApplicaiton");
};


export const createProgram = (data) => {
    return httpProgramClient.post("/createProgram", data);
}


export const deleteProgram = (id) => {
    return httpProgramClient.delete(`/deleteProgram/${id}`);
}
export const updateProgram = (id, data) => {
    return httpProgramClient.put(`/updateProgram/${id}`, data);
};


