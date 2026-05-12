import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import {

    getAllPrograms,

    createProgram,

    deleteProgram,

    updateProgram

} from "../Services/programManager.api";
    export default function ProgramManagerPrograms() {
    const [programs, setPrograms] = useState([]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "", description: "", startDate: "", endDate: "", budget: "", status: "ACTIVE"
    });

    const [editData, setEditData] = useState({
        programId: "", title: "", description: "", startDate: "", endDate: "", budget: "", status: "ACTIVE"
    });

    useEffect(() => { fetchPrograms(); }, []);

    const fetchPrograms = async () => {
        const res = await getAllPrograms();
        const sorted = res.data.sort((a, b) => b.programId - a.programId);
        setPrograms(sorted);
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleEditChange = (e) => setEditData({ ...editData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProgram(formData);
            alert("Program Created ✅");
            fetchPrograms();
            setFormData({ title: "", description: "", startDate: "", endDate: "", budget: "", status: "ACTIVE" });
            document.querySelector("#createProgramModal .btn-close").click();
        } catch (err) { alert("Error creating program ❌"); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            await deleteProgram(id);
            setPrograms(prev => prev.filter(p => p.programId !== id));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await updateProgram(editData.programId, editData);
            setPrograms(prev => prev.map(p => p.programId === res.data.programId ? res.data : p));
            document.querySelector("#editProgramModal .btn-close").click();
        } catch (err) { alert("Update failed ❌"); }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-dark">My Programs</h3>
                <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#createProgramModal">
                    + Add Program
                </button>
            </div>

            <div className="card shadow-sm border-0">
                <table className="table table-hover mb-0">
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
                            <tr 
                                key={p.programId} 
                                onClick={() => navigate(`/programmanager/programEvents/${p.programId}`, { 
                                    state: { description: p.description, title: p.title } 
                                })} 
                                style={{ cursor: "pointer" }}
                            >
                                <td>{p.programId}</td>
                                <td className="fw-bold text-primary">{p.title}</td>
                                <td>{p.startDate}</td>
                                <td>{p.endDate}</td>
                                <td><span className="badge bg-success">{p.status}</span></td>
                                <td className="text-center" onClick={(e) => e.stopPropagation()}>
                                    <button className="btn btn-outline-danger btn-sm me-2" onClick={() => handleDelete(p.programId)}>Delete</button>
                                    <button className="btn btn-outline-primary btn-sm" onClick={() => { setEditData(p); }} data-bs-toggle="modal" data-bs-target="#editProgramModal">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create Modal */}
            <div className="modal fade" id="createProgramModal">
                <div className="modal-dialog">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header bg-success text-white">
                            <h5 className="modal-title">Create Program</h5>
                            <button className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-body">
                            <input type="text" name="title" placeholder="Program Title" className="form-control mb-3" onChange={handleChange} required />
                            <textarea name="description" placeholder="Program Description" className="form-control mb-3" rows="3" onChange={handleChange} required />
                            <div className="row">
                                <div className="col"><input type="date" name="startDate" className="form-control mb-3" onChange={handleChange} required /></div>
                                <div className="col"><input type="date" name="endDate" className="form-control mb-3" onChange={handleChange} required /></div>
                            </div>
                            <input type="number" name="budget" placeholder="Budget" className="form-control mb-3" onChange={handleChange} required />
                            <button className="btn btn-success w-100 py-2">Create Program</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <div className="modal fade" id="editProgramModal">
                <div className="modal-dialog">
                    <div className="modal-content border-0 shadow">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">Edit Program</h5>
                            <button className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <form onSubmit={handleUpdate} className="modal-body">
                            <input type="text" name="title" className="form-control mb-3" value={editData.title} onChange={handleEditChange} />
                            <textarea name="description" className="form-control mb-3" rows="3" value={editData.description} onChange={handleEditChange} />
                            <div className="row">
                                <div className="col"><input type="date" name="startDate" className="form-control mb-3" value={editData.startDate} onChange={handleEditChange} /></div>
                                <div className="col"><input type="date" name="endDate" className="form-control mb-3" value={editData.endDate} onChange={handleEditChange} /></div>
                            </div>
                            <input type="number" name="budget" className="form-control mb-3" value={editData.budget} onChange={handleEditChange} />
                            <button className="btn btn-primary w-100 py-2">Update Program</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}