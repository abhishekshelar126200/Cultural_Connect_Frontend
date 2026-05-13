import React, { useEffect, useState } from "react";
import { getApplicationsByCitizen } from "../citizen.api";

export default function CitizenApplications() {

    const [apps, setApps] = useState([]);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        try {
            const citizenId = localStorage.getItem("userId");
            const res = await getApplicationsByCitizen(citizenId);

// ✅ REMOVE APPROVED
const filtered = res.data.filter(app =>
    app.status !== "APPROVED"
);

setApps(filtered);

        } catch (err) {
            console.error("Error loading applications", err);
        }
    };

    return (
        <div>
            <h3>My Applications</h3>

            <table className="table table-bordered">

                <thead>
                    <tr>
                        <th>Program</th>
                        <th>Applied Date</th>
                        <th>Status</th>
                        <th>Grant Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {apps.map(app => (
                        <tr key={app.applicationId}>
                            <td>{app.programName}</td>
                            <td>{app.submittedDate}</td>

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

                            <td>
                                {app.grantAmount
                                    ? `₹ ${app.grantAmount}`
                                    : "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}
