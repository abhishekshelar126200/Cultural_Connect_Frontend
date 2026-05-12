import React, { useEffect, useState } from "react";
import { getPrograms } from "../citizen.api";
import { useNavigate } from "react-router-dom";

export default function CitizenPrograms() {

    const [programs, setPrograms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadPrograms();
    }, []);

    const loadPrograms = async () => {
        const res = await getPrograms();

        // ✅ latest first
        const sorted = res.data.sort(
            (a, b) => b.programId - a.programId
        );

        setPrograms(sorted);
    };

    return (
        <div>

            <h3>Programs</h3>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Budget</th>
                    </tr>
                </thead>

                <tbody>
                    {programs.map(p => (
                        <tr 
                            key={p.programId}
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/citizen/program/${p.programId}`)}
                        >
                            <td>{p.programId}</td>
                            <td>{p.title}</td>
                            <td>{p.startDate}</td>
                            <td>{p.endDate}</td>
                            <td>{p.budget}</td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
}
