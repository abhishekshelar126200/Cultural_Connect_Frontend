import { useEffect, useState } from "react";
import { getApplicationsByCitizen } from "../Services/programManager.api";

export default function MyGrants() {

    const [grants, setGrants] = useState([]);

    useEffect(() => {
        loadGrants();
    }, []);

    const loadGrants = async () => {
        try {
            const citizenId = localStorage.getItem("userId");

            const res = await getApplicationsByCitizen(citizenId);

            // ✅ FILTER ONLY APPROVED
            const approved = res.data.filter(app => 
                app.status === "APPROVED"
            );

            // ✅ SORT LATEST FIRST
            const sorted = approved.sort(
                (a, b) => b.applicationId - a.applicationId
            );

            setGrants(sorted);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container">

            <h3>My Grants</h3>

            <table className="table table-bordered mt-3">

                <thead>
                    <tr>
                        <th>Program</th>
                        <th>Approved Date</th>
                        <th>Grant Amount</th>
                    </tr>
                </thead>

                <tbody>
                    {grants.length === 0 && (
                        <tr>
                            <td colSpan="3" className="text-center">
                                No grants yet
                            </td>
                        </tr>
                    )}

                    {grants.map(g => (
                        <tr key={g.applicationId}>
                            <td>{g.programName}</td>
                            <td>{g.submittedDate}</td>

                            <td>
                                <span className="badge bg-success">
                                    ₹ {g.grantAmount}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
}
