import React, { useEffect, useState } from "react";
import { 
    getAllCitizens, 
    getCitizensByStatus, 
    updateCitizenStatus 
} from "../Services/officer_api";

export default function OfficerCitizens() {

    const [citizens, setCitizens] = useState([]);
    const [activeTab, setActiveTab] = useState("ALL");

    useEffect(() => {
        loadCitizens();
    }, [activeTab]);

    const loadCitizens = async () => {
        try {
            let res;

            if (activeTab === "ALL") {
                res = await getAllCitizens();
            } else {
                res = await getCitizensByStatus(activeTab);
            }

            setCitizens(res.data);

        } catch (err) {
            console.error("Load Error:", err);
        }
    };

    // ✅ ✅ HANDLE APPROVE / REJECT
    const handleStatusUpdate = async (citizenId, status) => {

        const confirm = window.confirm(`Are you sure to ${status}?`);
        if (!confirm) return;

        try {

            await updateCitizenStatus(citizenId, status);

            alert(`✅ ${status} successful`);

            loadCitizens(); // ✅ refresh table

        } catch (err) {
            console.error(err);
            alert("❌ Failed to update status");
        }
    };

    return (
        <div>

            <h3>Citizen Management</h3>

            {/* ✅ FILTER TABS */}
            <div className="mb-3">
                {["ALL", "PENDING", "ACTIVE", "REJECTED"].map(status => (
                    <button
                        key={status}
                        className={`btn me-2 ${
                            activeTab === status ? "btn-primary" : "btn-outline-primary"
                        }`}
                        onClick={() => setActiveTab(status)}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* ✅ TABLE */}
            <table className="table table-bordered">

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {citizens.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No data available
                            </td>
                        </tr>
                    )}

                    {citizens.map(c => (

                        <tr key={c.citizenId}>

                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td>{c.phone}</td>

                            <td>
                                <span className={`badge 
                                    ${c.status === "ACTIVE" ? "bg-success" :
                                      c.status === "PENDING" ? "bg-warning" :
                                      c.status === "REJECTED" ? "bg-danger" :
                                      "bg-secondary"}`}>
                                    {c.status}
                                </span>
                            </td>

                            <td>
                                {c.status === "PENDING" && (
                                    <>
                                        <button
                                            className="btn btn-success btn-sm me-2"
                                            onClick={() =>
                                                handleStatusUpdate(c.citizenId, "ACTIVE")
                                            }
                                        >
                                            Approve
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                handleStatusUpdate(c.citizenId, "REJECTED")
                                            }
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}