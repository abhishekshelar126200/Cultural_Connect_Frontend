import { useEffect, useState } from "react";
import {
    getAllApplications,
    updateApplicationStatus
} from "../Services/programManager.api";
// import { getCitizenDocuments } from "../Services/programManager.api";
import { getCitizenDocuments, downloadDocument }
from "../Services/programManager.api";



export default function ProgramApplications() {
    const [documents, setDocuments] = useState([]);

    const [apps, setApps] = useState([]);
    const [filter, setFilter] = useState("PENDING");
    const [selectedApp, setSelectedApp] = useState(null);
    const [amount, setAmount] = useState("");

    useEffect(() => {
        loadApps();
    }, []);

    // ✅ LOAD + SORT (LATEST FIRST)
    const loadApps = async () => {
        const res = await getAllApplications();
        const sorted = res.data.sort(
            (a, b) => b.applicationId - a.applicationId
        );
        setApps(sorted);
    };

    // ✅ FILTER
    const filteredApps = apps.filter(app => {
        if (filter === "ALL") return true;
        return app.status === filter;
    });

   // ✅ APPROVE
const approve = async () => {

    const numericAmount = Number(amount); // ✅ convert to number

    if (!numericAmount || numericAmount <= 0) {
        alert("Enter valid amount");
        return;
    }

    if (numericAmount > selectedApp.remainingBudget) {
        alert("❌ Cannot exceed remaining budget");
        return;
    }

    try {
        await updateApplicationStatus(selectedApp.applicationId, {
            status: "APPROVED",
            approvedAmount: numericAmount
        });

        // ✅ update UI instantly
        setApps(prev =>
            prev.map(a =>
                a.applicationId === selectedApp.applicationId
                    ? {
                        ...a,
                        status: "APPROVED",
                        grantAmount: numericAmount
                    }
                    : a
            )
        );

        // ✅ reset state
        setAmount("");
        setSelectedApp(null);

        // ✅ close modal (optional but clean UX)
        document.querySelector("#approveModal .btn-close")?.click();

        alert("✅ Approved");

    } catch (err) {
        console.error(err);
        alert("❌ Approval failed");
    }
};

    // ✅ REJECT
   // ✅ REJECT
const reject = async (app) => {
    await updateApplicationStatus(app.applicationId, {
        status: "REJECTED"
    });

    setApps(prev =>
        prev.map(a =>
            a.applicationId === app.applicationId
                ? { ...a, status: "REJECTED" }
                : a
        )
    );

    alert("❌ Rejected");
};

// ✅ ✅ ✅ ADD HERE (CORRECT LOCATION)
const viewDocument = async (fileUri) => {
    try {

        // ✅ FIX: decode HTML-encoded characters
        const cleanUri = fileUri.replaceAll("&amp;", "&");

        const blob = await downloadDocument(cleanUri);

        const url = window.URL.createObjectURL(blob);
        window.open(url, "_blank");

    } catch (err) {
        console.error(err);
        alert("❌ Unable to open document");
    }
};




    return (
        <div className="container">

            <h3>Grant Applications</h3>

            {/* ✅ FILTER BUTTONS */}
            <div className="mb-3">

                <button
                    className={`btn me-2 ${filter === "ALL" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setFilter("ALL")}
                >
                    ALL
                </button>

                <button
                    className={`btn me-2 ${filter === "PENDING" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setFilter("PENDING")}
                >
                    PENDING
                </button>

                <button
                    className={`btn me-2 ${filter === "APPROVED" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setFilter("APPROVED")}
                >
                    APPROVED
                </button>

                <button
                    className={`btn ${filter === "REJECTED" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setFilter("REJECTED")}
                >
                    REJECTED
                </button>

            </div>

            <table className="table table-bordered">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Program</th>
                        <th>Citizen</th>
                        <th>Budget</th>
                        <th>Remaining</th>
                        <th>Status</th>
                        <th>Grant</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredApps.map(app => (
                        <tr key={app.applicationId}>

                            <td>{app.applicationId}</td>

                            <td>{app.programName}</td>

                            {/* ✅ CITIZEN CLICK */}
                            <td>
                                <button
                                    className="btn btn-link text-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#citizenModal"
                                   onClick={async () => {
    setSelectedApp(app);

    try {
        const res = await getCitizenDocuments(app.citizenId);
        setDocuments(res);
    } catch (err) {
        console.error(err);
        setDocuments([]);
    }
}}

                                >
                                    {app.citizenName}
                                </button>
                            </td>

                            <td>₹ {app.programBudget}</td>

                            <td>
                                <span className={
                                    app.remainingBudget < 5000
                                        ? "text-danger fw-bold"
                                        : "text-success"
                                }>
                                    ₹ {app.remainingBudget}
                                </span>
                            </td>

                            {/* ✅ STATUS BADGE */}
                            <td>
                                <span className={
                                    app.status === "APPROVED"
                                        ? "badge bg-success"
                                        : app.status === "REJECTED"
                                            ? "badge bg-danger"
                                            : "badge bg-warning"
                                }>
                                    {app.status}
                                </span>
                            </td>

                            <td>{app.grantAmount || "-"}</td>

                            <td>
                                <button
                                    className="btn btn-success btn-sm me-2"
                                    disabled={app.status !== "PENDING"}
                                    data-bs-toggle="modal"
                                    data-bs-target="#approveModal"
                                    onClick={() => setSelectedApp(app)}
                                >
                                    Approve
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    disabled={app.status !== "PENDING"}
                                    onClick={() => reject(app)}
                                >
                                    Reject
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>

            {/* ✅ APPROVE MODAL */}
            <div className="modal fade" id="approveModal">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5>Approve Grant</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <p>Remaining: ₹ {selectedApp?.remainingBudget}</p>

                            <input
                                type="number"
                                className="form-control"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                            />
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-success" onClick={approve}>
                                Approve
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* ✅ CITIZEN MODAL */}
            <div className="modal fade" id="citizenModal">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5>Citizen Profile</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">

                            {selectedApp && (
                                <>
                                    <p><b>Name:</b> {selectedApp.citizenName}</p>
                                    <p><b>Email:</b> {selectedApp.citizenEmail}</p>

                                    <h6>Documents</h6>

{documents.length === 0 && <p>No documents available</p>}

{documents.map(doc => (
    <div key={doc.documentId} className="mb-2">

        <b>{doc.docType}</b>

        <button
    className="btn btn-link ms-2"
    onClick={() => viewDocument(doc.fileUri)}
>
    View
</button>

    </div>
))}
                                </>
                            )}

                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}
