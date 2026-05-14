import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProgramById, applyForProgram, checkApplied } from "../citizen.api";
import { getCitizenById } from "../citizen.api";
import { httpEventClient } from "../../Services/httpClient";

export default function ProgramDetails() {

    const { id } = useParams();

    const [program, setProgram] = useState({});
    const [events, setEvents] = useState([]);
    const [applied, setApplied] = useState(false);
    const [citizenStatus, setCitizenStatus] = useState("");


    useEffect(() => {
    loadData();
    checkIfApplied();
    fetchCitizenStatus(); // ✅ ADD THIS
}, []);

    // ✅ CHECK IF ALREADY APPLIED (IMPORTANT)
    const checkIfApplied = async () => {
        try {
            const citizenId = localStorage.getItem("userId");

            const res = await checkApplied(citizenId, id);

            if (res.data === true) {
                setApplied(true);
            }

        } catch (err) {
            console.error("Check applied error:", err);
        }
    };
    const fetchCitizenStatus = async () => {
    try {
        const citizenId = localStorage.getItem("userId");
        const res = await getCitizenById(citizenId);

        setCitizenStatus(res.data.status); // ✅ from citizen table

    } catch (err) {
        console.error("Status fetch error:", err);
    }
};


    // ✅ LOAD PROGRAM + EVENTS
    const loadData = async () => {
        try {
            const programRes = await getProgramById(id);
            setProgram(programRes.data);

            const eventIdsRes = await httpEventClient.get(`/program/${id}`);
            const eventIds = eventIdsRes.data;

            const eventResults = await Promise.allSettled(
                eventIds.map(eid => httpEventClient.get(`/geteventbyid/${eid}`))
            );

            const validEvents = eventResults
                .filter(res => res.status === "fulfilled")
                .map(res => res.value.data);

            setEvents(validEvents);

        } catch (err) {
            console.error("Load data error:", err);
        }
    };

    // ✅ APPLY FUNCTION
   const handleApply = async () => {

    // ✅ ✅ NEW: CHECK CITIZEN STATUS FIRST
    if (citizenStatus !== "ACTIVE") {
        alert("⚠️ Please upload your documents to activate your account before applying.");
        return;
    }

    const confirm = window.confirm("Are you sure you want to apply for this program?");
    if (!confirm) return;

    try {
        const citizenId = localStorage.getItem("userId");

        const requestData = {
            citizenId: Number(citizenId),
            programId: Number(id)
        };

        const res = await applyForProgram(requestData);

        console.log(res.data);

        // ✅ SET APPLIED TRUE
        setApplied(true);

        alert("✅ Application Submitted Successfully!");

    } catch (err) {
        console.error("Apply error:", err);

        if (err.response) {

            // ✅ Already applied case
            if (err.response.status === 400) {
                alert("✅ Already Applied");
                setApplied(true);
            }

            // ✅ NEW: Backend inactive check (extra safety)
            else if (err.response.status === 403) {
                alert("⚠️ Your account is inactive. Please upload documents.");
            }

            else {
                alert(err.response.data);
            }

        } else {
            alert("Server error");
        }
    }
};


    return (
        <div className="container">

            {/* ✅ PROGRAM DETAILS */}
            <div className="card p-3 mb-4">
                <h3>{program.title}</h3>

                <p>{program.description}</p>

                <p><b>Start:</b> {program.startDate}</p>
                <p><b>End:</b> {program.endDate}</p>
                <p><b>Budget:</b> {program.budget}</p>
            </div>

            {/* ✅ EVENTS */}
            <h5>Events</h5>

            {events.length === 0 && <p>No events available</p>}

            {events.map(e => (
                <div key={e.eventId} className="card p-2 mb-2">
                    <h6>{e.title}</h6>
                    <p>Location: {e.location}</p>
                    <p>Date: {e.date}</p>
                </div>
            ))}

            {/* ✅ APPLY BUTTON */}
            
<button
            className={`btn position-fixed ${
                citizenStatus !== "ACTIVE"
                    ? "btn-secondary"
                    : "btn-success"
            }`}
            style={{ bottom: "20px", right: "20px" }}
            onClick={handleApply}
            disabled={applied || citizenStatus !== "ACTIVE"}
        >
            {applied
                ? "Already Applied ✅"
                : citizenStatus !== "ACTIVE"
                    ? "Inactive Account ❌"
                    : "Apply Program"
            }
        </button>


        </div>
    );
}
