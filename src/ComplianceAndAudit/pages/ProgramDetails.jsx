// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Modal } from "bootstrap";
// import {
//     getProgramDetails,
//     getAllEvents,
//     getAllApplications,
//     getGrantsByIds,
//     updateCompliance
// } from "../compliance.api";
// import ApplicationModal from "../components/ApplicationModal";
// import GrantModal from "../components/GrantModal";
// import EventModal from "../components/EventModal";

// export default function ProgramDetail() {

//     const { complianceId, programId } = useParams();
//     const navigate = useNavigate();

//     const [program, setProgram] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     const [modalData, setModalData] = useState([]);
//     const [modalTitle, setModalTitle] = useState("");

//     // ✅ Scroll
//     useEffect(() => {
//         window.scrollTo({ top: 80, behavior: "smooth" });
//     }, []);

//     // ✅ Fetch Program
//     useEffect(() => {
//         const fetchProgram = async () => {
//             try {
//                 const res = await getProgramDetails(programId);
//                 setProgram(res.data);
//             } catch (err) {
//                 setError("Failed to load program");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProgram();
//     }, [programId]);

//     // ✅ OPEN MODAL FUNCTION (VERY IMPORTANT)
//     const openModal = () => {
//         const modal = new Modal(document.getElementById("detailsModal"));
//         modal.show();
//     };

//     // ✅ FETCH FUNCTIONS

//     const handleFetchApplications = async () => {
//         const res = await getAllApplications();
//         const filtered = res.data.filter(e => e.programId === Number(programId));
//         console.log("Filtered Applications:", filtered);
//         setModalData(filtered);

//         new Modal(document.getElementById("applicationsModal")).show();
//     };

//     const handleFetchGrants = async () => {
//         const res = await getGrantsByIds(program.grantIds);
//         setModalData(res.data);

//         new Modal(document.getElementById("grantsModal")).show();
//     };

//     const handleFetchEvents = async () => {
//         const res = await getAllEvents();
//         const filtered = res.data.filter(e => e.programId === Number(programId));
//         setModalData(filtered);

//         new Modal(document.getElementById("eventsModal")).show();
//     };

//     const handleResolveConflict = () => {
//         console.log("Conflict resolution triggered for Program:", programId);
//         updateCompliance(complianceId, { result: "COMPLIANT" });
//         alert(`Audit report for ${program.title} has been initialized.`);

//         navigate("/audit/auditordashboard");
//     };

//     if (loading) {
//         return (
//             <div className="d-flex justify-content-center py-5">
//                 <div className="spinner-border text-primary"></div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="container my-5">
//                 <div className="alert alert-danger">{error}</div>
//             </div>
//         );
//     }

//     return (
//         <div className="container my-5">

//             {/* 🔹 TITLE + STATUS */}
//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h2 className="fw-bold">{program.title}</h2>

//                 <span className={`badge fs-6 ${program.status === "ACTIVE"
//                     ? "bg-success"
//                     : "bg-secondary"
//                     }`}>
//                     {program.status}
//                 </span>
//             </div>

//             {/* 🔹 DESCRIPTION */}
//             <div className="card shadow-sm mb-4">
//                 <div className="card-body">
//                     <h5 className="fw-bold">Description</h5>
//                     <p className="text-muted">{program.description}</p>
//                 </div>
//             </div>

//             {/* 🔹 STATS */}
//             <div className="row g-3 mb-4">

//                 <div className="col-md-4">
//                     <div className="card text-center shadow-sm p-3">
//                         <h6 className="text-muted">Program ID</h6>
//                         <h4 className="fw-bold">{program.programId}</h4>
//                     </div>
//                 </div>

//                 <div className="col-md-4">
//                     <div className="card text-center shadow-sm p-3">
//                         <h6 className="text-muted">Budget</h6>
//                         <h4 className="fw-bold text-primary">
//                             ₹ {program.budget?.toLocaleString()}
//                         </h4>
//                     </div>
//                 </div>

//                 <div className="col-md-4">
//                     <div className="card text-center shadow-sm p-3">
//                         <h6 className="text-muted">Duration</h6>
//                         <h6 className="fw-bold">
//                             {program.startDate} → {program.endDate}
//                         </h6>
//                     </div>
//                 </div>

//             </div>

//             {/* 🔹 TITLE */}
//             <div className="d-flex justify-content-between mb-3">
//                 <h2>{program.title}</h2>
//             </div>

//             {/* 🔹 CARDS */}
//             <div className="row g-4 mb-5">

//                 {/* Applications */}
//                 <div className="col-md-4">
//                     <div className="card shadow-sm p-3">
//                         <h5>Applications</h5>
//                         <button
//                             className="btn btn-link text-primary"
//                             onClick={handleFetchApplications}
//                         >
//                             {program.applicationIds?.length || 0} Applications
//                         </button>
//                     </div>
//                 </div>

//                 {/* Grants */}
//                 <div className="col-md-4">
//                     <div className="card shadow-sm p-3">
//                         <h5>Grants</h5>
//                         <button
//                             className="btn btn-link text-success"
//                             onClick={handleFetchGrants}
//                         >
//                             {program.grantIds?.length || 0} Grants
//                         </button>
//                     </div>
//                 </div>

//                 {/* Events */}
//                 <div className="col-md-4">
//                     <div className="card shadow-sm p-3">
//                         <h5>Events</h5>
//                         <button
//                             className="btn btn-link text-warning"
//                             onClick={handleFetchEvents}
//                         >
//                             {program.eventIds?.length || 0} Events
//                         </button>
//                     </div>
//                 </div>

//             </div>

//             <div className="d-flex justify-content-center mt-5 mb-3">
//                 <button
//                     className="btn btn-dark btn-lg px-5 shadow-sm"
//                     onClick={handleResolveConflict}
//                 >
//                     Resolve Conflict
//                 </button>
//             </div>

//             {/* ✅ ✅ CORRECT MODAL STRUCTURE */}

//             <ApplicationModal data={modalData} />
//             <GrantModal data={modalData} />
//             <EventModal data={modalData} />

//         </div>
//     );
// }

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Modal } from "bootstrap";
// import {
//     getProgramDetails,
//     getAllEvents,
//     getAllApplications,
//     updateCompliance
// } from "../compliance.api"; // Removed getGrantsByIds
// import ApplicationModal from "../components/ApplicationModal";
// import EventModal from "../components/EventModal";
// // Removed GrantModal import

// export default function ProgramDetail() {

//     const { complianceId, programId } = useParams();
//     const navigate = useNavigate();

//     const [program, setProgram] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     const [modalData, setModalData] = useState([]);

//     // ✅ Scroll
//     useEffect(() => {
//         window.scrollTo({ top: 80, behavior: "smooth" });
//     }, []);

//     // ✅ Fetch Program
//     useEffect(() => {
//         const fetchProgram = async () => {
//             try {
//                 const res = await getProgramDetails(programId);
//                 setProgram(res.data);
//             } catch (err) {
//                 setError("Failed to load program");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProgram();
//     }, [programId]);

//     // ✅ FETCH FUNCTIONS
//     const handleFetchApplications = async () => {
//         const res = await getAllApplications();
//         const filtered = res.data.filter(e => e.programId === Number(programId));
//         setModalData(filtered);
//         new Modal(document.getElementById("applicationsModal")).show();
//     };

//     // REMOVED handleFetchGrants logic here

//     const handleFetchEvents = async () => {
//         const res = await getAllEvents();
//         const filtered = res.data.filter(e => e.programId === Number(programId));
//         setModalData(filtered);
//         new Modal(document.getElementById("eventsModal")).show();
//     };

//     const handleResolveConflict = () => {
//         updateCompliance(complianceId, { result: "COMPLIANT" });
//         alert(`Audit report for ${program.title} has been initialized.`);
//         navigate("/audit/auditordashboard");
//     };

//     if (loading) {
//         return (
//             <div className="d-flex justify-content-center py-5">
//                 <div className="spinner-border text-primary"></div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="container my-5">
//                 <div className="alert alert-danger">{error}</div>
//             </div>
//         );
//     }

//     return (
//         <div className="container my-5">

//             {/* 🔹 TITLE + STATUS */}
//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h2 className="fw-bold">{program.title}</h2>
//                 <span className={`badge fs-6 ${program.status === "ACTIVE" ? "bg-success" : "bg-secondary"}`}>
//                     {program.status}
//                 </span>
//             </div>

//             {/* 🔹 DESCRIPTION */}
//             <div className="card shadow-sm mb-4">
//                 <div className="card-body">
//                     <h5 className="fw-bold">Description</h5>
//                     <p className="text-muted">{program.description}</p>
//                 </div>
//             </div>

//             {/* 🔹 STATS */}
//             <div className="row g-3 mb-4">
//                 <div className="col-md-4">
//                     <div className="card text-center shadow-sm p-3">
//                         <h6 className="text-muted">Program ID</h6>
//                         <h4 className="fw-bold">{program.programId}</h4>
//                     </div>
//                 </div>
//                 <div className="col-md-4">
//                     <div className="card text-center shadow-sm p-3">
//                         <h6 className="text-muted">Budget</h6>
//                         <h4 className="fw-bold text-primary">
//                             ₹ {program.budget?.toLocaleString()}
//                         </h4>
//                     </div>
//                 </div>
//                 <div className="col-md-4">
//                     <div className="card text-center shadow-sm p-3">
//                         <h6 className="text-muted">Duration</h6>
//                         <h6 className="fw-bold">
//                             {program.startDate} → {program.endDate}
//                         </h6>
//                     </div>
//                 </div>
//             </div>

//             {/* 🔹 CARDS SECTION */}
//             <div className="row g-4 mb-5">

//                 {/* Applications */}
//                 <div className="col-md-6"> {/* Resized to 6 for balance */}
//                     <div className="card shadow-sm p-3">
//                         <h5>Applications</h5>
//                         <button
//                             className="btn btn-link text-primary"
//                             onClick={handleFetchApplications}
//                         >
//                             {program.applicationIds?.length || 0} Applications
//                         </button>
//                     </div>
//                 </div>

//                 {/* Events */}
//                 <div className="col-md-6"> {/* Resized to 6 for balance */}
//                     <div className="card shadow-sm p-3">
//                         <h5>Events</h5>
//                         <button
//                             className="btn btn-link text-warning"
//                             onClick={handleFetchEvents}
//                         >
//                             {program.eventIds?.length || 0} Events
//                         </button>
//                     </div>
//                 </div>

//             </div>

//             <div className="d-flex justify-content-center mt-5 mb-3">
//                 <button
//                     className="btn btn-dark btn-lg px-5 shadow-sm"
//                     onClick={handleResolveConflict}
//                 >
//                     Resolve Conflict
//                 </button>
//             </div>

//             {/* ✅ REMOVED GrantModal from structure */}
//             <ApplicationModal data={modalData} />
//             <EventModal data={modalData} />

//         </div>
//     );
// }

//=================
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom"; // ✅ Added useLocation
// import { Modal } from "bootstrap";
// import {
//     getProgramDetails,
//     getAllEvents,
//     getAllApplications,
//     updateCompliance
// } from "../compliance.api";
// import ApplicationModal from "../components/ApplicationModal";
// import EventModal from "../components/EventModal";

// export default function ProgramDetail() {
//     const { complianceId, programId } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation(); // ✅ Initialize location

//     const [program, setProgram] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [modalData, setModalData] = useState([]);

//     // ✅ Grab remarks from navigation state
//     const auditNotes = location.state?.auditNotes || "No specific auditor remarks found for this record.";

//     useEffect(() => {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     }, []);

//     useEffect(() => {
//         const fetchProgram = async () => {
//             try {
//                 const res = await getProgramDetails(programId);
//                 setProgram(res.data);
//             } catch (err) {
//                 setError("Failed to load program");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProgram();
//     }, [programId]);

//     const handleFetchApplications = async () => {
//         const res = await getAllApplications();
//         const filtered = res.data.filter(e => e.programId === Number(programId));
//         setModalData(filtered);
//         new Modal(document.getElementById("applicationsModal")).show();
//     };

//     const handleFetchEvents = async () => {
//         const res = await getAllEvents();
//         const filtered = res.data.filter(e => e.programId === Number(programId));
//         setModalData(filtered);
//         new Modal(document.getElementById("eventsModal")).show();
//     };

//     const handleResolveConflict = () => {
//         updateCompliance(complianceId, { result: "COMPLIANT" });
//         alert(`Audit report for ${program.title} has been resolved.`);
//         navigate("/audit/auditordashboard");
//     };

//     if (loading) {
//         return (
//             <div className="d-flex justify-content-center py-5">
//                 <div className="spinner-border text-primary"></div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="container my-5">
//                 <div className="alert alert-danger">{error}</div>
//             </div>
//         );
//     }

//     return (
//         <div className="container my-5">
//             {/* 🔹 TITLE + STATUS */}
//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h2 className="fw-bold">{program.title}</h2>
//                 <span className={`badge fs-6 ${program.status === "ACTIVE" ? "bg-success" : "bg-secondary"}`}>
//                     {program.status}
//                 </span>
//             </div>

//             {/* 🔹 NEW SECTION: AUDITOR REMARKS (The Comment from Dashboard) */}
//             <div className="card border-danger shadow-sm mb-4">
//                 <div className="card-header bg-danger text-white fw-bold">
//                     🚨 Audit Findings / Remarks
//                 </div>
//                 <div className="card-body bg-light">
//                     <p className="mb-0 fs-5 text-dark">
//                         <em>"{auditNotes}"</em>
//                     </p>
//                     <hr />
//                     <small className="text-muted">
//                         Compliance ID: <strong>#{complianceId}</strong> | 
//                         Reported via Auditor Dashboard
//                     </small>
//                 </div>
//             </div>

//             {/* 🔹 DESCRIPTION */}
//             <div className="card shadow-sm mb-4 border-0">
//                 <div className="card-body">
//                     <h5 className="fw-bold text-primary">Program Description</h5>
//                     <p className="text-muted mb-0">{program.description}</p>
//                 </div>
//             </div>

//             {/* 🔹 STATS */}
//             <div className="row g-3 mb-4">
//                 <div className="col-md-4">
//                     <div className="card text-center shadow-sm p-3">
//                         <h6 className="text-muted">Program ID</h6>
//                         <h4 className="fw-bold">{program.programId}</h4>
//                     </div>
//                 </div>
//                 <div className="col-md-4">
//                     <div className="card text-center shadow-sm p-3 border-primary border-opacity-25">
//                         <h6 className="text-muted text-primary">Budget</h6>
//                         <h4 className="fw-bold text-primary">₹ {program.budget?.toLocaleString()}</h4>
//                     </div>
//                 </div>
//                 <div className="col-md-4">
//                     <div className="card text-center shadow-sm p-3">
//                         <h6 className="text-muted">Duration</h6>
//                         <h6 className="fw-bold">{program.startDate} → {program.endDate}</h6>
//                     </div>
//                 </div>
//             </div>

//             {/* 🔹 ACTION CARDS */}
//             <div className="row g-4 mb-5">
//                 <div className="col-md-6">
//                     <div className="card shadow-sm p-3 border-start border-primary border-4">
//                         <h5>View Applications</h5>
//                         <button className="btn btn-link text-primary text-start p-0" onClick={handleFetchApplications}>
//                             Check {program.applicationIds?.length || 0} Submissions
//                         </button>
//                     </div>
//                 </div>
//                 <div className="col-md-6">
//                     <div className="card shadow-sm p-3 border-start border-warning border-4">
//                         <h5>View Events</h5>
//                         <button className="btn btn-link text-warning text-start p-0" onClick={handleFetchEvents}>
//                             Check {program.eventIds?.length || 0} Registered Events
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <div className="d-flex justify-content-center mt-5 mb-3">
//                 <button
//                     className="btn btn-success btn-lg px-5 shadow-lg fw-bold"
//                     onClick={handleResolveConflict}
//                 >
//                     Mark as Compliant & Resolve
//                 </button>
//             </div>

//             <ApplicationModal data={modalData} />
//             <EventModal data={modalData} />
//         </div>
//     );
// }


import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Modal } from "bootstrap";
import {
    getProgramDetails,
    getAllEvents,
    getAllApplications,
    updateCompliance
} from "../compliance.api";
import ApplicationModal from "../components/ApplicationModal";
import EventModal from "../components/EventModal";

export default function ProgramDetail() {
    const { complianceId, programId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [program, setProgram] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [modalData, setModalData] = useState([]);

    // 🚨 Auditor Dashboard theke asa Note catch kora hoche
    const auditNotes = location.state?.auditNotes || "No specific auditor remarks found.";

    useEffect(() => {
        const fetchProgram = async () => {
            try {
                const res = await getProgramDetails(programId);
                setProgram(res.data);
            } catch (err) {
                setError("Failed to load program details.");
            } finally {
                setLoading(false);
            }
        };
        fetchProgram();
    }, [programId]);

    const handleFetchApplications = async () => {
        const res = await getAllApplications();
        const filtered = res.data.filter(e => e.programId === Number(programId));
        setModalData(filtered);
        new Modal(document.getElementById("applicationsModal")).show();
    };

    const handleFetchEvents = async () => {
        const res = await getAllEvents();
        const filtered = res.data.filter(e => e.programId === Number(programId));
        setModalData(filtered);
        new Modal(document.getElementById("eventsModal")).show();
    };

    const handleResolveConflict = async () => {
        try {
            await updateCompliance(complianceId, { result: "COMPLIANT", notes: "Issue Resolved by Auditor" });
            alert("This program is now marked as COMPLIANT.");
            navigate("/audit/auditordashboard");
        } catch (err) {
            alert("Error updating compliance status.");
        }
    };

    if (loading) return <div className="text-center py-5"><div className="spinner-border"></div></div>;
    if (error) return <div className="container my-5"><div className="alert alert-danger">{error}</div></div>;

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">{program.title}</h2>
                <span className={`badge fs-6 ${program.status === "ACTIVE" ? "bg-success" : "bg-secondary"}`}>
                    {program.status}
                </span>
            </div>

            {/* 📝 DISPLAY AUDITOR REMARKS BOX */}
            <div className="card border-warning shadow-sm mb-4">
                <div className="card-header bg-warning text-dark fw-bold">
                    ⚠️ Auditor's Non-Compliance Remarks
                </div>
                <div className="card-body bg-light">
                    <p className="fs-5 mb-0 text-dark">
                        <strong>Feedback:</strong> "{auditNotes}"
                    </p>
                    <hr />
                    <small className="text-muted">Compliance Tracking ID: #{complianceId}</small>
                </div>
            </div>

            {/* PROGRAM DESCRIPTION */}
            <div className="card shadow-sm mb-4 border-0">
                <div className="card-body">
                    <h5 className="fw-bold text-primary">About this Program</h5>
                    <p className="text-muted">{program.description}</p>
                </div>
            </div>

            {/* STATS TILES */}
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <div className="card text-center shadow-sm p-3">
                        <small className="text-muted">Budget</small>
                        <h4 className="fw-bold text-success">₹ {program.budget?.toLocaleString()}</h4>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center shadow-sm p-3">
                        <small className="text-muted">Applications</small>
                        <button className="btn btn-link fw-bold text-decoration-none" onClick={handleFetchApplications}>
                            {program.applicationIds?.length || 0} Records
                        </button>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-center shadow-sm p-3">
                        <small className="text-muted">Events</small>
                        <button className="btn btn-link fw-bold text-decoration-none text-warning" onClick={handleFetchEvents}>
                            {program.eventIds?.length || 0} Events
                        </button>
                    </div>
                </div>
            </div>

            {/* RESOLVE BUTTON */}
            <div className="d-flex justify-content-center mt-5">
                <button className="btn btn-dark btn-lg px-5 shadow" onClick={handleResolveConflict}>
                    Resolve & Mark Compliant
                </button>
            </div>

            <ApplicationModal data={modalData} />
            <EventModal data={modalData} />
        </div>
    );
}