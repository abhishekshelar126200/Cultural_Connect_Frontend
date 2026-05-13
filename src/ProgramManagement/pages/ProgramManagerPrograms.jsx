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

    const [formData, setFormData] = useState({
        title: "", 
        description: "", 
        startDate: "", 
        endDate: "", 
        budget: 0, // Ensure numeric default
        status: "ACTIVE"
    });

    const [editData, setEditData] = useState({
        programId: "", title: "", description: "", startDate: "", endDate: "", budget: 0, status: "ACTIVE"
    });

    useEffect(() => { fetchPrograms(); }, []);

    const fetchPrograms = async () => {
        try {
            const res = await getAllPrograms();
            const sorted = res.data.sort((a, b) => b.programId - a.programId);
            setPrograms(sorted);
        } catch (err) { console.error("Fetch failed", err); }
    };

    // Helper to handle numeric and text inputs correctly
    const handleInputChange = (e, setter) => {
        const { name, value } = e.target;
        setter(prev => ({
            ...prev,
            [name]: name === "budget" ? (value === "" ? 0 : Number(value)) : value
        }));
    };

    const handleChange = (e) => handleInputChange(e, setFormData);
    const handleEditChange = (e) => handleInputChange(e, setEditData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProgram(formData);
            alert("Program Created ✅");
            fetchPrograms();
            setFormData({ title: "", description: "", startDate: "", endDate: "", budget: 0, status: "ACTIVE" });
            document.querySelector("#createProgramModal .btn-close").click();
        } catch (err) {
            console.error("Backend Error Details:", err.response?.data);
            alert("Error: " + (err.response?.data?.message || "Check details correctly ❌"));
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await deleteProgram(id);
                setPrograms(prev => prev.filter(p => p.programId !== id));
            } catch (err) { alert("Delete failed ❌"); }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateProgram(editData.programId, editData);
            alert("Program Updated ✅");
            fetchPrograms();
            document.querySelector("#editProgramModal .btn-close").click();
        } catch (err) { alert("Update failed ❌"); }
    };

    return (
        <div className="container mt-4 text-start">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold">My Programs</h3>
                <button className="btn btn-success shadow-sm" data-bs-toggle="modal" data-bs-target="#createProgramModal">
                    + Add New Program
                </button>
            </div>

            <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table table-hover mb-0 align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {programs.map(p => (
                                <tr key={p.programId} onClick={() => navigate(`/programmanager/programEvents/${p.programId}`, { state: p })} style={{ cursor: "pointer" }}>
                                    <td>{p.programId}</td>
                                    <td className="fw-bold text-primary">{p.title}</td>
                                    <td>{p.startDate}</td>
                                    <td>{p.endDate}</td>
                                    <td><span className={`badge ${p.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}`}>{p.status}</span></td>
                                    <td className="text-center" onClick={(e) => e.stopPropagation()}>
                                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => setEditData(p)} data-bs-toggle="modal" data-bs-target="#editProgramModal">Edit</button>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(p.programId)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CREATE MODAL */}
            <div className="modal fade" id="createProgramModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <form className="modal-content" onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">Create New Program</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label fw-bold">Title</label>
                                <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Description</label>
                                <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} required />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">Start Date</label>
                                    <input type="date" name="startDate" className="form-control" value={formData.startDate} onChange={handleChange} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-bold">End Date</label>
                                    <input type="date" name="endDate" className="form-control" value={formData.endDate} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Budget</label>
                                <input type="number" name="budget" className="form-control" value={formData.budget} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-success">Save Program</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* EDIT MODAL */}
            <div className="modal fade" id="editProgramModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <form className="modal-content" onSubmit={handleUpdate}>
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">Edit Program</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label fw-bold">Title</label>
                                <input type="text" name="title" className="form-control" value={editData.title} onChange={handleEditChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Description</label>
                                <textarea name="description" className="form-control" value={editData.description} onChange={handleEditChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Status</label>
                                <select name="status" className="form-select" value={editData.status} onChange={handleEditChange}>
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="INACTIVE">INACTIVE</option>
                                    <option value="COMPLETED">COMPLETED</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-primary">Update Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}