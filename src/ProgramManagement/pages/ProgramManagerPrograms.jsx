import React, { useEffect, useState } from "react";

import { getAllPrograms, createProgram, deleteProgram, updateProgram } from "../Services/programManager.api";

export default function ProgramManagerPrograms() {

    const [programs, setPrograms] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        budget: "",
        status: "ACTIVE"   // ✅ default
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

        // ✅ Sort latest first (by ID or date)
        const sorted = res.data.sort(
            (a, b) => b.programId - a.programId
        );

        setPrograms(sorted);
    };


    // ✅ handle form change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // ✅ handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createProgram(formData);

            alert("Program Created ✅");

            fetchPrograms(); // refresh table


            // ✅ RESET FORM
            setFormData({
                title: "",
                description: "",
                startDate: "",
                endDate: "",
                budget: "",
                status: "ACTIVE"
            });


            // ✅ close modal
            document.querySelector("#createProgramModal .btn-close").click();

        } catch (err) {
            console.error(err);
            alert("Enter the details correctly ❌");
        }
    };
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            await deleteProgram(id);

            // ✅ remove from UI instantly
            setPrograms(prev => prev.filter(p => p.programId !== id));
        }
    };
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const res = await updateProgram(editData.programId, editData);

            const updated = res.data;

            // ✅ update in UI
            setPrograms(prev =>
                prev.map(p => p.programId === updated.programId ? updated : p)
            );

            document.querySelector("#editProgramModal .btn-close").click();

        } catch (err) {
            console.error(err);
            alert("Update failed ❌");
        }
    };
    const openEditModal = (program) => {
        setEditData({
            programId: program.programId,
            title: program.title,
            description: program.description,
            startDate: program.startDate,
            endDate: program.endDate,
            budget: program.budget,
            status: program.status
        });
    };
    const handleEditChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        });
    };



    return (
        <div>

            {/* ✅ Add Button */}
            <button
                className="btn btn-success mb-3"
                data-bs-toggle="modal"
                data-bs-target="#createProgramModal"
                onClick={() => setFormData({
                    title: "",
                    description: "",
                    startDate: "",
                    endDate: "",
                    budget: "",
                    status: "ACTIVE"
                })}
            >
                + Add Program
            </button>

            <h3 className="mb-3">My Programs</h3>

            {/* ✅ Table */}
            <table className="table table-bordered">
                <thead>
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
                        <tr key={p.programId}>
                            <td>{p.programId}</td>
                            <td>{p.title}</td>
                            <td>{p.description}</td>
                            <td>{p.startDate}</td>
                            <td>{p.endDate}</td>
                            <td>
                                <span className="badge bg-success">
                                    {p.status}
                                </span>
                            </td>
                            <td>
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

            {/* ✅ MODAL POPUP */}
            <div className="modal fade" id="createProgramModal">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5>Create Program</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>

                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    value={formData.title}
                                    className="form-control mb-2"
                                    onChange={handleChange}
                                    required
                                />

                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    value={formData.description}
                                    className="form-control mb-2"
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="date"
                                    name="startDate"
                                    className="form-control mb-2"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="date"
                                    name="endDate"
                                    className="form-control mb-2"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="number"
                                    name="budget"
                                    placeholder="Budget"
                                    className="form-control mb-2"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    required
                                />

                                <button className="btn btn-success w-100">
                                    Create Program
                                </button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <div className="modal fade" id="editProgramModal">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5>Edit Program</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={handleUpdate}>

                                <input
                                    type="text"
                                    name="title"
                                    value={editData.title}
                                    onChange={handleEditChange}
                                    className="form-control mb-2"
                                />

                                <textarea
                                    name="description"
                                    value={editData.description}
                                    onChange={handleEditChange}
                                    className="form-control mb-2"
                                />

                                <input
                                    type="date"
                                    name="startDate"
                                    value={editData.startDate}
                                    onChange={handleEditChange}
                                    className="form-control mb-2"
                                />

                                <input
                                    type="date"
                                    name="endDate"
                                    value={editData.endDate}
                                    onChange={handleEditChange}
                                    className="form-control mb-2"
                                />

                                <input
                                    type="number"
                                    name="budget"
                                    value={editData.budget}
                                    onChange={handleEditChange}
                                    className="form-control mb-2"
                                />

                                <button className="btn btn-primary w-100">
                                    Update Program
                                </button>

                            </form>
                        </div>

                    </div>
                </div>
            </div>




        </div>
    );
}