import React, { useEffect, useState } from "react";
// 1. Added useNavigate
import { useNavigate } from "react-router-dom"; 
import {
    getAllPrograms,
    createProgram,
    deleteProgram,
    updateProgram
} from "../Services/programManager.api";

export default function ProgramManagerPrograms() {
    const [programs, setPrograms] = useState([]);
    const navigate = useNavigate(); // Initialize navigation

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        budget: "",
        status: "ACTIVE"
    });

    const [editData, setEditData] = useState({
        programId: "",
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        budget: "",
        status: "ACTIVE"
    });

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        const res = await getAllPrograms();
        const sorted = res.data.sort((a, b) => b.programId - a.programId);
        setPrograms(sorted);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProgram(formData);
            alert("Program Created ✅");
            fetchPrograms();
            setFormData({
                title: "", description: "", startDate: "",
                endDate: "", budget: "", status: "ACTIVE"
            });
            document.querySelector("#createProgramModal .btn-close").click();
        } catch (err) {
            alert("Enter the details correctly ❌");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            await deleteProgram(id);
            setPrograms(prev => prev.filter(p => p.programId !== id));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await updateProgram(editData.programId, editData);
            const updated = res.data;
            setPrograms(prev =>
                prev.map(p => p.programId === updated.programId ? updated : p)
            );
            document.querySelector("#editProgramModal .btn-close").click();
        } catch (err) {
            alert("Update failed ❌");
        }
    };

    const openEditModal = (program) => {
        setEditData(program);
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mt-4">
            <button
                className="btn btn-success mb-3"
                data-bs-toggle="modal"
                data-bs-target="#createProgramModal"
            >
                + Add Program
            </button>

            <h3 className="mb-3">My Programs</h3>

            <table className="table table-hover table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {programs.map(p => (
                        <tr 
                            key={p.programId} 
                            // 2. Row level navigation
                            onClick={() => navigate(`/programmanager/programEvents/${p.programId}`)} 
                            style={{ cursor: "pointer" }}
                        >
                            <td>{p.programId}</td>
                            <td>{p.title}</td>
                            <td>{p.description}</td>
                            <td>{p.startDate}</td>
                            <td>{p.endDate}</td>
                            <td>
                                <span className="badge bg-success">{p.status}</span>
                            </td>

                            {/* 3. Actions column prevents event bubbling to the row click */}
                            <td onClick={(e) => e.stopPropagation()}>
                                <button
                                    className="btn btn-danger btn-sm me-2"
                                    onClick={() => handleDelete(p.programId)}
                                >
                                    Delete
                                </button>

                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => openEditModal(p)}
                                    data-bs-toggle="modal"
                                    data-bs-target="#editProgramModal"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* --- Modals remain the same as your previous code --- */}
            {/* Create Modal */}
            <div className="modal fade" id="createProgramModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Create Program</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <input type="text" name="title" placeholder="Title" className="form-control mb-2" value={formData.title} onChange={handleChange} required />
                                <textarea name="description" placeholder="Description" className="form-control mb-2" value={formData.description} onChange={handleChange} required />
                                <input type="date" name="startDate" className="form-control mb-2" value={formData.startDate} onChange={handleChange} required />
                                <input type="date" name="endDate" className="form-control mb-2" value={formData.endDate} onChange={handleChange} required />
                                <input type="number" name="budget" placeholder="Budget" className="form-control mb-2" value={formData.budget} onChange={handleChange} required />
                                <button className="btn btn-success w-100">Create Program</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <div className="modal fade" id="editProgramModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Edit Program</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleUpdate}>
                                <input type="text" name="title" className="form-control mb-2" value={editData.title} onChange={handleEditChange} />
                                <textarea name="description" className="form-control mb-2" value={editData.description} onChange={handleEditChange} />
                                <input type="date" name="startDate" className="form-control mb-2" value={editData.startDate} onChange={handleEditChange} />
                                <input type="date" name="endDate" className="form-control mb-2" value={editData.endDate} onChange={handleEditChange} />
                                <input type="number" name="budget" className="form-control mb-2" value={editData.budget} onChange={handleEditChange} />
                                <button className="btn btn-primary w-100">Update Program</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}