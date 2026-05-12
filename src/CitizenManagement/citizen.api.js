import { httpProgramClient, httpCitizenClient } from "../Services/httpClient";

export const getPrograms = () =>
    httpCitizenClient.get("/getAllCitizenProgram");

export const addProgram = (program) =>
    httpProgramClient.post("/programs", program);
export const updateProgram = (id, program) =>
    httpProgramClient.put(`/programs/${id}`, program);

export const deleteProgram = (id) =>
    httpProgramClient.delete(`/programs/${id}`);

export const getProgramById = (id) =>
    httpProgramClient.get(`/getProgram/${id}`);


export const applyForProgram = (data) => {
    return httpCitizenClient.post("/applyProgram", data);
};
