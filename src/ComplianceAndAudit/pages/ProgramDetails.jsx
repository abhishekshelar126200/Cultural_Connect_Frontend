import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";
import {
    getProgramDetails,
    getAllEvents,
    getAllApplications,
    getGrantsByIds,
    updateCompliance
} from "../compliance.api";
import ApplicationModal from "../components/ApplicationModal";
import GrantModal from "../components/GrantModal";
import EventModal from "../components/EventModal";

export default function ProgramDetails() {

    const { complianceId, programId } = useParams();
    const navigate = useNavigate();

    const [program, setProgram] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [modalData, setModalData] = useState([]);
    const [modalTitle, setModalTitle] = useState("");

    // ✅ Scroll
    useEffect(() => {
        window.scrollTo({ top: 80, behavior: "smooth" });
    }, []);

    // ✅ Fetch Program
    useEffect(() => {
        const fetchProgram = async () => {
            try {
                const res = await getProgramDetails(programId);
                setProgram(res.data);
            } catch (err) {
                setError("Failed to load program");
            } finally {
                setLoading(false);
            }
        };
        fetchProgram();
    }, [programId]);

    // ✅ OPEN MODAL FUNCTION (VERY IMPORTANT)
    const openModal = () => {
        const modal = new Modal(document.getElementById("detailsModal"));
        modal.show();
    };

    // ✅ FETCH FUNCTIONS

    const handleFetchApplications = async () => {
        const res = await getAllApplications();
        const filtered = res.data.filter(e => e.programId === Number(programId));
        console.log("Filtered Applications:", filtered);
        setModalData(filtered);

        new Modal(document.getElementById("applicationsModal")).show();
    };

    const handleFetchGrants = async () => {
        const res = await getGrantsByIds(program.grantIds);
        setModalData(res.data);

        new Modal(document.getElementById("grantsModal")).show();
    };

    const handleFetchEvents = async () => {
        const res = await getAllEvents();
        const filtered = res.data.filter(e => e.programId === Number(programId));
        setModalData(filtered);

        new Modal(document.getElementById("eventsModal")).show();
    };

    const handleResolveConflict = () => {
        console.log("Conflict resolution triggered for Program:", programId);
        updateCompliance(complianceId, { result: "COMPLIANT" });
        alert(`Audit report for ${program.title} has been initialized.`);

        navigate("/audit/auditordashboard");
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container my-5">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }

    return (
        <div className="container my-5">

            {/* 🔹 TITLE + STATUS */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="fw-bold">{program.title}</h2>

                <span className={`badge fs-6 ${program.status === "ACTIVE"
                    ? "bg-success"
                    : "bg-secondary"
                    }`}>
                    {program.status}
                </span>
            </div>

            {/* 🔹 DESCRIPTION */}
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h5 className="fw-bold">Description</h5>
                    <p className="text-muted">{program.description}</p>
                </div>
            </div>

            {/* 🔹 STATS */}
            <div className="row g-3 mb-4">

                <div className="col-md-4">
                    <div className="card text-center shadow-sm p-3">
                        <h6 className="text-muted">Program ID</h6>
                        <h4 className="fw-bold">{program.programId}</h4>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card text-center shadow-sm p-3">
                        <h6 className="text-muted">Budget</h6>
                        <h4 className="fw-bold text-primary">
                            ₹ {program.budget?.toLocaleString()}
                        </h4>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card text-center shadow-sm p-3">
                        <h6 className="text-muted">Duration</h6>
                        <h6 className="fw-bold">
                            {program.startDate} → {program.endDate}
                        </h6>
                    </div>
                </div>

            </div>

            {/* 🔹 TITLE */}
            <div className="d-flex justify-content-between mb-3">
                <h2>{program.title}</h2>
            </div>

            {/* 🔹 CARDS */}
            <div className="row g-4 mb-5">

                {/* Applications */}
                <div className="col-md-4">
                    <div className="card shadow-sm p-3">
                        <h5>Applications</h5>
                        <button
                            className="btn btn-link text-primary"
                            onClick={handleFetchApplications}
                        >
                            {program.applicationIds?.length || 0} Applications
                        </button>
                    </div>
                </div>

                {/* Grants */}
                <div className="col-md-4">
                    <div className="card shadow-sm p-3">
                        <h5>Grants</h5>
                        <button
                            className="btn btn-link text-success"
                            onClick={handleFetchGrants}
                        >
                            {program.grantIds?.length || 0} Grants
                        </button>
                    </div>
                </div>

                {/* Events */}
                <div className="col-md-4">
                    <div className="card shadow-sm p-3">
                        <h5>Events</h5>
                        <button
                            className="btn btn-link text-warning"
                            onClick={handleFetchEvents}
                        >
                            {program.eventIds?.length || 0} Events
                        </button>
                    </div>
                </div>

            </div>

            <div className="d-flex justify-content-center mt-5 mb-3">
                <button
                    className="btn btn-dark btn-lg px-5 shadow-sm"
                    onClick={handleResolveConflict}
                >
                    Resolve Conflict
                </button>
            </div>

            {/* ✅ ✅ CORRECT MODAL STRUCTURE */}

            <ApplicationModal data={modalData} />
            <GrantModal data={modalData} />
            <EventModal data={modalData} />

        </div>
    );
}