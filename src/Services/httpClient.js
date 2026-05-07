import axios from "axios";

const httpCitizenClient = axios.create({
    baseURL: "http://localhost:8081/api/citizens", // API Gateway
    headers: {
        "Content-Type": "application/json",
    },
});

const httpProgramClient = axios.create({
    baseURL: "http://localhost:8081/api/programs", // API Gateway
    headers: {
        "Content-Type": "application/json",
    },
});

const httpLoginClient = axios.create({
    baseURL: "http://localhost:8081/cultureconnect", // API Gateway
    headers: {
        "Content-Type": "application/json",
    },
});

export { httpCitizenClient, httpProgramClient, httpLoginClient };