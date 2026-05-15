import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
 
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
    status: "ACTIVE",
    applicationIds: []
  });
 
  useEffect(() => {
    fetchPrograms();
  }, []);
 
  // ✅ FETCH PROGRAMS
  const fetchPrograms = async () => {
    const res = await getAllPrograms();
    const sorted = res.data.sort((a, b) => b.programId - a.programId);
    setPrograms(sorted);
  };
 
  // ✅ FORM CHANGE
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
 
  const handleEditChange = (e) =>
    setEditData({ ...editData, [e.target.name]: e.target.value });
 
  const formatDateForInput = (date) => {
    if (!date) return "";
    return date.split("T")[0];
  };
 
  // ✅ CREATE PROGRAM
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProgram(formData);
 
      alert("✅ Program Created");
      fetchPrograms();
 
      // clear form
      setFormData({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        budget: "",
        status: "ACTIVE"
      });
 
      // ✅ close modal
      window.bootstrap?.Modal.getInstance(window.bootstrap?.("createProgramModal")
)?.hide();
 
 
 
    } catch (err) {
      console.error(err);
      alert("❌ Error creating program");
    }
  };
 
  // ✅ DELETE
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteProgram(id);
      setPrograms(prev => prev.filter(p => p.programId !== id));
    }
  };
 
  // ✅ UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
 
    try {
      const res = await updateProgram(editData.programId, editData);
 
      setPrograms(prev =>
        prev.map(p =>
          p.programId === res.data.programId ? res.data : p
        )
      );
 
      // ✅ close modal
      window.bootstrap?.Modal.getInstance(
        document.getElementById("editProgramModal")
      )?.hide();
 
    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
    }
  };
 
  return (
    <div className="container mt-4">
 
      {/* HEADER */}
      <div className="d-flex justify-content-between mb-4">
        <h3>My Programs</h3>
 
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#createProgramModal"
        >
          + Add Program
        </button>
      </div>
 
      {/* TABLE */}
      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
 
        <tbody>
          {programs.map(p => (
            <tr key={p.programId}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/programmanager/programEvents/${p.programId}`)}
            >
              <td>{p.programId}</td>
              <td>{p.title}</td>
              <td>{p.startDate}</td>
              <td>{p.endDate}</td>
              <td>{p.status}</td>
 
              <td onClick={(e) => e.stopPropagation()}>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(p.programId)}
                >
                  Delete
                </button>
 
                <button
                  className="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#editProgramModal"
                  onClick={() => {
                    setEditData({
                      ...p,
                      startDate: formatDateForInput(p.startDate),
                      endDate: formatDateForInput(p.endDate),
                      applicationIds: p.applicationIds || []
                    });
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
 
      {/* ✅ EDIT MODAL */}
      <div className="modal fade" id="editProgramModal">
        <div className="modal-dialog">
          <div className="modal-content">
 
            <div className="modal-header">
              <h5>Edit Program</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
 
            <form onSubmit={handleUpdate} className="modal-body">
 
              <input type="text" name="title"
                className="form-control mb-2"
                value={editData.title}
                onChange={handleEditChange}
              />
 
              <textarea name="description"
                className="form-control mb-2"
                value={editData.description}
                onChange={handleEditChange}
              />
 
              <div className="row">
                <div className="col">
                  <input type="date" name="startDate"
                    className="form-control"
                    value={editData.startDate}
                    onChange={handleEditChange}
                  />
                </div>
 
                <div className="col">
                  <input type="date" name="endDate"
                    className="form-control"
                    value={editData.endDate}
                    onChange={handleEditChange}
                  />
                </div>
              </div>
 
              <input type="number" name="budget"
                className="form-control mt-2"
                value={editData.budget}
                onChange={handleEditChange}
              />
 
              <button className="btn btn-primary mt-3 w-100">
                Update Program
              </button>
 
            </form>
          </div>
        </div>
      </div>
 
      {/* ✅ CREATE PROGRAM MODAL */}
      <div className="modal fade" id="createProgramModal">
        <div className="modal-dialog">
          <div className="modal-content">
 
            <div className="modal-header">
              <h5>Create Program</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
 
            <form onSubmit={handleSubmit} className="modal-body">
 
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="form-control mb-2"
                value={formData.title}
                onChange={handleChange}
                required
              />
 
              <textarea
                name="description"
                placeholder="Description"
                className="form-control mb-2"
                value={formData.description}
                onChange={handleChange}
                required
              />
 
              <div className="row">
                <div className="col">
                  <input
                    type="date"
                    name="startDate"
                    className="form-control"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
 
                <div className="col">
                  <input
                    type="date"
                    name="endDate"
                    className="form-control"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
 
              <input
                type="number"
                name="budget"
                placeholder="Budget"
                className="form-control mt-2"
                value={formData.budget}
                onChange={handleChange}
                required
              />
 
              <button className="btn btn-success mt-3 w-100">
                Create Program
              </button>
 
            </form>
 
          </div>
        </div>
      </div>
 
    </div>
  );
}
 