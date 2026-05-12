import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProgramById, applyForProgram} from "../citizen.api";
import { httpEventClient } from "../../Services/httpClient";

export default function ProgramDetails() {

    const { id } = useParams();

    const [program, setProgram] = useState({});
    const [events, setEvents] = useState([]);

    const [applied, setApplied] = useState(false);


    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const programRes = await getProgramById(id);
        setProgram(programRes.data);

        // ✅ Get event IDs
        const eventIdsRes = await httpEventClient.get(`/program/${id}`);
        const eventIds = eventIdsRes.data;

        // ✅ Fetch event details
        const eventDetails = await Promise.all(
            eventIds.map(eid => httpEventClient.get(`/${eid}`))
        );

        setEvents(eventDetails.map(e => e.data));
    };

   const handleApply = async () => {

    const confirm = window.confirm("Are you sure you want to apply for this program?");
    if (!confirm) return;

    try {
        const citizenId = localStorage.getItem("userId");

        const requestData = {
            citizenId: Number(citizenId),
            programId: Number(id)
        };
        console.log(citizenId, id);
        console.log(programId, citizenId);

        const res = await applyForProgram(requestData);

        console.log(res.data);

        // ✅ SET APPLIED HERE
        setApplied(true);

        alert("✅ Application Submitted Successfully!");

    } catch (err) {
        console.error(err);

        if (err.response) {
            alert(err.response.data.message || "❌ Failed to apply");
        } else {
            alert("❌ Server error");
        }
    }
};


    return (
        <div className="container">

            {/* ✅ Program Info */}
            <div className="card p-3 mb-4">
                <h3>{program.title}</h3>

                <p>{program.description}</p>

                <p><b>Start:</b> {program.startDate}</p>
                <p><b>End:</b> {program.endDate}</p>
                <p><b>Budget:</b> {program.budget}</p>
            </div>

            {/* ✅ Events */}
            <h5>Events</h5>

            {events.map(e => (
                <div key={e.eventId} className="card p-2 mb-2">
                    <h6>{e.title}</h6>
                    <p>Location: {e.location}</p>
                    <p>Date: {e.date}</p>
                </div>
            ))}

            {/* ✅ Apply Button */}
            <button
                className="btn btn-success position-fixed"
                style={{ bottom: "20px", right: "20px" }}
                onClick={handleApply}
                disabled={applied}
            >
                {applied ? "Already Applied ✅" : "Apply Program"}
            </button>


        </div>
    );
}