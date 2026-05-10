import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHeritageSiteById } from "../../ProgramManagement/Heritage.api";
import {
    getActivitiesBySite,
    addPreservationActivity
} from "../../ProgramManagement/PreservationActivities.api";

export default function HeritageSiteDetails() {
    const { siteId } = useParams();

    const [site, setSite] = useState(null);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    const [activityData, setActivityData] = useState({
        description: "",
        date: "",
        status: "ONGOING"
    });

    const IMAGE_BASE_URL = "http://localhost:8086/uploads/";

    // ✅ READ officerId FROM LOCAL STORAGE
    const officerId = localStorage.getItem("userId");

    useEffect(() => {
        loadData();
    }, [siteId]);

    const loadData = async () => {
        try {
            const [siteRes, activityRes] = await Promise.all([
                getHeritageSiteById(siteId),
                getActivitiesBySite(siteId)
            ]);
            setSite(siteRes.data);
            setActivities(activityRes.data);
        } catch (err) {
            console.error("Failed to load heritage details", err);
        } finally {
            setLoading(false);
        }
    };

    const handleActivityChange = (e) => {
        setActivityData({
            ...activityData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddActivity = async () => {
        const payload = {
            ...activityData,
            siteId: siteId,
            officerId: Number(officerId) // ✅ AUTO-INJECT officerId
        };

        await addPreservationActivity(payload);

        setActivityData({
            description: "",
            date: "",
            status: "ONGOING"
        });

        const refreshed = await getActivitiesBySite(siteId);
        setActivities(refreshed.data);
    };

    if (loading) {
        return (
            <div className="text-center my-5">
                <h5>Loading heritage details...</h5>
            </div>
        );
    }

    if (!site) {
        return (
            <div className="text-center my-5 text-danger">
                Heritage site not found
            </div>
        );
    }

    return (
        <div className="container my-5">

            {/* 🔹 TOP SECTION */}
            <div className="row align-items-start mb-4">

                {/* LEFT: SITE INFO */}
                <div className="col-md-6">
                    <h2 className="fw-bold">{site.name}</h2>
                    <p className="text-muted fs-5">📍 {site.location}</p>
                    <p>{site.description}</p>

                    <span
                        className={`badge fs-6 ${site.status === "Active"
                            ? "bg-success"
                            : "bg-secondary"
                            }`}
                    >
                        {site.status}
                    </span>
                </div>

                {/* RIGHT: SITE IMAGE */}
                <div className="col-md-6 text-end">
                    {site.fileUri && (
                        <img
                            src={`${IMAGE_BASE_URL}${site.fileUri}`}
                            alt={site.name}
                            className="img-fluid rounded shadow"
                            style={{ maxHeight: "300px", objectFit: "cover" }}
                        />
                    )}
                </div>
            </div>

            {/* 🔹 ACTIVITIES HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold">Preservation Activities</h4>

                <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#addActivityModal"
                >
                    ➕ Add Activity
                </button>
            </div>

            {/* 🔹 ACTIVITIES LIST */}
            <div className="card shadow-sm">
                <div className="card-body">

                    {activities.length === 0 && (
                        <p className="text-muted">
                            No preservation activities available.
                        </p>
                    )}

                    {activities.map(activity => (
                        <div
                            key={activity.activityId}
                            className="border rounded p-3 mb-3"
                        >
                            <p className="mb-1">{activity.description}</p>

                            <small className="text-muted">
                                Date: <strong>{activity.date}</strong> |
                                Status: <strong>{activity.status}</strong>
                            </small>
                        </div>
                    ))}

                </div>
            </div>

            {/* ✅ ADD ACTIVITY MODAL */}
            <div
                className="modal fade"
                id="addActivityModal"
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Add Preservation Activity</h5>
                            <button
                                className="btn-close"
                                data-bs-dismiss="modal"
                            />
                        </div>

                        <div className="modal-body">

                            <textarea
                                className="form-control mb-3"
                                name="description"
                                placeholder="Activity Description"
                                value={activityData.description}
                                onChange={handleActivityChange}
                                required
                            />

                            <input
                                type="date"
                                className="form-control mb-3"
                                name="date"
                                value={activityData.date}
                                onChange={handleActivityChange}
                                required
                            />

                            <select
                                className="form-select"
                                name="status"
                                value={activityData.status}
                                onChange={handleActivityChange}
                            >
                                <option value="ONGOING">ONGOING</option>
                                <option value="COMPLETED">COMPLETED</option>
                                <option value="PLANNED">PLANNED</option>
                            </select>

                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={handleAddActivity}
                            >
                                Save Activity
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}