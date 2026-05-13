import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import {
    getAllPrograms,
    createProgram,
    deleteProgram,
    updateProgram
} from "../Services/programManager.api.js";

export default function ProgramManagerPrograms() {
    const [programs, setPrograms] = useState([]);
    const navigate = useNavigate();

    // 1. Ensure keys match the CulturalProgramRequestDto exactly
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        budget: 0, // Initialize as number
        status: "ACTIVE"
    });

    const [editData, setEditData] = useState({
        programId: "", title: "", description: "", startDate: "", endDate: "", budget: 0, status: "ACTIVE"
    });

    useEffect(() => { fetchPrograms(); }, []);

    const fetchPrograms = async () => {
        try {
            const res = await getAllPrograms();
            setPrograms(res.data || []);
        } catch (err) { console.error("Fetch failed", err); }
    };

    // 2. Data Type Conversion: Ensure budget is a Number
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ 
            ...formData, 
            [name]: name === "budget" ? (value === "" ? 0 : Number(value)) : value 
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData({ 
            ...editData, 
            [name]: name === "budget" ? (value === "" ? 0 : Number(value)) : value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Log for debugging to ensure data is clean
            console.log("Sending payload:", formData);
            await createProgram(formData);
            alert("Program Created ✅");
            fetchPrograms();
            document.querySelector("#createProgramModal .btn-close").click();
        } catch (err) { 
            // 3. Catch specific backend validation errors
            console.error("Submission Error:", err.response?.data);
            alert(`Error: ${err.response?.data?.message || "Validation failed on server"}`); 
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateProgram(editData.programId, editData);
            alert("Update Successful ✅");
            fetchPrograms();
            document.querySelector("#editProgramModal .btn-close").click();
        } catch (err) { 
            console.error("Update Error:", err.response?.data);
            alert("Update failed ❌"); 
        }
    };

    // ... Rest of your render logic (Table and Modals) ...
    return (
        <div className="container mt-4 text-start">
             {/* Header and Add Button */}
             <div className="d-flex justify-content-between mb-3">
                <h3>My Programs</h3>
                <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#createProgramModal">+ Add Program</button>
             </div>

             {/* Table */}
             <table className="table table-hover border">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Budget</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {programs.map(p => (
                        <tr key={p.programId} onClick={() => navigate(`/programmanager/programEvents/${p.programId}`, { state: p })} style={{cursor: 'pointer'}}>
                            <td>{p.programId}</td>
                            <td>{p.title}</td>
                            <td>${p.budget}</td>
                            <td>{p.status}</td>
                            <td onClick={(e) => e.stopPropagation()}>
                                <button className="btn btn-sm btn-primary me-2" onClick={() => setEditData(p)} data-bs-toggle="modal" data-bs-target="#editProgramModal">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
             </table>
             {/* MODALS GO HERE (Ensure IDs match data-bs-target) */}
        </div>
    );
}