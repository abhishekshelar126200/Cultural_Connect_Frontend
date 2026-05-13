import { httpCitizenClient } from "../../Services/httpClient";

// ✅ Get all citizens
export const getAllCitizens = () => {
    return httpCitizenClient.get("");
};

// ✅ Get citizens by status
export const getCitizensByStatus = (status) => {
    return httpCitizenClient.get(`/status/${status}`);
};

export const updateCitizenStatus = (citizenId, status) => {
    return httpCitizenClient.patch(`/${citizenId}/status`, {
        status: status
    });
};

import axios from "axios";

export const getDocumentFile = async (citizenId) => {
    const token = localStorage.getItem("jwtToken");

    const res = await axios.get(
        `http://localhost:8081/api/citizens/document/${citizenId}`,
        {
            responseType: "blob", // ✅ VERY IMPORTANT
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return res.data;
};