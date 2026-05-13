import React, { useEffect, useState } from "react";
import { getCitizenById, getDocuments, uploadDocument } from "../citizen.api";
import { deleteDocument } from "../citizen.api";

export default function ProfileModal({ onClose }) {

    const citizenId = localStorage.getItem("userId");

    const [citizen, setCitizen] = useState({});
    const [docs, setDocs] = useState([]);
    const [file, setFile] = useState(null);
    const [docType, setDocType] = useState("");

    // ✅ Load data on open
    useEffect(() => {
        loadProfile();
        loadDocuments();
    }, []);

    // ✅ Fetch profile
    const loadProfile = async () => {
        try {
            const res = await getCitizenById(citizenId);
            setCitizen(res.data);
        } catch (err) {
            console.error("Profile load error", err);
        }
    };

    // ✅ Fetch documents
    const loadDocuments = async () => {
        try {
            const res = await getDocuments(citizenId);
            setDocs(res.data);
        } catch (err) {
            console.error("Document load error", err);
        }
    };

    // ✅ Upload document
    const handleUpload = async () => {

        if (!file || !docType) {
            alert("Select file and type");
            return;
        }

        try {
            await uploadDocument(citizenId, file, docType);

            alert("✅ Uploaded successfully");

            setFile(null);
            setDocType("");

            loadDocuments(); // refresh list

        } catch (err) {
            console.error(err);
            alert("❌ Upload failed");
        }
    };
   const handleDelete = async (docId) => {

    try {
        const confirmDelete = window.confirm("Delete this document?");
        if (!confirmDelete) return;

        await deleteDocument(docId);

        alert("✅ Deleted successfully");

        loadDocuments(); // ✅ refresh list

    } catch (err) {

        console.log("DELETE ERROR 👉", err.response || err);

        if (err.response) {
            alert(err.response.data || "❌ Delete failed");
        } else {
            alert("❌ Server error");
        }
    }
};


    return (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    {/* ✅ HEADER */}
                    <div className="modal-header">
                        <h5>👤 My Profile</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    {/* ✅ BODY */}
                    <div className="modal-body">

                        {/* ================= DETAILS ================= */}
                        <h6>Personal Details</h6>

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label>Name</label>
                                <input className="form-control" value={citizen.name || ""} readOnly />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Email</label>
                                <input className="form-control" value={citizen.email || ""} disabled />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Phone</label>
                                <input className="form-control" value={citizen.phone || ""} readOnly />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Gender</label>
                                <input className="form-control" value={citizen.gender || ""} readOnly />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>DOB</label>
                                <input className="form-control" value={citizen.dob || ""} readOnly />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Status</label>
                                <input className="form-control" value={citizen.status || ""} disabled />
                            </div>

                        </div>

                        {/* ================= DOCUMENTS ================= */}
                        <hr />
                        <h6>Uploaded Documents</h6>

                        {docs.length === 0 && <p>No documents uploaded</p>}

                        {docs.map(doc => (
    <div key={doc.documentId} className="mb-2 d-flex align-items-center">

        <b>{doc.docType}</b>

        <a
            href={`http://localhost:8081${doc.fileUri}`}
            target="_blank"
            className="ms-2"
        >
            View
        </a>

        {/* ✅ DELETE ICON */}
        <button
            className="btn btn-sm btn-danger ms-3"
            onClick={() => handleDelete(doc.documentId)}
        >
            🗑
        </button>

    </div>
))}

                        {/* ================= UPLOAD ================= */}
                        <hr />
                        <h6>Upload New Document</h6>

                        <input
                            type="file"
                            className="form-control mb-2"
                            onChange={(e) => setFile(e.target.files[0])}
                        />

                        <select
                            className="form-control mb-2"
                            value={docType}
                            onChange={(e) => setDocType(e.target.value)}
                        >
                            <option value="">Select Document Type</option>
                            <option value="AADHAR">AADHAR</option>
                            <option value="PAN">PAN</option>
                        </select>

                        <button
                            className="btn btn-primary"
                            onClick={handleUpload}
                        >
                            Upload
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}